const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// --- DB Connection ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mernblog_media')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('DB Error:', err));

// --- Models ---
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionStatus: { type: String, default: 'free' }, // 'free' or 'premium'
});
const User = mongoose.model('User', UserSchema);

// --- Routes ---

// 1. Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Email already exists' });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ status: 'error', error: 'Invalid login' });
    
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET || 'secret');
      // Mocking a premium user for demo purposes
      return res.json({ status: 'ok', token, user: { name: user.name, email: user.email, plan: 'Premium' } });
    } else {
      return res.json({ status: 'error', user: false });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Submit Story Mock
app.post('/api/submit-story', (req, res) => {
  // In a real app, save story to DB and trigger email to editors
  const { title, outlet } = req.body;
  setTimeout(() => {
    res.json({ 
      message: `Success! "${title}" has been submitted to the ${outlet} editorial desk for review.` 
    });
  }, 2000);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
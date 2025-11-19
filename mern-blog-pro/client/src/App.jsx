import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutGrid, PenTool, History as HistoryIcon, Settings as SettingsIcon, LogOut, 
  CreditCard, Newspaper, Menu, X, Send, Check, FileText, Search, User, Briefcase
} from 'lucide-react';

// --- AUTH CONTEXT ---
const useAuth = () => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  return { user, login, logout };
};

// --- COMPONENTS ---

// 1. Billing (Kenyan Context)
const Billing = () => (
  <div className="animate-fade">
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>Media Access Plans</h2>
    <p style={{ color: 'var(--text-muted)' }}>Subscribe to get your stories published in Kenya's top dailies.</p>

    <div className="billing-grid">
      {/* Free Plan */}
      <div className="plan-card">
        <h3 style={{ fontSize: '1.5rem' }}>Guest Writer</h3>
        <div className="plan-price">Ksh 0 <span>/mo</span></div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Write drafts and organize your portfolio.</p>
        <ul className="feature-list">
          <li><Check size={16} color="var(--accent)" /> Unlimited Drafts</li>
          <li><Check size={16} color="var(--accent)" /> Portfolio Page</li>
          <li><Check size={16} color="var(--accent)" /> No Media Submission</li>
        </ul>
        <button className="btn btn-outline">Current Plan</button>
      </div>

      {/* Paid Plan */}
      <div className="plan-card featured">
        <div className="badge" style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--primary)', color: 'white' }}>POPULAR</div>
        <h3 style={{ fontSize: '1.5rem' }}>Journalist Pro</h3>
        <div className="plan-price">Ksh 2,000 <span>/mo</span></div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Direct line to editors at Nation, Standard & Tuko.</p>
        <ul className="feature-list">
          <li><Check size={16} color="var(--accent)" /> 5 Guaranteed Submissions</li>
          <li><Check size={16} color="var(--accent)" /> <strong>Nation & Standard</strong> Access</li>
          <li><Check size={16} color="var(--accent)" /> Editorial Review Support</li>
          <li><Check size={16} color="var(--accent)" /> 48hr Publication Turnaround</li>
        </ul>
        <button className="btn btn-primary" style={{ width: '100%' }}>
           Subscribe with M-Pesa
        </button>
      </div>
    </div>
  </div>
);

// 2. Newsroom (Writer Interface)
const Newsroom = () => {
  const [loading, setLoading] = useState(false);
  const [outlet, setOutlet] = useState('Nation Media');
  
  const handleSubmit = () => {
    setLoading(true);
    // Simulate submission to external media API
    setTimeout(() => {
      alert(`Success! Your story has been sent to the ${outlet} Editorial Desk.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="newsroom-layout animate-fade">
      {/* Metadata Sidebar */}
      <div className="newsroom-sidebar">
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '20px', display:'flex', alignItems:'center', gap:'10px' }}>
             <Briefcase size={20} color="var(--primary)"/> Submission Details
          </h3>
          
          <div className="form-group">
            <label>Select Media House</label>
            <select className="select-box" value={outlet} onChange={(e) => setOutlet(e.target.value)}>
              <option>Nation Media Group</option>
              <option>Standard Digital</option>
              <option>Tuko.co.ke</option>
              <option>The Star</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select className="select-box">
              <option>Politics</option>
              <option>Business / Economy</option>
              <option>Lifestyle</option>
              <option>Sports</option>
            </select>
          </div>

          <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.85rem', color: '#34d399' }}>
            <p><strong>Assurance:</strong> Being a Pro member guarantees your article will be reviewed by a human editor at {outlet} within 24 hours.</p>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Transmitting...' : 'Submit for Publication'} <Send size={16} />
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="newsroom-editor">
        <input type="text" className="textarea-title" placeholder="Article Headline (e.g. Economic Shift in Nairobi...)" />
        <textarea className="textarea-body" placeholder="Start writing your story here..." />
        <div style={{ padding: '15px', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>Words: 0</span>
          <span>Draft Saved</span>
        </div>
      </div>
    </div>
  );
};

// 3. History (Publication Tracking)
const History = () => {
  const submissions = [
    { id: 1, title: "The Rise of Fintech in Nairobi", outlet: "Standard Digital", date: "Nov 18, 2025", status: "Published" },
    { id: 2, title: "Election reforms needed", outlet: "Nation Media", date: "Nov 15, 2025", status: "Under Review" },
    { id: 3, title: "Local tourism booming", outlet: "Tuko.co.ke", date: "Nov 10, 2025", status: "Published" },
    { id: 4, title: "Traffic congestion solutions", outlet: "The Star", date: "Nov 01, 2025", status: "Rejected" },
  ];

  return (
    <div className="animate-fade">
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>Publication Status</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Headline</th>
              <th>Media Outlet</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(item => (
              <tr key={item.id}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><FileText size={16} color="var(--primary)" /> {item.title}</div></td>
                <td>{item.outlet}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`badge ${item.status === 'Published' ? 'badge-success' : item.status === 'Rejected' ? 'badge-rejected' : 'badge-pending'}`}>
                    {item.status}
                  </span>
                </td>
                <td><button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Track</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 4. Dashboard
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="animate-fade">
      <div className="top-bar">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Publisher Dashboard</h1>
          <p style={{ color: 'var(--text-muted' }}>Track your reach across Kenyan media.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/newsroom')}>
          <PenTool size={18} /> Write New Story
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span style={{ color: 'var(--text-muted)' }}>Stories Published</span>
          <h2 style={{ fontSize: '2rem' }}>12</h2>
          <div className="badge badge-success" style={{alignSelf:'flex-start'}}>3 this month</div>
        </div>
        <div className="stat-card">
           <span style={{ color: 'var(--text-muted)' }}>Total Readership Reach</span>
           <h2 style={{ fontSize: '2rem' }}>450k+</h2>
        </div>
        <div className="stat-card">
           <span style={{ color: 'var(--text-muted)' }}>Active Subscription</span>
           <h2 style={{ fontSize: '2rem' }}>Pro</h2>
        </div>
      </div>

      <h3 style={{ marginBottom: '20px' }}>Our Partner Network</h3>
      <div className="partners-grid">
        <div className="partner-badge">NATION</div>
        <div className="partner-badge">The Standard</div>
        <div className="partner-badge">Tuko.co.ke</div>
        <div className="partner-badge">The Star</div>
      </div>
    </div>
  );
};

// 5. Settings
const Settings = ({ user }) => (
  <div className="animate-fade">
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>Writer Profile</h2>
    <div className="stat-card">
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-card-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border)' }}>
          <User size={40} color="var(--text-muted)" />
        </div>
        <div>
          <h3>{user?.name || "Jane Doe"}</h3>
          <p style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
          <div className="badge badge-success" style={{ marginTop: '5px' }}>Verified Writer</div>
        </div>
      </div>
    </div>
  </div>
);

// --- LAYOUT & AUTH ---

const Sidebar = ({ isOpen, closeMobile, logout }) => {
  const location = useLocation();
  const NavItem = ({ to, icon, label }) => (
    <Link to={to} className={`nav-link ${location.pathname === to ? 'active' : ''}`} onClick={closeMobile}>
      {icon} <span>{label}</span>
    </Link>
  );
  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      <div className="brand">
        <div className="brand-icon"><Newspaper size={20} fill="white" /></div>
        <span>MernBlog</span>
      </div>
      <div style={{ flex: 1 }}>
        <div className="nav-category">Editorial</div>
        <NavItem to="/" icon={<LayoutGrid size={18} />} label="Dashboard" />
        <NavItem to="/newsroom" icon={<PenTool size={18} />} label="Newsroom" />
        <div className="nav-category">Account</div>
        <NavItem to="/history" icon={<HistoryIcon size={18} />} label="Submissions" />
        <NavItem to="/billing" icon={<CreditCard size={18} />} label="Subscription" />
        <NavItem to="/settings" icon={<SettingsIcon size={18} />} label="Settings" />
      </div>
      <div className="nav-link" onClick={logout}><LogOut size={18} /> <span>Sign Out</span></div>
    </aside>
  );
};

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => { e.preventDefault(); onLogin({ name: 'Writer', email }); };

  return (
    <div className="app-layout">
      <div className="desktop-only" style={{ flex: 1, background: 'radial-gradient(circle at top left, #7f1d1d, #050507)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '40px' }}>
        <div style={{ maxWidth: '500px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom:'20px' }}>Publish in <span className="gradient-text">Kenyan Dailies</span></h1>
          <p style={{ color: '#fca5a5', fontSize: '1.2rem' }}>
            The all-in-one platform connecting independent writers to Nation, Standard, and Tuko editors.
          </p>
          <div className="partners-grid" style={{ marginTop: '40px', opacity: 0.7 }}>
             <div className="partner-badge" style={{ fontSize: '0.8rem', padding: '10px' }}>NATION</div>
             <div className="partner-badge" style={{ fontSize: '0.8rem', padding: '10px' }}>Standard</div>
             <div className="partner-badge" style={{ fontSize: '0.8rem', padding: '10px' }}>Tuko</div>
          </div>
        </div>
      </div>
      <div className="auth-right" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)', padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="brand" style={{ color: 'var(--primary)', marginBottom: '30px' }}><Newspaper fill="currentColor" /> MernBlog</div>
        <h2 style={{ fontSize: '2rem', marginBottom:'20px' }}>{isLogin ? 'Writer Login' : 'Join Network'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Email</label><input className="form-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
          <div className="form-group"><label>Password</label><input className="form-input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
          <button className="btn btn-primary" style={{ width: '100%' }}>{isLogin ? 'Access Dashboard' : 'Start Publishing'}</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)', cursor:'pointer' }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Create Account" : "Login"}</p>
      </div>
    </div>
  );
};

const MainLayout = ({ user, logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="app-layout">
      <div className="mobile-only" style={{ position: 'fixed', top: 20, right: 20, zIndex: 100 }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px', color: 'white' }}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>
      <Sidebar isOpen={sidebarOpen} closeMobile={() => setSidebarOpen(false)} logout={logout} />
      <main className="main">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/newsroom" element={<Newsroom />} />
            <Route path="/history" element={<History />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <div className="app-footer"><p>Crafted by Barongo &copy; {new Date().getFullYear()}</p></div>
      </main>
    </div>
  );
};

function App() {
  const { user, login, logout } = useAuth();
  if (!user) return <Auth onLogin={login} />;
  return <Router><MainLayout user={user} logout={logout} /></Router>;
}

export default App;
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text, length = 150) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const stripHtmlTags = (html) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const getImageUrl = (path) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `http://localhost:5000${path}`;
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
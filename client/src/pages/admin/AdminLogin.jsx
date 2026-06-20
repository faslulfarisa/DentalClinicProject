import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaTooth } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back, Admin!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-dark-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <FaTooth className="text-3xl text-primary-600" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">Admin Panel</h1>
          <p className="text-white/60 mt-2">Bright Smile Dental Clinic</p>
        </div>

        <form onSubmit={handleSubmit} id="admin-login-form" className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-heading font-bold text-dark-900 mb-6">Sign In</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@brightsmile.com"
                  className="input-field !pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-800 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-field !pl-11"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            id="admin-login-btn"
            disabled={loading}
            className={`btn-primary w-full justify-center mt-8 !py-3.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

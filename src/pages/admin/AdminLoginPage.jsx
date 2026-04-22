import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import { adminLogin } from '../../services/api/adminAPI';
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminLogin(formData.email, formData.password);
      localStorage.setItem('adminData', JSON.stringify(response.user));
      localStorage.setItem('adminToken', response.token || 'admin-authenticated'); 
      
      toast.success('Admin login successful!');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 
                    flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 
                          rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <FaUserShield className="text-4xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SkyWay Admin</h1>
          <p className="text-gray-400">Enter your credentials to access admin panel</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="admin@skyway.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                           text-white placeholder-gray-400 focus:outline-none 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-white rounded-xl font-medium hover:shadow-lg 
                         transition-all duration-300 disabled:opacity-50 
                         flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent 
                                rounded-full animate-spin" />
              ) : (
                <>
                  <FaLock />
                  Login to Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-center text-gray-400">
              Restricted area. All access attempts are logged.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to Main Website
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { adminLogin } from '../../services/api/adminAPI';
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await adminLogin(formData.email, formData.password);
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('adminData', JSON.stringify(response.admin));
      toast.success('Admin login successful');
      navigate('/admin');
    } catch (error) {
      toast.error('Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 
                        rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <FaUserShield className="text-4xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SkyWay Admin Login</h1>
          <p className="text-gray-400">Enter your credentials to access admin panel</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 bg-white/10 backdrop-blur-lg border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@skywings.com"
              required
              className="bg-white/5 border-white/10 text-white placeholder-gray-400"
              labelClassName="text-gray-300"
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-white placeholder-gray-400 pr-12"
                labelClassName="text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              className="py-3"
            >
              <FaLock className="mr-2" />
              Login to Admin Panel
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-center text-gray-400">
              This area is restricted to authorized personnel only. 
              All access attempts are logged and monitored.
            </p>
          </div>
        </Card>

        {/* Back to Main Site */}
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
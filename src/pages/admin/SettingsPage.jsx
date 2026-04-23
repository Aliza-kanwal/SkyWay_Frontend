import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaSave, FaUndo, FaLock, FaBell, FaPalette, FaGlobe } from 'react-icons/fa';
import { getSettings, updateSettings } from '../../services/api/adminAPI';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';

const SettingsPage = () => {
   const { themeColor, setThemeColor } = useTheme();
  const [settings, setSettings] = useState({
    siteName: 'SkyWay Airlines',
    siteEmail: 'info@skyway.com',
    sitePhone: '+92 21 111 000 000',
    timezone: 'Asia/Karachi',
    currency: 'PKR',
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    themeColor: 'blue'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(settings);
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      loadSettings();
      toast.info('Settings reset');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center ml-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
            <p className="text-gray-600">Configure your airline system preferences</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all flex items-center gap-2"
            >
              <FaUndo /> Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? 'Saving...' : <><FaSave /> Save Changes</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaGlobe className="text-blue-600" /> General Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) => handleChange('siteEmail', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                <input
                  type="text"
                  value={settings.sitePhone}
                  onChange={(e) => handleChange('sitePhone', e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange('timezone', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  >
                    <option value="Asia/Karachi">Pakistan (PKT)</option>
                    <option value="Asia/Dubai">UAE (GST)</option>
                    <option value="Asia/Riyadh">Saudi Arabia (AST)</option>
                    <option value="Europe/London">UK (GMT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                  >
                    <option value="PKR">PKR (₨)</option>
                    <option value="USD">USD ($)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="SAR">SAR (﷼)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaBell className="text-blue-600" /> Notification Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive booking confirmations via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive flight updates via SMS</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Appearance Settings */}
           <div className="bg-white rounded-2xl shadow-lg p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <FaPalette className="text-blue-600" /> Appearance
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Theme Color</label>
        <div className="flex gap-3">
          {[
            { name: 'blue', color: '#3b82f6' },
            { name: 'green', color: '#22c55e' },
            { name: 'purple', color: '#a855f7' },
            { name: 'orange', color: '#f97316' },
            { name: 'red', color: '#ef4444' }
          ].map((color) => (
            <button
              key={color.name}
              onClick={() => setThemeColor(color.name)}
              className={`w-10 h-10 rounded-full transition-all ${
                themeColor === color.name ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
              }`}
              style={{ backgroundColor: color.color }}
              title={`${color.name} theme`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Current theme: <span className="font-semibold capitalize">{themeColor}</span>
        </p>
      </div>
    </div>
  </div>


          {/* System Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaLock className="text-blue-600" /> System
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">Put website in maintenance mode</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                />
              </label>
              {settings.maintenanceMode && (
                <div className="p-3 bg-yellow-50 rounded-xl text-sm text-yellow-800">
                  ⚠️ Maintenance mode is active. Only admins can access the site.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
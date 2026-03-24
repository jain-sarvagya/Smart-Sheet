
import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Spinner from '../../components/common/Spinner';
import authService from '../../services/auth.service.js';
import toast from 'react-hot-toast';
import { User, Mail, Lock } from 'lucide-react';

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProfile = async () => {
      try {
        const { data } = await authService.getProfile();
        setUsername(data.user.username);
        setEmail(data.user.email);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      return toast.error('Passwords do not match');
    }

    if (newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setPasswordLoading(true);

    try {
      await authService.updatePassword({ currPassword, newPassword });
      toast.success('Password updated');

      setCurrPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      toast.error(error.error || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      <div className="max-w-3xl mx-auto space-y-6">

        <PageHeader title="Profile Settings" />

        {/* USER INFO */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            User Information
          </h3>

          <div className="space-y-4">

            {/* Username */}
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={username}
                  disabled
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={email}
                  disabled
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>

          </div>
        </div>

        {/* PASSWORD */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Change Password
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-4">

            {/* Current Password */}
            <div>
              <label className="text-sm text-gray-600">Current Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={passwordLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-teal-400 text-white rounded-lg font-medium shadow-md hover:opacity-90 transition"
              >
                {passwordLoading ? 'Changing...' : 'Change Password'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
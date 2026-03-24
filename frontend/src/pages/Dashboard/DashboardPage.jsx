
import React, { useRef, useEffect, useState } from 'react';
import progressService from '../../services/progress.service.js';
import toast from 'react-hot-toast';
import { FileText, Dock, BrainCircuit, Clock } from 'lucide-react';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDashboard = async () => {
      try {
        const fetchedData = await progressService.getDashboard();
        setDashboardData(fetchedData?.data || {});
      } catch (error) {
        toast.error('Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        Loading...
      </div>
    );
  }

  const overview = dashboardData?.overview || {};
  const recentActivity = dashboardData?.recentActivity || {};

  const stats = [
    {
      label: 'Total Documents',
      value: overview?.documentCount || 0,
      icon: FileText,
    },
    {
      label: 'Total Flashcards',
      value: overview?.flashcardsetCount || 0,
      icon: Dock,
    },
    {
      label: 'Total Quizzes',
      value: overview?.quizzesCount || 0,
      icon: BrainCircuit,
    },
  ];

  const activities = [
    ...(recentActivity?.documents || []).map((doc) => ({
      id: doc._id,
      description: doc.title,
      timestamp: doc.lastAccessed || doc.createdAt,
      link: `/documents/${doc._id}`,
      type: 'Document',
    })),
    ...(recentActivity?.quizzes || []).map((quiz) => ({
      id: quiz._id,
      description: quiz.title,
      timestamp: quiz.completedAt || quiz.createdAt,
      link: `/quizzes/${quiz._id}`,
      type: 'Quiz',
    })),
  ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">

      {/* Header */}
      <div className="max-w-[1200px] mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Overview of your learning activity
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">{stat.label}</span>
              <div className="p-2 rounded-lg bg-blue-100">
                <stat.icon size={18} className="text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mt-3 text-gray-900">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-blue-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>
        </div>

        {activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {activity.type}: {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>

                <a
                  href={activity.link}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent activity yet</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
"use client";

import { Users, TrendingUp, CheckCircle } from "lucide-react";

export default function AdminDashboard({ stats, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <Users className="text-purple-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Subscribers
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalSubscribers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-blue-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Today's Signups
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.todayCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unique Emails
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalSubscribers}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Recent Signups
          </h3>
          <div className="space-y-2">
            {stats.recentSignups.length > 0 ? (
              stats.recentSignups.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {sub.email}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(sub.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No subscribers yet
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Deduplication Active:</strong> The system automatically
              prevents duplicate email addresses from being counted multiple
              times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

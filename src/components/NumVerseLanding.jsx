"use client";

import { useState, useEffect } from "react";
import { Rocket, Mail, CheckCircle, AlertCircle } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import AdminDashboard from "./AdminDashboard";

export default function NumVerseLanding() {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    recentSignups: [],
    todayCount: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setNotification({
        type: "error",
        message: "Please enter an email address",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNotification({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      setNotification({
        type: result.success ? "success" : "error",
        message: result.message,
      });

      if (result.success) {
        setEmail("");
        fetchStats();
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">
      <header className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-3">
            NumVerse
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDashboard(true)}
              className="text-sm px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Dashboard
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Launching Q4 2025
            </p>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-4 py-12 min-h-[calc(100vh-200px)]">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping"></div>
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-purple-500/30">
            <Rocket
              className="text-purple-600 dark:text-purple-400"
              size={48}
            />
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-4xl md:text-6xl">
            NumVerse
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-4xl md:text-6xl">
            Launching Soon
          </span>
        </h2>

        <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          Get ready for a new universe of numbers. Be the first to know when we
          launch.
        </p>

        <div className="p-2 rounded-xl  mb-8">
          <CountdownTimer />
        </div>

        <div className="w-full max-w-md mx-auto mb-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <Mail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isSubmitting}
                className="form-input w-full h-14 pl-12 pr-4 rounded-lg bg-background-light dark:bg-background-dark border dark:border-[oklch(98.4%_0.019_200.873)] focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-[oklch(70.4%_0.04_256.788)]"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Submitting..." : "Notify Me"}
            </button>
          </form>
        </div>

        {notification && (
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-lg mb-6 ${
              notification.type === "success"
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700"
                : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-bold text-gray-700 dark:text-gray-200">
            {stats.totalSubscribers}
          </span>{" "}
          people have already signed up!
        </p>
      </main>

      <footer className="p-4 ">
        <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          <p>copyright@numverse</p>
        </div>
      </footer>

      {showDashboard && (
        <AdminDashboard stats={stats} onClose={() => setShowDashboard(false)} />
      )}
    </div>
  );
}

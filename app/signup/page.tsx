'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ATTENDEE'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Signup submitted:', formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-300 to-indigo-500 relative overflow-hidden flex items-center justify-center py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-15 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 30}px`,
              height: `${Math.random() * 80 + 30}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 2 + 4}s`,
            }}
          />
        ))}
        
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-400 to-purple-300 opacity-25 animate-bounce-slow"></div>
      </div>

      <div className="w-full max-w-md mx-auto px-4 relative z-10">
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Eventra</h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="text-2xl">🎉</div>
              <span className="text-purple-600 font-semibold text-lg">Create Account</span>
            </div>
            <p className="text-gray-600 text-sm">Start managing events today!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-purple-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-purple-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-purple-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700"
                required
              >
                <option value="ATTENDEE">Student/Attendee</option>
                <option value="ORGANIZER">Event Organizer</option>
                <option value="VOLUNTEER">Volunteer</option>
                <option value="SPONSOR">Sponsor</option>
              </select>
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-purple-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-purple-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                'CREATE ACCOUNT'
              )}
            </button>
          </form>

          <div className="text-center my-6">
            <span className="text-gray-500 text-sm">Or signup with</span>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            
            <button className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                Login here
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(-20px); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite;
        }
      `}</style>
    </div>
  );
}
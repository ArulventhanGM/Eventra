'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login submitted:', formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-500 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 3}s`,
            }}
          />
        ))}
        
        {/* Large Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-300 opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white bg-opacity-10 animate-spin-slow"></div>
      </div>

      <div className="flex w-full max-w-6xl mx-auto px-4 relative z-10">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Login Now</h1>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="text-2xl">🎉</div>
                <span className="text-indigo-600 font-semibold text-lg">Eventra</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email or Username"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-blue-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-blue-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  'LOGIN'
                )}
              </button>
            </form>

            <div className="text-center my-6">
              <span className="text-gray-500 text-sm">Or login with</span>
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
                Not a member?{' '}
                <Link href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                  Signup now
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - 3D Animated Illustration */}
        <div className="hidden lg:flex w-1/2 items-center justify-center">
          <div className="relative">
            {/* Main 3D Flower Container */}
            <div className="relative w-80 h-80 animate-float-gentle">
              {/* Flower Petals */}
              <div className="absolute inset-0 animate-rotate-slow">
                {/* Petal 1 */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-24 bg-gradient-to-b from-pink-300 to-pink-500 rounded-full opacity-90 animate-bounce-gentle" style={{animationDelay: '0s'}}></div>
                
                {/* Petal 2 */}
                <div className="absolute top-1/4 right-8 transform rotate-45 w-14 h-20 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full opacity-80 animate-bounce-gentle" style={{animationDelay: '0.5s'}}></div>
                
                {/* Petal 3 */}
                <div className="absolute bottom-8 right-1/4 transform rotate-90 w-12 h-18 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full opacity-85 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
                
                {/* Petal 4 */}
                <div className="absolute bottom-1/4 left-8 transform rotate-135 w-15 h-22 bg-gradient-to-b from-green-300 to-green-500 rounded-full opacity-75 animate-bounce-gentle" style={{animationDelay: '1.5s'}}></div>
                
                {/* Petal 5 */}
                <div className="absolute top-1/3 left-12 transform rotate-225 w-13 h-19 bg-gradient-to-b from-purple-300 to-purple-500 rounded-full opacity-80 animate-bounce-gentle" style={{animationDelay: '2s'}}></div>
              </div>

              {/* Flower Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse-gentle shadow-lg"></div>

              {/* Leaves */}
              <div className="absolute bottom-20 left-16 w-8 h-16 bg-gradient-to-b from-green-400 to-green-600 rounded-full transform rotate-12 animate-sway"></div>
              <div className="absolute bottom-24 right-20 w-6 h-14 bg-gradient-to-b from-green-500 to-green-700 rounded-full transform -rotate-20 animate-sway" style={{animationDelay: '1s'}}></div>

              {/* Floating Sparkles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-twinkle"
                  style={{
                    left: `${Math.random() * 280 + 20}px`,
                    top: `${Math.random() * 280 + 20}px`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Additional Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30 animate-bounce-slow"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(-25px); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(12deg); }
          50% { transform: rotate(-8deg); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
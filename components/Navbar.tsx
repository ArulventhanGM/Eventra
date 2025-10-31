'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const getUserInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getDashboardLink = () => {
    if (session?.user?.role === 'ORGANIZER') return '/organizer-dashboard';
    if (session?.user?.role === 'ADMIN') return '/admin';
    return '/attendee-dashboard';
  };

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-gray-400/20 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text cursor-pointer"
              >
                🎉 Eventra
              </motion.div>
            </Link>
          </div>
          
          {/* Desktop Menu - Pure Glassmorphism */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/events">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/90 hover:text-white bg-black/10 backdrop-blur-md border border-gray-400/20 hover:bg-black/20 hover:border-gray-300/40 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Events
              </motion.div>
            </Link>
            <Link href="/schedule">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/90 hover:text-white bg-black/10 backdrop-blur-md border border-gray-400/20 hover:bg-black/20 hover:border-gray-300/40 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Schedule
              </motion.div>
            </Link>
            <Link href="/help">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/90 hover:text-white bg-black/10 backdrop-blur-md border border-gray-400/20 hover:bg-black/20 hover:border-gray-300/40 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                Help
              </motion.div>
            </Link>
            
            {/* User Authentication Section - Glassmorphism */}
            {status === 'loading' ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black/20 backdrop-blur-md rounded-full animate-pulse border border-gray-400/30"></div>
                <span className="text-sm text-white/70 hidden sm:block">Loading...</span>
              </div>
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white bg-black/10 backdrop-blur-md border border-gray-400/20 hover:bg-black/20 hover:border-gray-300/40 transition-all duration-300 group hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xs font-semibold group-hover:from-blue-600 group-hover:to-purple-600 transition-all border border-gray-300/30">
                      {getUserInitials(session.user.firstName, session.user.lastName)}
                    </div>
                    <span className="hidden lg:block">
                      {session.user.firstName} {session.user.lastName}
                    </span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                {/* User Dropdown Menu - Glassmorphism */}
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-400/20 py-2 z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-400/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-semibold border border-gray-300/30">
                            {getUserInitials(session.user.firstName, session.user.lastName)}
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {session.user.firstName} {session.user.lastName}
                            </p>
                            <p className="text-sm text-white/70">{session.user.email}</p>
                            <p className="text-xs text-purple-300 font-medium">
                              {session.user.role?.toLowerCase()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          href={getDashboardLink()}
                          className="flex items-center mx-2 px-3 py-2 text-sm text-white/90 hover:text-white bg-black/5 hover:bg-black/10 backdrop-blur-sm border border-gray-400/10 hover:border-gray-300/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4H8V5z" />
                          </svg>
                          Dashboard
                        </Link>
                        
                        <Link
                          href="/attendee-schedule"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          My Schedule
                        </Link>

                        <Link
                          href="/attendee/tickets"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                          My Tickets
                        </Link>

                        <div className="border-t border-gray-100 my-1"></div>

                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Edit Profile
                        </Link>

                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Account Settings
                        </Link>

                        <div className="border-t border-gray-400/20 my-2 mx-2"></div>

                        <motion.button
                          onClick={handleSignOut}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center w-full mx-2 px-3 py-2 text-sm text-red-300 hover:text-red-200 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm border border-red-400/20 hover:border-red-400/40 rounded-xl transition-all duration-300"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/90 hover:text-white bg-black/10 backdrop-blur-md border border-gray-400/20 hover:bg-black/20 hover:border-gray-300/40 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    Login
                  </motion.div>
                </Link>
                <Link href="/signup">
                  <motion.div 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-blue-300/30"
                  >
                    Sign Up
                  </motion.div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button - Glassmorphism */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/90 hover:text-white bg-black/10 backdrop-blur-md border border-gray-400/20 hover:bg-black/20 hover:border-gray-300/40 p-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-3">
              <Link href="/events" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Events
              </Link>
              <Link href="/schedule" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Schedule
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Help
              </Link>
              
              <hr className="my-2" />
              
              {session ? (
                <>
                  {/* User Info in Mobile */}
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {getUserInitials(session.user.firstName, session.user.lastName)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {session.user.firstName} {session.user.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={getDashboardLink()} 
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/attendee-schedule" 
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Schedule
                  </Link>
                  <Link 
                    href="/attendee/tickets" 
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Tickets
                  </Link>
                  
                  <hr className="my-2" />
                  
                  <Link 
                    href="/profile" 
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Edit Profile
                  </Link>
                  <Link 
                    href="/settings" 
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Account Settings
                  </Link>
                  
                  <hr className="my-2" />
                  
                  <button 
                    onClick={handleSignOut}
                    className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left w-full"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Login
                  </Link>
                  <Link href="/signup" className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
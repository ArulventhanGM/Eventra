'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    department: '',
    year: '',
    rollNumber: '',
    role: '',
    agreeTerms: false,
    receiveUpdates: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)) {
      return 'Strong';
    }
    return 'Medium';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.agreeTerms) {
      alert('Please agree to Terms & Privacy Policy');
      return;
    }
    setIsLoading(true);
    // Simulate signup process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      if (name === 'password') {
        setPasswordStrength(checkPasswordStrength(value));
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#DCE8FF' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Circles - Following the CSS pattern */}
        <motion.div 
          className="absolute w-[1176px] h-[832px] rounded-full shadow-lg"
          style={{ 
            left: '560px', 
            top: '0px',
            background: '#96B8FA',
            borderRadius: '416px'
          }}
          animate={{ 
            x: [0, -30, 20, 0],
            y: [0, 20, -10, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute w-[1176px] h-[832px] rounded-full shadow-lg"
          style={{ 
            left: '692px', 
            top: '0px',
            background: '#0F53D7',
            borderRadius: '416px'
          }}
          animate={{ 
            x: [0, 40, -25, 0],
            y: [0, -15, 25, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div 
          className="absolute w-[1176px] h-[832px] rounded-full shadow-lg"
          style={{ 
            left: '849px', 
            top: '0px',
            background: '#003CB0',
            borderRadius: '416px'
          }}
          animate={{ 
            x: [0, 20, -30, 0],
            y: [0, 25, -15, 0]
          }}
          transition={{ 
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Circles - Border elements */}
        {[
          { size: 65, left: '469px', top: '-22px' },
          { size: 82, left: '66px', top: '791px' },
          { size: 82, left: '478px', top: '673px' },
          { size: 82, left: '719px', top: '155px', isWhite: true },
          { size: 82, left: '951px', top: '755px', isWhite: true },
          { size: 82, left: '1226px', top: '107px', isWhite: true },
          { size: 82, left: '-41px', top: '27px' }
        ].map((circle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: circle.left,
              top: circle.top,
              border: `10px solid ${circle.isWhite ? 'rgba(255, 255, 255, 0.51)' : 'rgba(0, 60, 176, 0.51)'}`,
              boxSizing: 'border-box'
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Filled Circles */}
        {[
          { left: '578px', top: '729px' },
          { left: '1214px', top: '492px', isWhite: true },
          { left: '1007px', top: '43px', isWhite: true },
          { left: '666px', top: '81px' },
          { left: '-12px', top: '409px' },
          { left: '398px', top: '-26px' }
        ].map((circle, i) => (
          <motion.div
            key={`filled-${i}`}
            className="absolute rounded-full"
            style={{
              width: '53px',
              height: '53px',
              left: circle.left,
              top: circle.top,
              background: circle.isWhite ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 60, 176, 0.3)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 3D Illustration Area */}
      <motion.div 
        className="absolute"
        style={{
          width: '697px',
          height: '392px',
          left: '609px',
          top: '181px'
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full h-full bg-gradient-to-br from-blue-200 to-purple-300 rounded-3xl flex items-center justify-center">
          {/* 3D Flower Elements */}
          <motion.div
            className="absolute top-10 left-20 w-20 h-20 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full shadow-xl"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-32 right-16 w-24 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-xl"
            animate={{ 
              rotate: [0, -10, 10, 0],
              y: [0, -8, 8, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute bottom-16 left-32 w-16 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-xl"
            animate={{ 
              rotate: [0, 20, -20, 0],
              scale: [1, 0.9, 1.1, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Welcome to</h3>
            <h2 className="text-5xl font-extrabold">Eventra</h2>
            <p className="text-lg mt-4 opacity-90">Smart Event Management</p>
          </div>
        </div>
      </motion.div>

      {/* Signup Form Container */}
      <div className="relative z-10 flex items-start justify-start min-h-screen pt-16 pl-16">
        <motion.div 
          className="w-[600px] min-h-[800px] rounded-[34px] shadow-2xl p-8 relative"
          style={{ backgroundColor: '#96B8FA' }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Signup Header */}
          <motion.h1 
            className="text-white text-4xl font-extrabold mb-8 text-center"
            style={{ textShadow: '0px 4px 4px rgba(255, 255, 255, 0.25)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Sign Up
          </motion.h1>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name and Email Row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full h-[50px] bg-purple-100 rounded-lg px-5 text-base placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-[50px] bg-purple-100 rounded-lg px-5 text-base placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                  required
                />
              </motion.div>
            </div>

            {/* Password Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full h-[50px] bg-purple-100 rounded-lg px-5 pr-12 text-base placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordStrength && (
                  <div className={`text-xs mt-1 px-2 ${passwordStrength.includes('Strong') ? 'text-green-700' : passwordStrength.includes('Medium') ? 'text-yellow-700' : 'text-red-700'}`}>
                    {passwordStrength}
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full h-[50px] bg-purple-100 rounded-lg px-5 pr-12 text-base placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* College and Department Row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <input
                  type="text"
                  name="college"
                  placeholder="College Name"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full h-[50px] bg-purple-100 rounded-lg px-5 text-base placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full h-[50px] bg-purple-100 rounded-lg px-5 text-base placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                  required
                />
              </motion.div>
            </div>

            {/* Year and Roll Number Row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full h-[50px] bg-purple-100 rounded-lg px-5 text-base text-gray-700 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <input
                  type="text"
                  name="rollNumber"
                  placeholder="Roll Number"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full h-[50px] bg-purple-100 rounded-lg px-5 text-base placeholder-gray-600 placeholder-opacity-75 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                  required
                />
              </motion.div>
            </div>

            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full h-[50px] bg-purple-100 rounded-lg px-5 text-base text-gray-700 focus:outline-none focus:ring-3 focus:ring-purple-200 transition-all duration-300"
                required
              >
                <option value="">Select Role</option>
                <option value="attendee">Student/Attendee</option>
                <option value="organizer">Event Organizer</option>
                <option value="volunteer">Volunteer</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </motion.div>

            {/* Terms and Email Updates Checkboxes */}
            <motion.div
              className="space-y-3 pt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                  required
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm font-medium text-gray-800">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="receiveUpdates"
                  name="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                />
                <label htmlFor="receiveUpdates" className="ml-2 text-sm font-medium text-gray-800">
                  I want to receive email updates about events
                </label>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full h-[59px] bg-purple-800 hover:bg-purple-900 text-white text-2xl font-extrabold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-70 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'SIGN UP'
              )}
            </motion.button>

            {/* Social Signup */}
            <motion.div 
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-black font-semibold mb-4">Or signup with</p>
              
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  className="flex-1 h-[38px] bg-purple-100 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-blue-600 font-medium">Facebook</span>
                </motion.button>

                <motion.button
                  type="button"
                  className="flex-1 h-[38px] bg-purple-100 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-blue-700 font-medium">Google</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Login Link */}
            <motion.div 
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <p className="text-black font-semibold">
                Already have an account?{' '}
                <Link href="/login" className="text-yellow-600 hover:text-yellow-700 underline transition-colors">
                  Login here
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
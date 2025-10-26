'use client';

import Link from 'next/link'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import AnimatedEventsCarousel from '@/components/AnimatedEventsCarousel'
import SponsorCarousel from '@/components/SponsorCarousel'
import { ScrollRevealContainer } from '@/hooks/useScrollReveal'

// Dynamically import 3D components to avoid SSR issues
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Hero Section with 3D Background */}
      <section className="relative h-screen overflow-hidden">
        {/* 3D Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />}>
            <AnimatedBackground />
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                ✨ Welcome to the Future of Event Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Eventra
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              The ultimate smart college event management platform. Discover, organize, and experience events like never before.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/events"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Explore Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
              
              <Link
                href="/signup"
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transform transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 flex justify-center items-center space-x-8 text-white/80"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-sm">Events Hosted</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5000+</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm">Partner Colleges</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Animated Events Carousel Section */}
      <ScrollRevealContainer animation="fadeIn">
        <AnimatedEventsCarousel />
      </ScrollRevealContainer>

      {/* Sponsor Carousel with Animation */}
      <ScrollRevealContainer animation="fadeInUp" className="py-16">
        <SponsorCarousel />
      </ScrollRevealContainer>

      {/* Features Grid with Animations */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealContainer animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Modern Events
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and experience unforgettable events
            </p>
          </ScrollRevealContainer>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollRevealContainer animation="fadeInUp" delay={200}>
              <motion.div 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full"
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📅</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  Smart Discovery
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered event recommendations, advanced filtering, and personalized suggestions based on your interests.
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                  Learn more <span className="ml-2">→</span>
                </div>
              </motion.div>
            </ScrollRevealContainer>

            <ScrollRevealContainer animation="fadeInUp" delay={400}>
              <motion.div 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full"
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📱</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">
                  Digital Tickets
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  QR code tickets, contactless check-ins, real-time attendance tracking, and seamless mobile experience.
                </p>
                <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform">
                  Learn more <span className="ml-2">→</span>
                </div>
              </motion.div>
            </ScrollRevealContainer>

            <ScrollRevealContainer animation="fadeInUp" delay={600}>
              <motion.div 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full"
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.02
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors">
                  Live Analytics
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time insights, engagement metrics, participant feedback, and comprehensive event performance analytics.
                </p>
                <div className="mt-6 flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
                  Learn more <span className="ml-2">→</span>
                </div>
              </motion.div>
            </ScrollRevealContainer>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollRevealContainer animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for Everyone in Your
              <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                {" "}College Community
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tailored experiences for every role in your campus ecosystem
            </p>
          </ScrollRevealContainer>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollRevealContainer animation="fadeInUp" delay={200}>
              <motion.div 
                className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-blue-400 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl">🎓</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">Students</h3>
                <p className="text-blue-100 leading-relaxed">
                  Discover amazing events, register instantly, and build your personalized campus experience
                </p>
              </motion.div>
            </ScrollRevealContainer>

            <ScrollRevealContainer animation="fadeInUp" delay={400}>
              <motion.div 
                className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-green-400 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl">🎪</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">Organizers</h3>
                <p className="text-blue-100 leading-relaxed">
                  Create spectacular events, manage registrations seamlessly, and analyze engagement metrics
                </p>
              </motion.div>
            </ScrollRevealContainer>

            <ScrollRevealContainer animation="fadeInUp" delay={600}>
              <motion.div 
                className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-yellow-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl">🤝</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">Volunteers</h3>
                <p className="text-blue-100 leading-relaxed">
                  Access shift schedules, coordinate tasks, and be the backbone of successful events
                </p>
              </motion.div>
            </ScrollRevealContainer>

            <ScrollRevealContainer animation="fadeInUp" delay={800}>
              <motion.div 
                className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-purple-400 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-3xl">🏢</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Sponsors</h3>
                <p className="text-blue-100 leading-relaxed">
                  Track engagement metrics, manage promotional content, and maximize brand visibility
                </p>
              </motion.div>
            </ScrollRevealContainer>
          </div>
        </div>
      </section>

      {/* Animated Footer */}
      <ScrollRevealContainer animation="fadeIn">
        <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealContainer animation="fadeInUp" className="grid md:grid-cols-4 gap-8">
              <motion.div 
                className="space-y-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Eventra
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Smart College Event Management Platform revolutionizing campus experiences for the digital age.
                </p>
                <div className="flex space-x-4 pt-4">
                  <motion.a 
                    href="#" 
                    className="text-gray-400 hover:text-blue-400 text-xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    📘
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-gray-400 hover:text-blue-400 text-xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    🐦
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="text-gray-400 hover:text-blue-400 text-xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    📷
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-bold text-lg text-white">Quick Links</h4>
                <ul className="space-y-3">
                  <li><Link href="/events" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Events</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                  <li><Link href="/schedule" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Schedule</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                  <li><Link href="/sponsors" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Sponsors</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-bold text-lg text-white">Support</h4>
                <ul className="space-y-3">
                  <li><Link href="/help" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Help Center</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Contact Us</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                  <li><Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="font-bold text-lg text-white">Legal</h4>
                <ul className="space-y-3">
                  <li><Link href="/privacy" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                  <li><Link href="/terms" className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Terms of Use</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link></li>
                </ul>
              </motion.div>
            </ScrollRevealContainer>
            
            <ScrollRevealContainer animation="fadeIn" delay={400}>
              <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                <motion.p 
                  className="text-gray-400"
                  whileHover={{ scale: 1.05 }}
                >
                  &copy; 2025 Eventra. Made with ❤️ for the campus community.
                </motion.p>
              </div>
            </ScrollRevealContainer>
          </div>
        </footer>
      </ScrollRevealContainer>
    </div>
  )
}
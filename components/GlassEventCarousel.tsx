'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import EventImage from './EventImage';
import { GlassGradientButton, GlassOutlineButton } from './GlassButton';

interface EventPromo {
  id: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  category: string;
  registrationOpen: boolean;
  description?: string;
}

const promotionalEvents: EventPromo[] = [
  {
    id: '0',
    title: 'Welcome to Eventra',
    date: 'Smart College Event Management',
    venue: 'Your Campus Events Hub',
    image: '/images/welcome.jpg',
    category: 'Welcome',
    registrationOpen: true,
    description: 'Experience the future of campus event management with Eventra.',
  },
  {
    id: '1',
    title: 'Tech Fest 2025 - Innovation Summit',
    date: 'November 15-17, 2025',
    venue: 'Main Auditorium',
    image: '/images/events/tech-event-1.png',
    category: 'Technology',
    registrationOpen: true,
    description: 'Join us for the biggest tech fest of the year featuring AI, robotics, and innovation workshops.',
  },
  {
    id: '2',
    title: 'Cultural Night - Harmony Fest',
    date: 'December 5, 2025',
    venue: 'Open Air Theatre',
    image: '/images/events/cultural-event.png',
    category: 'Cultural',
    registrationOpen: true,
    description: 'A night of music, dance, and cultural performances celebrating diversity.',
  },
  {
    id: '3',
    title: 'Sports Championship 2025',
    date: 'November 25-30, 2025',
    venue: 'Sports Complex',
    image: '/images/events/sports-event.jpg',
    category: 'Sports',
    registrationOpen: false,
    description: 'Inter-college sports championship featuring multiple sporting events.',
  },
  {
    id: '4',
    title: 'Entrepreneurship Workshop',
    date: 'December 12, 2025',
    venue: 'Conference Hall',
    image: '/images/events/business-event.png',
    category: 'Workshop',
    registrationOpen: true,
    description: 'Learn from successful entrepreneurs and startup founders.',
  },
];

export default function GlassEventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isHovered) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % promotionalEvents.length);
      }, 4000); // Reduced to 4 seconds for better UX
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovered, currentIndex]); // Added currentIndex to dependencies

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % promotionalEvents.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + promotionalEvents.length) % promotionalEvents.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    })
  };

  return (
    <div 
      className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Carousel Container */}
      <div className="relative h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            {/* Glassmorphism Content Container */}
            <div className="relative h-full flex items-center justify-between px-8 md:px-16">
              
              {/* Background Image with Glass Overlay */}
              <div className="absolute inset-0 z-0">
                {promotionalEvents[currentIndex].image.includes('/images/events/') ? (
                  <EventImage
                    src={promotionalEvents[currentIndex].image}
                    alt={promotionalEvents[currentIndex].title}
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover opacity-30"
                    priority
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop&crop=center')`,
                    }}
                  />
                )}
                
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
              </div>

              {/* Main Content */}
              <motion.div 
                className="relative z-10 max-w-3xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {/* Glassmorphism Content Card */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                  
                  {/* Category and Status Badges */}
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <span className="bg-gradient-to-r from-pink-500/80 to-purple-500/80 backdrop-blur-md border border-pink-300/50 px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg">
                      {promotionalEvents[currentIndex].category}
                    </span>
                    {promotionalEvents[currentIndex].registrationOpen && (
                      <motion.span 
                        className="bg-green-500/80 backdrop-blur-md border border-green-300/50 px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        ✨ Registration Open
                      </motion.span>
                    )}
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h1 
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    {promotionalEvents[currentIndex].title}
                  </motion.h1>
                  
                  {/* Description */}
                  {promotionalEvents[currentIndex].description && (
                    <motion.p 
                      className="text-lg text-white/90 mb-6 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      {promotionalEvents[currentIndex].description}
                    </motion.p>
                  )}
                  
                  {/* Event Details */}
                  <motion.div 
                    className="grid md:grid-cols-2 gap-4 mb-8 text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{promotionalEvents[currentIndex].date}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-white/90">
                      <div className="p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{promotionalEvents[currentIndex].venue}</span>
                    </div>
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <GlassGradientButton
                      size="lg"
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      }
                    >
                      Explore Event
                    </GlassGradientButton>
                    
                    {promotionalEvents[currentIndex].registrationOpen && (
                      <GlassOutlineButton
                        size="lg"
                        icon={
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        }
                      >
                        Register Now
                      </GlassOutlineButton>
                    )}
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div 
                className="hidden lg:block absolute right-8 top-1/2 transform -translate-y-1/2 z-20"
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">25+</div>
                    <div className="text-sm text-white/70 mb-4">Events This Month</div>
                    
                    <div className="text-2xl font-bold text-white mb-1">5000+</div>
                    <div className="text-sm text-white/70 mb-4">Students Registered</div>
                    
                    <div className="text-xl font-bold text-white mb-1">98%</div>
                    <div className="text-sm text-white/70">Satisfaction Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Glassmorphism Navigation Arrows */}
      <motion.button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20 shadow-lg"
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg border border-white/20 text-white p-3 rounded-full transition-all duration-300 hover:bg-white/20 hover:scale-110 z-20 shadow-lg"
        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Glassmorphism Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {promotionalEvents.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 h-3 bg-white/90' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            } backdrop-blur-md border border-white/30 rounded-full shadow-lg`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
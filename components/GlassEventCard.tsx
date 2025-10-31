'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import EventImage from './EventImage';

interface Event {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  mode: string;
  fee: string;
  capacity: number;
  registered: number;
  registrationDeadline: string;
  poster: string;
  description: string;
  tags: string[];
}

interface GlassEventCardProps {
  event: Event;
  index: number;
}

const getCategoryColor = (category: string) => {
  const colors = {
    Tech: 'bg-blue-500/90 text-white',
    Cultural: 'bg-purple-500/90 text-white',
    Sports: 'bg-green-500/90 text-white',
    Academic: 'bg-orange-500/90 text-white',
    Workshop: 'bg-indigo-500/90 text-white',
    Conference: 'bg-red-500/90 text-white',
  };
  return colors[category as keyof typeof colors] || 'bg-gray-500/90 text-white';
};

const getModeIcon = (mode: string) => {
  if (mode === 'Online') {
    return (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
      </svg>
    );
  }
  return (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function GlassEventCard({ event, index }: GlassEventCardProps) {
  // Registration status calculations
  const isRegistrationFull = event.registered >= event.capacity;
  const isRegistrationExpired = new Date(event.registrationDeadline) < new Date();
  const isRegistrationClosed = isRegistrationFull || isRegistrationExpired;
  const isRegistrationClosingSoon = new Date(event.registrationDeadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  // Calculate registration percentage
  const registrationPercentage = Math.min((event.registered / event.capacity) * 100, 100);
  const availableSlots = event.capacity - event.registered;
  
  // Determine registration status color
  const getRegistrationStatusColor = () => {
    if (isRegistrationClosed) return 'from-red-500 to-red-600';
    if (registrationPercentage >= 90) return 'from-orange-500 to-red-500';
    if (registrationPercentage >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-pink-500 to-purple-500';
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      whileHover={{ y: -8 }}
    >
      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer">
        
        {/* Gradient Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
        
        {/* Inner Glow Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ padding: '1px' }}>
          <div className="w-full h-full bg-white/10 backdrop-blur-lg rounded-2xl" />
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Event Image */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            
            {/* Registration Status Badge */}
            {isRegistrationClosed && (
              <div className="absolute top-4 left-4 z-30">
                <motion.div 
                  className="flex items-center gap-1 bg-red-500/90 backdrop-blur-md border border-red-400/50 px-3 py-1 rounded-full shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-white text-xs font-semibold">
                    {isRegistrationFull ? 'FULL' : 'CLOSED'}
                  </span>
                </motion.div>
              </div>
            )}

            {/* Category Badge */}
            <div className={`absolute top-4 ${isRegistrationClosed ? 'left-4 mt-10' : 'left-4'} z-20`}>
              <motion.span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/30 ${getCategoryColor(event.category)}`}
                whileHover={{ scale: 1.05 }}
              >
                {event.category}
              </motion.span>
            </div>

            {/* Mode Badge */}
            <div className="absolute top-4 right-4 z-20">
              <motion.div 
                className="flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/30 px-2 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                {getModeIcon(event.mode)}
                <span className="text-white text-xs font-medium">{event.mode}</span>
              </motion.div>
            </div>

            {/* Event Image */}
            {event.poster ? (
              <EventImage
                src={event.poster}
                alt={event.title}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400/80 to-blue-500/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium">Event Poster</p>
                </div>
              </div>
            )}
          </div>

          {/* Event Content */}
          <div className="p-6 bg-white/5 backdrop-blur-sm">
            <motion.h3 
              className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:via-yellow-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 20px rgba(255, 255, 255, 0.9)"
              }}
            >
              {event.title}
            </motion.h3>
            
            <p className="text-white/80 text-sm mb-3 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-white/70">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0V9a1 1 0 011-1h4a1 1 0 011 1v12m-6 0h6" />
                </svg>
                {event.organizer}
              </div>
              
              <div className="flex items-center text-sm text-white/70">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m4 0V9a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0H4" />
                </svg>
                {formatDate(event.date)} • {event.time}
              </div>
              
              <div className="flex items-center text-sm text-white/70">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.venue}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.slice(0, 3).map(tag => (
                <motion.span 
                  key={tag} 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/10 backdrop-blur-sm border border-white/20 text-white/80"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Registration Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <span className="font-semibold text-purple-300">{event.fee}</span>
                <span className="text-white/60 ml-2">• {event.registered}/{event.capacity} registered</span>
              </div>
              <div className="w-20 bg-white/20 backdrop-blur-sm rounded-full h-2 border border-white/30">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((event.registered / event.capacity) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link href={`/events/${event.id}`} className="flex-1">
                <motion.button 
                  className="w-full bg-white/10 backdrop-blur-md border border-white/30 text-white py-2 px-4 rounded-xl font-medium hover:bg-gradient-to-r hover:from-pink-500/80 hover:to-purple-500/80 hover:border-pink-300/50 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ 
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register Now!
                </motion.button>
              </Link>
              
              <motion.button 
                className="p-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                whileHover={{ 
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
                  y: -2 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
            </div>

            {/* Registration Deadline Warning */}
            {new Date(event.registrationDeadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
              <div className="mt-3 p-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-lg">
                <div className="flex items-center text-xs text-orange-200">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Registration closes on {formatDate(event.registrationDeadline)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
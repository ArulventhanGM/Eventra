'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import EventImage from './EventImage';

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  category: string;
  description: string;
  organizer: string;
  capacity: number;
  registered: number;
}

export default function AnimatedEventsCarousel() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Remove duplicates based on event ID first, then by title as fallback
          const uniqueEvents = data.data.filter((event: any, index: number, array: any[]) => {
            // Primary deduplication by ID
            const firstOccurrenceById = array.findIndex((e: any) => e.id === event.id) === index;
            if (!firstOccurrenceById) return false;
            
            // Secondary deduplication by title (in case of different IDs but same event)
            const firstOccurrenceByTitle = array.findIndex((e: any) => 
              e.title?.toLowerCase().trim() === event.title?.toLowerCase().trim()
            ) === index;
            
            return firstOccurrenceByTitle;
          });
          
          // Transform and limit to 6 unique events for carousel
          const transformedEvents = uniqueEvents.slice(0, 6).map((event: any) => ({
            id: event.id,
            title: event.title,
            date: new Date(event.startDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }),
            venue: event.venue || 'TBA',
            image: event.bannerImage || '/images/events/tech-event-1.png',
            category: event.category || 'Event',
            description: event.shortDescription || event.description || 'Join us for an amazing event!',
            organizer: event.organizer || 'Event Organizer',
            capacity: event.capacity || 0,
            registered: event.currentRegistrations || 0,
          }));
          setEvents(transformedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to sample events
        setEvents(sampleEvents);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (events.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
        <motion.div 
          className="text-white text-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading amazing events...
        </motion.div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">No Events Available</h2>
          <p>Check back soon for exciting events!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-12 items-center w-full">
              {/* Content Side */}
              <motion.div 
                className="text-white z-10"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  {events[currentIndex].category}
                </motion.div>
                
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {events[currentIndex].title}
                </motion.h1>
                
                <motion.p 
                  className="text-xl mb-6 text-blue-100"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {events[currentIndex].description}
                </motion.p>
                
                <motion.div 
                  className="space-y-2 mb-8 text-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📅</span>
                    <span>{events[currentIndex].date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📍</span>
                    <span>{events[currentIndex].venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">👥</span>
                    <span>{events[currentIndex].registered}/{events[currentIndex].capacity} registered</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex space-x-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Link
                    href={`/events/${events[currentIndex].id}`}
                    className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/events/${events[currentIndex].id}/register`}
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-200"
                  >
                    Register Now
                  </Link>
                </motion.div>
              </motion.div>

              {/* Image Side */}
              <motion.div 
                className="relative"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div
                  className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ 
                    rotateY: 5, 
                    rotateX: 5,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 z-10" />
                  <EventImage
                    src={events[currentIndex].image}
                    alt={events[currentIndex].title}
                    width={600}
                    height={400}
                    className="w-full h-full"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 z-20"
      >
        ←
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl backdrop-blur-sm transition-all duration-200 hover:scale-110 z-20"
      >
        →
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          key={currentIndex}
        />
      </div>
    </div>
  );
}

// Sample events as fallback
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2025',
    date: 'November 15, 2025',
    venue: 'Main Auditorium',
    image: '/images/events/tech-event-1.png',
    category: 'Technology',
    description: 'Join us for the biggest tech event of the year featuring AI, blockchain, and cutting-edge innovations.',
    organizer: 'Tech Club',
    capacity: 500,
    registered: 342,
  },
  {
    id: '2',
    title: 'Cultural Harmony Festival',
    date: 'December 5, 2025',
    venue: 'Open Air Theatre',
    image: '/images/events/cultural-event.jpg',
    category: 'Cultural',
    description: 'Celebrate diversity through music, dance, and art from around the world.',
    organizer: 'Cultural Committee',
    capacity: 800,
    registered: 567,
  },
  {
    id: '3',
    title: 'Entrepreneurship Bootcamp',
    date: 'November 20, 2025',
    venue: 'Business Center',
    image: '/images/events/business-event.png',
    category: 'Business',
    description: 'Learn from successful entrepreneurs and build your startup dreams.',
    organizer: 'E-Cell',
    capacity: 200,
    registered: 156,
  },
  {
    id: '4',
    title: 'AI & Machine Learning Workshop',
    date: 'December 10, 2025',
    venue: 'Tech Hub',
    image: '/images/events/tech-event-2.png',
    category: 'Technology',
    description: 'Hands-on workshop covering the latest developments in AI and machine learning.',
    organizer: 'AI Society',
    capacity: 150,
    registered: 89,
  },
  {
    id: '5',
    title: 'Sports Championship Finals',
    date: 'November 30, 2025',
    venue: 'Sports Complex',
    image: '/images/events/sports-event.jpg',
    category: 'Sports',
    description: 'Exciting championship finals featuring various sports competitions.',
    organizer: 'Sports Committee',
    capacity: 1000,
    registered: 743,
  },
];
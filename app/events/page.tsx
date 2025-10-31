'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassEventCard from '@/components/GlassEventCard';
import { GlassPrimaryButton, GlassOutlineButton } from '@/components/GlassButton';

// Event interface for TypeScript
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

// Utility function for consistent date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Real events will be fetched from API

const categories = ["All", "Tech", "Cultural", "Sports"];
const modes = ["All", "Online", "Offline", "Hybrid"];
const sortOptions = ["Newest", "Popular", "Upcoming", "Registration Closing"];

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const eventsPerPage = 6;

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.success && data.data) {
          // Transform API data to match component expectations
          const transformedEvents = data.data.map((event: any) => ({
            id: event.id,
            title: event.title,
            organizer: event.organizer || 'Unknown Organizer',
            date: new Date(event.startDate).toISOString().split('T')[0], // Extract date part
            time: event.startTime || "09:00 AM",
            venue: event.venue || 'TBA',
            category: event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1).toLowerCase() : 'Other',
            mode: event.isOnline ? "Online" : "Offline",
            fee: event.ticketPrice > 0 ? `₹${event.ticketPrice}` : "Free",
            capacity: event.capacity || 0,
            registered: event.currentRegistrations || 0,
            registrationDeadline: new Date(event.startDate).toISOString().split('T')[0],
            poster: event.bannerImage || "/api/placeholder/300/200",
            description: event.shortDescription || event.description || 'No description available',
            tags: ["Event"] // Default tags since API doesn't return them
          }));
          
          setEvents(transformedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = [...events];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Mode filter
    if (selectedMode !== 'All') {
      filtered = filtered.filter(event => event.mode === selectedMode);
    }

    // Sort
    switch (sortBy) {
      case 'Popular':
        filtered.sort((a, b) => b.registered - a.registered);
        break;
      case 'Upcoming':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'Registration Closing':
        filtered.sort((a, b) => new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime());
        break;
      default: // Newest
        filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [events, searchQuery, selectedCategory, selectedMode, sortBy]);

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Tech': return 'bg-blue-100 text-blue-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      case 'Sports': return 'bg-green-100 text-green-800';
      case 'Business': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Online':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'Hybrid':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        );
      default: // Offline
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      {/* Glassmorphism Header */}
      <div className="relative py-20 px-6">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text mb-4">
              Explore Events
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing events happening at your campus and join the excitement
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Glassmorphism Search and Filter Bar */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Glassmorphism Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search events, organizers, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-300/50 transition-all"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Glassmorphism Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800 text-white">{category} Category</option>
                ))}
              </select>

              {/* Mode Filter */}
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              >
                {modes.map(mode => (
                  <option key={mode} value={mode} className="bg-gray-800 text-white">{mode} Mode</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option} className="bg-gray-800 text-white">Sort by {option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-white/70">
            Showing <span className="text-purple-300 font-semibold">{currentEvents.length}</span> of <span className="text-purple-300 font-semibold">{filteredEvents.length}</span> events
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {currentEvents.map((event, index) => (
            <GlassEventCard key={event.id} event={event} index={index} />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassOutlineButton
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </GlassOutlineButton>
            
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-xl backdrop-blur-md border transition-all duration-300 ${
                  currentPage === index + 1
                    ? 'bg-gradient-to-r from-pink-500/80 to-purple-500/80 border-pink-300/50 text-white shadow-lg'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
            ))}
            
            <GlassOutlineButton
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </GlassOutlineButton>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <svg className="w-24 h-24 mx-auto text-white/60 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-white/70 mb-6">Try adjusting your search criteria or filters</p>
            <GlassPrimaryButton
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedMode('All');
                setSortBy('Newest');
              }}
            >
              Clear Filters
            </GlassPrimaryButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}
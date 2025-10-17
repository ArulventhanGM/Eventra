'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Type definitions
interface Event {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  category: string;
  description: string;
  speaker: string;
  registrationRequired: boolean;
  maxCapacity: number;
  currentRegistrations: number;
}

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

type CategoryColors = {
  [key: string]: string;
};

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    startTime: "09:00",
    endTime: "11:00",
    venue: "Computer Lab A",
    organizer: "Tech Club",
    category: "Tech",
    description: "Learn the fundamentals of AI and ML with hands-on coding sessions.",
    speaker: "Dr. Sarah Johnson",
    registrationRequired: true,
    maxCapacity: 50,
    currentRegistrations: 32
  },
  {
    id: 2,
    title: "Cultural Dance Performance",
    startTime: "10:30",
    endTime: "11:30",
    venue: "Main Auditorium",
    organizer: "Cultural Committee",
    category: "Cultural",
    description: "Traditional and contemporary dance performances by student groups.",
    speaker: "Various Artists",
    registrationRequired: false,
    maxCapacity: 500,
    currentRegistrations: 245
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    startTime: "11:00",
    endTime: "13:00",
    venue: "Seminar Hall",
    organizer: "Entrepreneurship Cell",
    category: "Tech",
    description: "Students present their startup ideas to industry experts.",
    speaker: "Panel of Judges",
    registrationRequired: true,
    maxCapacity: 30,
    currentRegistrations: 28
  },
  {
    id: 4,
    title: "Photography Workshop",
    startTime: "14:00",
    endTime: "16:00",
    venue: "Art Studio",
    organizer: "Photography Club",
    category: "Workshop",
    description: "Professional photography techniques and portfolio building.",
    speaker: "Mark Williams",
    registrationRequired: true,
    maxCapacity: 25,
    currentRegistrations: 18
  },
  {
    id: 5,
    title: "Basketball Tournament Finals",
    startTime: "15:00",
    endTime: "17:00",
    venue: "Sports Complex",
    organizer: "Sports Committee",
    category: "Sports",
    description: "Final match of the inter-department basketball tournament.",
    speaker: "Team Captains",
    registrationRequired: false,
    maxCapacity: 200,
    currentRegistrations: 156
  },
  {
    id: 6,
    title: "Music Concert",
    startTime: "18:00",
    endTime: "21:00",
    venue: "Open Ground",
    organizer: "Music Society",
    category: "Cultural",
    description: "Live music performances by student bands and guest artists.",
    speaker: "Multiple Bands",
    registrationRequired: false,
    maxCapacity: 1000,
    currentRegistrations: 687
  }
];

const days = ["Day 1", "Day 2", "Day 3"];
const categories = ["All", "Tech", "Cultural", "Sports", "Workshop"];

const categoryColors: CategoryColors = {
  Tech: "bg-indigo-100 text-indigo-800 border-indigo-200",
  Cultural: "bg-pink-100 text-pink-800 border-pink-200",
  Sports: "bg-green-100 text-green-800 border-green-200",
  Workshop: "bg-yellow-100 text-yellow-800 border-yellow-200"
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState<string>("Day 1");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"timeline" | "calendar">("timeline");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [mySchedule, setMySchedule] = useState<Event[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter events based on search and category
  const filteredEvents = mockEvents.filter((event: Event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add event to personal schedule
  const addToSchedule = (event: Event) => {
    // Check for conflicts
    const hasConflict = mySchedule.some(scheduledEvent => {
      const eventStart = parseInt(event.startTime.replace(':', ''));
      const eventEnd = parseInt(event.endTime.replace(':', ''));
      const scheduledStart = parseInt(scheduledEvent.startTime.replace(':', ''));
      const scheduledEnd = parseInt(scheduledEvent.endTime.replace(':', ''));
      
      return (eventStart < scheduledEnd && eventEnd > scheduledStart);
    });

    if (hasConflict) {
      alert(`⚠️ Schedule Conflict!\n\nThis event overlaps with another event in your schedule. Please choose one to keep.`);
      return;
    }

    if (!mySchedule.find(e => e.id === event.id)) {
      setMySchedule([...mySchedule, event]);
      alert(`✅ Event Added!\n\n"${event.title}" has been added to your personal schedule.`);
    }
  };

  // Remove event from personal schedule
  const removeFromSchedule = (eventId: number) => {
    setMySchedule(mySchedule.filter(e => e.id !== eventId));
  };

  // Check if current time is within event time
  const isEventActive = (startTime: string, endTime: string) => {
    const now = currentTime.getHours() * 100 + currentTime.getMinutes();
    const start = parseInt(startTime.replace(':', ''));
    const end = parseInt(endTime.replace(':', ''));
    return now >= start && now <= end;
  };

  // Calendar view specific state and functions
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<CalendarDay | null>(null);

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const eventsForDay = getEventsForDate(date);
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        events: eventsForDay
      });
    }
    
    return days;
  };

  // Get events for a specific date (mock implementation)
  const getEventsForDate = (date: Date): Event[] => {
    // In a real app, this would filter events by date
    // For now, we'll distribute our mock events across different days
    const dayOfMonth = date.getDate();
    const eventsMap: { [key: number]: Event[] } = {
      4: [mockEvents[0]], // AI Workshop on 4th
      11: [mockEvents[2]], // Startup Pitch on 11th
      12: [mockEvents[1], mockEvents[3]], // Multiple events on 12th
      15: [mockEvents[4]], // Basketball on 15th
      20: [mockEvents[5]], // Music Concert on 20th
    };
    return eventsMap[dayOfMonth] || [];
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  // Format month/year for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗓️ Event Schedule
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay organized and never miss an event! Browse the complete schedule, 
            add events to your personal calendar, and get real-time updates.
          </p>
        </motion.div>

        {/* Controls Bar */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Day Selector */}
            <div className="flex gap-2">
              {days.map((day: string) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedDay === day
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map((category: string) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === "timeline" ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                {viewMode === "calendar" ? "📋 List View" : "Timeline"}
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === "calendar" ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {viewMode === "timeline" ? "📅 Calendar View" : "Calendar"}
              </button>
            </div>
          </div>

          {/* My Schedule Summary */}
          {mySchedule.length > 0 && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-indigo-900">
                    My Schedule ({mySchedule.length} events)
                  </span>
                </div>
                <Link
                  href="/attendee-schedule"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  View Full Schedule →
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        {/* Events Display */}
        <AnimatePresence mode="wait">
          {viewMode === "timeline" ? (
            // Timeline View
            <motion.div 
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {filteredEvents.length === 0 ? (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </motion.div>
              ) : (
                <motion.div 
                  className="grid gap-6"
                  layout
                >
                  {filteredEvents.map((event: Event, index: number) => (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                        isEventActive(event.startTime, event.endTime) ? 'ring-2 ring-indigo-500' : ''
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[event.category]}`}>
                                {event.category}
                              </span>
                              {isEventActive(event.startTime, event.endTime) && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full animate-pulse">
                                  🔴 Live Now
                                </span>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">{event.startTime} - {event.endTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{event.venue}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>{event.organizer}</span>
                              </div>
                            </div>

                            <p className="text-gray-700 mb-4">{event.description}</p>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-gray-600">
                                  {event.currentRegistrations}/{event.maxCapacity} registered
                                </span>
                              </div>
                              {event.registrationRequired && (
                                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                                  Registration Required
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-3">
                            <button
                              onClick={() => setSelectedEvent(event)}
                              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                            >
                              View Details
                            </button>
                            
                            {mySchedule.find(e => e.id === event.id) ? (
                              <button
                                onClick={() => removeFromSchedule(event.id)}
                                className="px-6 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
                              >
                                ✓ In My Schedule
                              </button>
                            ) : (
                              <button
                                onClick={() => addToSchedule(event)}
                                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                              >
                                + Add to Schedule
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            // Calendar View
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {formatMonthYear(currentMonth)}
                </h2>
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: string) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((dayInfo: CalendarDay, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.01 }}
                      className={`
                        relative min-h-[100px] p-2 border rounded-lg cursor-pointer transition-all duration-200
                        ${dayInfo.isCurrentMonth ? 'bg-white hover:bg-indigo-50' : 'bg-gray-50 text-gray-400'}
                        ${dayInfo.isToday ? 'ring-2 ring-indigo-500 bg-indigo-100' : 'border-gray-200'}
                        ${dayInfo.events.length > 0 ? 'hover:shadow-md' : ''}
                      `}
                      onClick={() => dayInfo.events.length > 0 && setSelectedDate(dayInfo)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${dayInfo.isToday ? 'text-indigo-900' : ''}`}>
                          {dayInfo.day}
                        </span>
                        {dayInfo.events.length > 0 && (
                          <div className="flex gap-1">
                            {dayInfo.events.slice(0, 3).map((event: Event, eventIndex: number) => (
                              <div
                                key={eventIndex}
                                className={`w-2 h-2 rounded-full ${
                                  event.category === 'Tech' ? 'bg-indigo-500' :
                                  event.category === 'Cultural' ? 'bg-pink-500' :
                                  event.category === 'Sports' ? 'bg-green-500' :
                                  'bg-yellow-500'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Event badges */}
                      <div className="space-y-1">
                        {dayInfo.events.slice(0, 2).map((event: Event, eventIndex: number) => (
                          <div
                            key={eventIndex}
                            className={`text-xs px-2 py-1 rounded-full truncate ${categoryColors[event.category]}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayInfo.events.length > 2 && (
                          <div className="text-xs text-gray-600 font-medium">
                            +{dayInfo.events.length - 2} more
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date Events Modal (Calendar View) */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedDate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      📅 {selectedDate.date.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h2>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedDate.events.map((event: Event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-gray-900">{event.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[event.category]}`}>
                                {event.category}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{event.startTime} - {event.endTime}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{event.venue}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">{event.description}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                setSelectedEvent(event);
                                setSelectedDate(null);
                              }}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                            >
                              View Details
                            </button>
                            {mySchedule.find(e => e.id === event.id) ? (
                              <button
                                onClick={() => removeFromSchedule(event.id)}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                              >
                                ✓ In Schedule
                              </button>
                            ) : (
                              <button
                                onClick={() => addToSchedule(event)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                              >
                                + Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Time</h4>
                        <p className="text-gray-600">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Venue</h4>
                        <p className="text-gray-600">{selectedEvent.venue}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Organizer</h4>
                        <p className="text-gray-600">{selectedEvent.organizer}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Speaker</h4>
                        <p className="text-gray-600">{selectedEvent.speaker}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-700">{selectedEvent.description}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                      <div>
                        <p className="font-medium text-indigo-900">
                          {selectedEvent.currentRegistrations}/{selectedEvent.maxCapacity} Registered
                        </p>
                        <p className="text-sm text-indigo-600">
                          {selectedEvent.maxCapacity - selectedEvent.currentRegistrations} spots remaining
                        </p>
                      </div>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ 
                            width: `${(selectedEvent.currentRegistrations / selectedEvent.maxCapacity) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Register Now
                      </button>
                      {mySchedule.find(e => e.id === selectedEvent.id) ? (
                        <button
                          onClick={() => removeFromSchedule(selectedEvent.id)}
                          className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
                        >
                          ✓ In Schedule
                        </button>
                      ) : (
                        <button
                          onClick={() => addToSchedule(selectedEvent)}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                          + Add to Schedule
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
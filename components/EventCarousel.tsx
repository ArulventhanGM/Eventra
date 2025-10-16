'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface EventPromo {
  id: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  category: string;
  registrationOpen: boolean;
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
  },
  {
    id: '1',
    title: 'Tech Fest 2025 - Innovation Summit',
    date: 'November 15-17, 2025',
    venue: 'Main Auditorium',
    image: '/images/tech-fest.jpg',
    category: 'Technology',
    registrationOpen: true,
  },
  {
    id: '2',
    title: 'Cultural Night - Harmony Fest',
    date: 'December 5, 2025',
    venue: 'Open Air Theatre',
    image: '/images/cultural-fest.jpg',
    category: 'Cultural',
    registrationOpen: true,
  },
  {
    id: '3',
    title: 'Sports Championship 2025',
    date: 'November 25-30, 2025',
    venue: 'Sports Complex',
    image: '/images/sports-fest.jpg',
    category: 'Sports',
    registrationOpen: false,
  },
  {
    id: '4',
    title: 'Entrepreneurship Workshop',
    date: 'December 12, 2025',
    venue: 'Conference Hall',
    image: '/images/workshop.jpg',
    category: 'Workshop',
    registrationOpen: true,
  },
  {
    id: '5',
    title: 'Annual Literary Meet',
    date: 'January 8, 2026',
    venue: 'Library Auditorium',
    image: '/images/literary-fest.jpg',
    category: 'Literary',
    registrationOpen: true,
  },
];

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % promotionalEvents.length);
      }, 4000); // Change slide every 8 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promotionalEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promotionalEvents.length) % promotionalEvents.length);
  };

  return (
    <div 
      className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {promotionalEvents.map((event) => (
          <div key={event.id} className="min-w-full h-full relative">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&crop=center')`,
              }}
            ></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16">
              <div className="text-white max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-500 px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                  {event.registrationOpen && (
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      Registration Open
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {event.title}
                </h1>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6 text-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                    Learn More
                  </button>
                  {event.registrationOpen && (
                    <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {promotionalEvents.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
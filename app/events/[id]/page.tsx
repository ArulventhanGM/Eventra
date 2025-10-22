'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Custom Float Component without Drei
function CustomFloat({ children, speed = 1, rotationIntensity = 1, floatIntensity = 1 }: any) {
  const meshRef = useRef<any>();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time * speed) * floatIntensity * 0.2;
      meshRef.current.rotation.x = Math.sin(time * speed * 0.5) * rotationIntensity * 0.1;
      meshRef.current.rotation.z = Math.cos(time * speed * 0.3) * rotationIntensity * 0.1;
    }
  });
  
  return <group ref={meshRef}>{children}</group>;
}

// 3D Event Logo Component
function EventLogo3D({ eventName }: { eventName: string }) {
  return (
    <CustomFloat speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <group>
        {/* Main logo shape */}
        <mesh>
          <boxGeometry args={[4, 1, 0.5]} />
          <meshStandardMaterial color="#6366f1" />
        </mesh>
        
        {/* Decorative elements */}
        <mesh position={[-2, 0, 0.3]}>
          <cylinderGeometry args={[0.2, 0.2, 1]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        
        <mesh position={[2, 0, 0.3]}>
          <cylinderGeometry args={[0.2, 0.2, 1]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        
        {/* Center decoration */}
        <mesh position={[0, 0, 0.3]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </group>
    </CustomFloat>
  );
}

// 3D Floating Icons Component
function FloatingIcons() {
  return (
    <>
      <CustomFloat speed={2} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[3, 2, 0]}>
          <icosahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
      </CustomFloat>
      
      <CustomFloat speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, -1, 0]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      </CustomFloat>
      
      <CustomFloat speed={1.8} rotationIntensity={3} floatIntensity={1.5}>
        <mesh position={[0, -3, 2]}>
          <torusGeometry args={[0.3, 0.1, 16, 100]} />
          <meshStandardMaterial color="#10b981" />
        </mesh>
      </CustomFloat>
    </>
  );
}

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();
        
        if (data.success) {
          setEvent(data.event);
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link href="/events" className="text-blue-400 hover:text-blue-300">
            ← Back to Events
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Section with 3D Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} />
              
              {/* 3D Event Logo */}
              <group>
                <EventLogo3D eventName={event.name} />
              </group>
              
              {/* Floating Decorative Elements */}
              <FloatingIcons />
            </Suspense>
          </Canvas>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {event.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              {event.tagline}
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href={`/events/${eventId}/register`}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 shadow-lg"
                >
                  Register Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
          <p className="mt-2 text-sm">Scroll Down</p>
        </motion.div>
      </section>

      {/* Event Details Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Event Details</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {event.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Date & Time */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
              <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-600">{event.time}</p>
            </motion.div>

            {/* Venue */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Venue</h3>
              <p className="text-gray-600">{event.venue}</p>
            </motion.div>

            {/* Prize Pool */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Prize Pool</h3>
              <p className="text-gray-600 font-bold text-lg">{event.prizePool}</p>
            </motion.div>

            {/* Registration Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -10 }}
                className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Registration</h3>
              <p className="text-gray-600">{event.registered}/{event.capacity} registered</p>
              <p className="text-gray-600">Fee: {event.fee}</p>
            </motion.div>

            {/* Organizer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Organizer</h3>
              <p className="text-gray-600">{event.organizer}</p>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -15 }}
                className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
              <p className="text-gray-600">{event.category}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Event Schedule</h2>
            <p className="text-xl text-gray-600">Here's what to expect during the event</p>
          </motion.div>

          <div className="relative">
            
            <div className="space-y-12">
              {event.schedule && event.schedule.length > 0 ? event.schedule.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                    >
                      <div className="text-sm text-blue-600 font-semibold mb-1">{item.day}</div>
                      <div className="text-lg font-bold text-gray-900 mb-2">{item.time}</div>
                      <div className="text-gray-600">{item.activity}</div>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"
                    />
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              )) : (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center py-12"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule Coming Soon!</h3>
                    <p className="text-gray-600">
                      Event schedule will be announced closer to the event date. 
                      Stay tuned for updates!
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Sponsors</h2>
              <p className="text-xl text-gray-600">Proudly supported by industry leaders</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {event.sponsors.map((sponsor: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-50 p-8 rounded-lg border border-gray-200 flex items-center justify-center"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-12 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call-to-Action Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Don't miss out on this incredible opportunity. Register now and be part of something amazing!
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href={`/events/${eventId}/register`}>
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                    background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Register Now
                </motion.button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 text-blue-100"
            >
              <p className="text-sm">
                {event.capacity - event.registered} spots remaining • Registration closes soon
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
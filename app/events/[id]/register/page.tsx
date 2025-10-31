'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

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

// 3D Success Trophy Component
function SuccessTrophy() {
  return (
    <CustomFloat speed={2} rotationIntensity={1} floatIntensity={2}>
      <group>
        {/* Trophy Base */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.8, 1, 0.3]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
        
        {/* Trophy Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.7, 1.5]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
        
        {/* Trophy Handles */}
        <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.3, 0.05]} />
          <meshStandardMaterial color="#ffed4e" />
        </mesh>
        <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[0.3, 0.05]} />
          <meshStandardMaterial color="#ffed4e" />
        </mesh>
        
        {/* Trophy Top */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.3]} />
          <meshStandardMaterial color="#ffd700" />
        </mesh>
      </group>
    </CustomFloat>
  );
}

// 3D Confetti Component
function Confetti() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
  
  return (
    <>
      {Array.from({ length: 50 }).map((_, i) => (
        <CustomFloat
          key={i}
          speed={Math.random() * 3 + 1}
          rotationIntensity={Math.random() * 2 + 1}
          floatIntensity={Math.random() * 3 + 1}
        >
          <mesh position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={colors[Math.floor(Math.random() * colors.length)]} />
          </mesh>
        </CustomFloat>
      ))}
    </>
  );
}

// Form data interface
interface FormData {
  fullName: string;
  email: string;
  college: string;
  department: string;
  teamName?: string;
  numberOfMembers: number;
  phoneNumber: string;
  additionalInfo?: string;
}

export default function EventRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState<string>('');
  const [existingRegistration, setExistingRegistration] = useState<any>(null);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const numberOfMembers = watch('numberOfMembers', 1);
  const emailValue = watch('email');

  // Check for existing registration when email changes
  const checkExistingRegistration = async (email: string) => {
    if (!email || !eventId) return;
    
    setIsCheckingRegistration(true);
    try {
      const response = await fetch(`/api/events/check-registration?eventId=${eventId}&email=${encodeURIComponent(email)}`);
      const result = await response.json();
      
      if (result.success && result.isRegistered) {
        setExistingRegistration(result.registration);
      } else {
        setExistingRegistration(null);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
      setExistingRegistration(null);
    } finally {
      setIsCheckingRegistration(false);
    }
  };

  // Debounce email checking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (emailValue && emailValue.includes('@')) {
        checkExistingRegistration(emailValue);
      } else {
        setExistingRegistration(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [emailValue, eventId]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to register for event
      const registrationData = {
        ...data,
        eventId,
        registrationDate: new Date().toISOString()
      };

      // In production, replace this with actual API call
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const result = await response.json();
        setRegistrationId(result.registrationId || 'REG' + Date.now());
        setShowSuccess(true);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Registration failed';
        
        if (response.status === 409) {
          // Handle conflict errors (duplicate registration, event full, etc.)
          alert(`❌ ${errorMessage}`);
        } else if (response.status === 400) {
          // Handle validation errors
          alert(`⚠️ ${errorMessage}`);
        } else if (response.status === 404) {
          // Handle not found errors
          alert(`🔍 ${errorMessage}`);
        } else {
          // Handle other errors
          alert(`❌ ${errorMessage}`);
        }
        return; // Don't throw error, just return
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle network or other errors
      alert('❌ Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 overflow-hidden">
        {/* 3D Success Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffd700" />
              
              <SuccessTrophy />
              <Confetti />
            </Suspense>
          </Canvas>
        </div>

        {/* Success Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-center text-white max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6">🎉</h1>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Registration Successful!
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 mb-8">
                Welcome aboard! Your registration has been confirmed.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20"
              >
                <h3 className="text-2xl font-semibold mb-4">Registration Details</h3>
                <p className="text-lg mb-2">Registration ID: <span className="font-mono font-bold text-yellow-300">{registrationId}</span></p>
                <p className="text-gray-200">
                  A confirmation email has been sent to your registered email address.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="space-y-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/events/${eventId}`)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg mr-4"
                >
                  Back to Event
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/events')}
                  className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white/30"
                >
                  Browse More Events
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href={`/events/${eventId}`} className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Back to Event Details
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Event Registration
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Fill out the form below to secure your spot at this amazing event!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Personal Information
                </h2>

                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('fullName', { required: 'Full name is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                  {isCheckingRegistration && (
                    <p className="text-blue-500 text-sm mt-1 flex items-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Checking registration status...
                    </p>
                  )}
                  {existingRegistration && (
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm font-medium flex items-center">
                        ⚠️ You are already registered for this event!
                      </p>
                      <p className="text-yellow-700 text-xs mt-1">
                        Registered on: {new Date(existingRegistration.registeredAt).toLocaleDateString()}
                      </p>
                      <p className="text-yellow-700 text-xs">
                        Status: {existingRegistration.status}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Phone Number */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    {...register('phoneNumber', { required: 'Phone number is required' })}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
                </motion.div>
              </div>

              {/* Academic Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Academic Information
                </h2>

                {/* College */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College/Institution *
                  </label>
                  <input
                    {...register('college', { required: 'College is required' })}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    placeholder="Enter your college name"
                  />
                  {errors.college && (
                    <p className="text-red-500 text-sm mt-1">{errors.college.message}</p>
                  )}
                </motion.div>

                {/* Department */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    {...register('department', { required: 'Department is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                  >
                    <option value="">Select your department</option>
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="EEE">Electrical & Electronics</option>
                    <option value="MECH">Mechanical Engineering</option>
                    <option value="CIVIL">Civil Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="MBA">Master of Business Administration</option>
                    <option value="MCA">Master of Computer Applications</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                  )}
                </motion.div>
              </div>

              {/* Team Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Team Information
                </h2>

                {/* Number of Members */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Members *
                  </label>
                  <select
                    {...register('numberOfMembers', { required: 'Number of members is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                  >
                    <option value={1}>1 (Individual)</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  {errors.numberOfMembers && (
                    <p className="text-red-500 text-sm mt-1">{errors.numberOfMembers.message}</p>
                  )}
                </motion.div>

                {/* Team Name - Only show if more than 1 member */}
                <AnimatePresence>
                  {numberOfMembers > 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team Name *
                      </label>
                      <input
                        {...register('teamName', { 
                          required: numberOfMembers > 1 ? 'Team name is required' : false 
                        })}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900"
                        placeholder="Enter your team name"
                      />
                      {errors.teamName && (
                        <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Additional Information
                </h2>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    {...register('additionalInfo')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 resize-none"
                    placeholder="Any additional information you'd like to share..."
                  />
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="pt-8"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting || existingRegistration}
                  whileHover={{ scale: (isSubmitting || existingRegistration) ? 1 : 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
                    (isSubmitting || existingRegistration)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                      />
                      Processing Registration...
                    </span>
                  ) : existingRegistration ? (
                    '✅ Already Registered'
                  ) : (
                    'Complete Registration'
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
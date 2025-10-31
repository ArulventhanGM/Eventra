'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Types
interface EventFormData {
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  venue: string;
  capacity: string;
  isOnline: boolean;
  onlineLink: string;
  ticketType: string;
  ticketPrice: string;
  organizerEmail: string;
  organizerPhone: string;
  bannerImage: File | null;
}

const EVENT_CATEGORIES = [
  'TECH', 'CULTURAL', 'SPORTS', 'LITERARY', 'ACADEMIC', 
  'SOCIAL', 'WORKSHOP', 'SEMINAR', 'CONFERENCE', 'OTHER'
];

export default function CreateEvent() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    venue: '',
    capacity: '',
    isOnline: false,
    onlineLink: '',
    ticketType: 'FREE',
    ticketPrice: '0',
    organizerEmail: '',
    organizerPhone: '',
    bannerImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          bannerImage: 'Image size should be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        bannerImage: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear error
      setErrors(prev => ({
        ...prev,
        bannerImage: ''
      }));
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Event title is required';
    if (!formData.description.trim()) newErrors.description = 'Event description is required';
    if (!formData.category) newErrors.category = 'Event category is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.registrationDeadline) newErrors.registrationDeadline = 'Registration deadline is required';
    if (!formData.venue.trim() && !formData.isOnline) newErrors.venue = 'Venue is required for offline events';
    if (formData.isOnline && !formData.onlineLink.trim()) newErrors.onlineLink = 'Online link is required for online events';
    if (!formData.capacity || parseInt(formData.capacity) <= 0) newErrors.capacity = 'Valid capacity is required';
    if (!formData.organizerEmail.trim()) newErrors.organizerEmail = 'Organizer email is required';
    if (!formData.organizerPhone.trim()) newErrors.organizerPhone = 'Organizer phone is required';

    // Date validations
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const regDeadline = new Date(formData.registrationDeadline);
    const now = new Date();

    if (startDate <= now) newErrors.startDate = 'Start date must be in the future';
    if (endDate <= startDate) newErrors.endDate = 'End date must be after start date';
    if (regDeadline >= startDate) newErrors.registrationDeadline = 'Registration deadline must be before event start';

    // Price validation for paid events
    if (formData.ticketType === 'PAID') {
      const price = parseFloat(formData.ticketPrice);
      if (!price || price <= 0) newErrors.ticketPrice = 'Valid ticket price is required for paid events';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'bannerImage' && value) {
          submitData.append(key, value);
        } else if (key !== 'bannerImage') {
          submitData.append(key, String(value));
        }
      });

      const response = await fetch('/api/events', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const result = await response.json();
      
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/organizer-dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error creating event:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to create event. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      category: '',
      startDate: '',
      endDate: '',
      registrationDeadline: '',
      venue: '',
      capacity: '',
      isOnline: false,
      onlineLink: '',
      ticketType: 'FREE',
      ticketPrice: '0',
      organizerEmail: '',
      organizerPhone: '',
      bannerImage: null,
    });
    setImagePreview(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-indigo-900/40"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create New Event
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Bring your vision to life. Create memorable experiences with Eventra.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      📅
                    </span>
                    Basic Information
                  </h2>

                  {/* Event Title */}
                  <div>
                    <label className="block text-white/90 font-medium mb-2">Event Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter your event title"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-white/90 font-medium mb-2">Short Description</label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      placeholder="Brief tagline for your event"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Event Description */}
                  <div>
                    <label className="block text-white/90 font-medium mb-2">Event Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your event in detail..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    />
                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-white/90 font-medium mb-2">Event Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="" className="bg-gray-800">Select a category</option>
                      {EVENT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat} className="bg-gray-800">
                          {cat.charAt(0) + cat.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      ⏰
                    </span>
                    Date & Time
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Start Date & Time *</label>
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {errors.startDate && <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>}
                    </div>

                    {/* End Date */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">End Date & Time *</label>
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {errors.endDate && <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>}
                    </div>
                  </div>

                  {/* Registration Deadline */}
                  <div>
                    <label className="block text-white/90 font-medium mb-2">Registration Deadline *</label>
                    <input
                      type="datetime-local"
                      name="registrationDeadline"
                      value={formData.registrationDeadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {errors.registrationDeadline && <p className="text-red-400 text-sm mt-1">{errors.registrationDeadline}</p>}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                      📍
                    </span>
                    Location
                  </h2>

                  {/* Online Event Toggle */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isOnline"
                      name="isOnline"
                      checked={formData.isOnline}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 bg-white/10 border border-white/30 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="isOnline" className="text-white/90 font-medium">This is an online event</label>
                  </div>

                  {/* Venue or Online Link */}
                  {formData.isOnline ? (
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Online Meeting Link *</label>
                      <input
                        type="url"
                        name="onlineLink"
                        value={formData.onlineLink}
                        onChange={handleInputChange}
                        placeholder="https://meet.google.com/..."
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {errors.onlineLink && <p className="text-red-400 text-sm mt-1">{errors.onlineLink}</p>}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Venue / Location *</label>
                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                        placeholder="Enter venue address or location"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {errors.venue && <p className="text-red-400 text-sm mt-1">{errors.venue}</p>}
                    </div>
                  )}

                  {/* Capacity */}
                  <div>
                    <label className="block text-white/90 font-medium mb-2">Maximum Participants *</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      placeholder="Enter maximum number of participants"
                      min="1"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {errors.capacity && <p className="text-red-400 text-sm mt-1">{errors.capacity}</p>}
                  </div>
                </div>

                {/* Ticketing */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                      🎫
                    </span>
                    Ticketing
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Ticket Type */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Ticket Type</label>
                      <select
                        name="ticketType"
                        value={formData.ticketType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="FREE" className="bg-gray-800">Free</option>
                        <option value="PAID" className="bg-gray-800">Paid</option>
                      </select>
                    </div>

                    {/* Ticket Price */}
                    {formData.ticketType === 'PAID' && (
                      <div>
                        <label className="block text-white/90 font-medium mb-2">Ticket Price (₹) *</label>
                        <input
                          type="number"
                          name="ticketPrice"
                          value={formData.ticketPrice}
                          onChange={handleInputChange}
                          placeholder="Enter ticket price"
                          min="0"
                          step="0.01"
                          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                        {errors.ticketPrice && <p className="text-red-400 text-sm mt-1">{errors.ticketPrice}</p>}
                      </div>
                    )}
                  </div>
                </div>

                {/* Organizer Contact */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-3">
                      👤
                    </span>
                    Organizer Contact
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="organizerEmail"
                        value={formData.organizerEmail}
                        onChange={handleInputChange}
                        placeholder="organizer@example.com"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {errors.organizerEmail && <p className="text-red-400 text-sm mt-1">{errors.organizerEmail}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-white/90 font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="organizerPhone"
                        value={formData.organizerPhone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                      {errors.organizerPhone && <p className="text-red-400 text-sm mt-1">{errors.organizerPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Event Poster */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      🖼️
                    </span>
                    Event Poster
                  </h2>

                  <div>
                    <label className="block text-white/90 font-medium mb-2">Upload Poster Image</label>
                    <div 
                      className="w-full px-4 py-8 bg-white/10 border-2 border-dashed border-white/30 rounded-lg text-center backdrop-blur-sm hover:border-purple-500 transition-all cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {imagePreview ? (
                        <div className="space-y-4">
                          <div className="relative w-48 h-32 mx-auto rounded-lg overflow-hidden">
                            <Image
                              src={imagePreview}
                              alt="Event poster preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-white/70">Click to change image</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mx-auto">
                            📷
                          </div>
                          <div>
                            <p className="text-white/90">Click to upload event poster</p>
                            <p className="text-white/50 text-sm">PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {errors.bannerImage && <p className="text-red-400 text-sm mt-1">{errors.bannerImage}</p>}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-medium backdrop-blur-sm hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset Form
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                      isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/25'
                    } text-white`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Event...
                      </span>
                    ) : (
                      'Create Event'
                    )}
                  </motion.button>
                </div>

                {errors.submit && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                    {errors.submit}
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Live Preview Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl sticky top-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2 text-sm">
                  👀
                </span>
                Live Preview
              </h3>
              
              <div className="space-y-4">
                {/* Preview Image */}
                <div className="aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Event preview"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                          🖼️
                        </div>
                        <p className="text-sm">Event Poster</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Preview Details */}
                <div className="space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {formData.title || 'Event Title'}
                    </h4>
                    {formData.shortDescription && (
                      <p className="text-white/70 text-sm">{formData.shortDescription}</p>
                    )}
                  </div>

                  {formData.category && (
                    <div className="inline-flex items-center px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
                      <span className="text-purple-200 text-xs font-medium">
                        {formData.category.charAt(0) + formData.category.slice(1).toLowerCase()}
                      </span>
                    </div>
                  )}

                  {formData.startDate && (
                    <div className="text-white/80 text-sm">
                      📅 {new Date(formData.startDate).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}

                  {(formData.venue || formData.onlineLink) && (
                    <div className="text-white/80 text-sm">
                      📍 {formData.isOnline ? 'Online Event' : formData.venue}
                    </div>
                  )}

                  {formData.capacity && (
                    <div className="text-white/80 text-sm">
                      👥 Max {formData.capacity} participants
                    </div>
                  )}

                  <div className="text-white/80 text-sm">
                    🎫 {formData.ticketType === 'FREE' ? 'Free' : `₹${formData.ticketPrice}`}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Event Created Successfully!</h3>
            <p className="text-white/70 mb-4">
              Your event has been created and will be reviewed by our team.
            </p>
            <p className="text-white/50 text-sm">Redirecting to dashboard...</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
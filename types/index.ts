// Global type declarations for Eventra

// Custom types for Eventra
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ATTENDEE' | 'ORGANIZER' | 'VOLUNTEER' | 'SPONSOR' | 'ADMIN';
  collegeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  capacity: number;
  organizerId: string;
  categoryId: string;
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  eventId: string;
  venueId: string;
  speakerId?: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ticket {
  id: string;
  userId: string;
  eventId: string;
  sessionId?: string;
  qrCode: string;
  status: 'ACTIVE' | 'USED' | 'CANCELLED';
  purchaseDate: Date;
  checkInDate?: Date;
}

export interface QRCodeData {
  ticketId: string;
  userId: string;
  eventId: string;
  sessionId?: string;
  timestamp: string;
}
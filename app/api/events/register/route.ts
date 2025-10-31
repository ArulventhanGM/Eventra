import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('🎫 Registration API called');
  
  try {
    const body = await request.json();
    console.log('📝 Registration data received:', body);
    
    const {
      eventId,
      fullName,
      email,
      college,
      department,
      teamName,
      numberOfMembers,
      phoneNumber,
      additionalInfo
    } = body;

    // Validation
    if (!eventId || !fullName || !email || !college || !department || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if user is already registered for this event
    console.log('🔍 Checking for existing registration...');
    console.log('🔍 Looking for eventId:', eventId, 'email:', email);
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId: eventId,
        email: email
      }
    });
    console.log('📋 Existing registration:', existingRegistration ? 'Found' : 'None');
    if (existingRegistration) {
      console.log('📋 Existing registration details:', {
        id: existingRegistration.id,
        registeredAt: existingRegistration.registeredAt,
        status: existingRegistration.status
      });
    }

    if (existingRegistration) {
      return NextResponse.json(
        { 
          success: false, 
          error: `You are already registered for this event. Registration ID: ${existingRegistration.id}`,
          existingRegistrationId: existingRegistration.id,
          registeredAt: existingRegistration.registeredAt
        },
        { status: 409 }
      );
    }

    // Get event details to check capacity
    console.log('🎪 Fetching event details for:', eventId);
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    });
    console.log('🎯 Event found:', event ? event.title : 'Not found');

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if event has capacity
    if (event.capacity && event._count.registrations >= event.capacity) {
      return NextResponse.json(
        { success: false, error: 'Event is full. Registration closed.' },
        { status: 409 }
      );
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return NextResponse.json(
        { success: false, error: 'Registration deadline has passed' },
        { status: 409 }
      );
    }

    // Create registration
    console.log('✍️ Creating registration...');
    const registration = await prisma.registration.create({
      data: {
        eventId,
        fullName,
        email,
        college,
        department,
        teamName: teamName || null,
        numberOfMembers: numberOfMembers ? parseInt(numberOfMembers.toString()) : 1,
        phoneNumber,
        additionalInfo: additionalInfo || null,
        status: 'CONFIRMED'
      }
    });
    console.log('✅ Registration created with ID:', registration.id);

    // Generate registration ID
    const registrationId = `REG${event.id}_${registration.id}`;

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      registrationId,
      registration: {
        id: registration.id,
        eventId: registration.eventId,
        registeredAt: registration.registeredAt
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: errorMessage,
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { success: false, error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
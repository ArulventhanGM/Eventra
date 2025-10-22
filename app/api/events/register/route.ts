import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId: eventId,
        email: email
      }
    });

    if (existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'You are already registered for this event' },
        { status: 409 }
      );
    }

    // Get event details to check capacity
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    });

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
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
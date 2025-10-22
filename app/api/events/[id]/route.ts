import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }

    // Fetch event details from database
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }

    // Format the event data
    const formattedEvent = {
      id: event.id,
      name: event.title,
      tagline: event.shortDescription || 'Join us for an amazing event!',
      description: event.description,
      date: event.startDate.toISOString().split('T')[0],
      endDate: event.endDate.toISOString().split('T')[0],
      time: event.startDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      venue: event.venue,
      organizer: `${event.organizer.firstName} ${event.organizer.lastName}`,
      category: event.category,
      fee: event.ticketType === 'FREE' ? 'Free' : `$${event.ticketPrice}`,
      capacity: event.capacity,
      registeredCount: event._count.registrations,
      availableSpots: event.capacity ? event.capacity - event._count.registrations : null,
      registrationDeadline: event.registrationDeadline?.toISOString(),
      status: event.status,
      isOnline: event.isOnline,
      onlineLink: event.onlineLink,
      bannerImage: event.bannerImage,
      tags: event.tags ? JSON.parse(event.tags) : []
    };

    return NextResponse.json({
      success: true,
      event: formattedEvent
    });

  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
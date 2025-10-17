import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build where clause for filtering
    const where: any = {
      status: 'PUBLISHED', // Only show published events
    };

    if (category && category !== 'All') {
      where.category = category.toUpperCase();
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { venue: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (startDate) {
      where.startDate = {
        gte: new Date(startDate),
      };
    }

    if (endDate) {
      where.endDate = {
        lte: new Date(endDate),
      };
    }

    // Fetch events with organizer and session information
    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        sessions: {
          orderBy: {
            startTime: 'asc',
          },
        },
        _count: {
          select: {
            registrations: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    // Transform the data to match the frontend format
    const transformedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      shortDescription: event.shortDescription,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      endTime: event.endDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      venue: event.venue,
      category: event.category,
      organizer: `${event.organizer.firstName} ${event.organizer.lastName}`,
      organizerEmail: event.organizer.email,
      capacity: event.capacity,
      currentRegistrations: event._count.registrations,
      registrationRequired: event.ticketType === 'PAID' || event.registrationDeadline !== null,
      ticketPrice: event.ticketPrice || 0,
      bannerImage: event.bannerImage,
      isOnline: event.isOnline,
      onlineLink: event.onlineLink,
      sessions: event.sessions,
      status: event.status,
    }));

    return NextResponse.json({
      success: true,
      data: transformedEvents,
      count: transformedEvents.length,
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
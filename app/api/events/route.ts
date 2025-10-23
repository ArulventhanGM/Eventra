import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('API /events called');
    
    // Test database connection first
    try {
      await prisma.$connect();
      console.log('Database connected successfully');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database connection failed',
          message: 'Unable to connect to the database. Please try again later.'
        },
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
    }

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

    console.log('Fetching events with filters:', { category, search, startDate, endDate });

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

    console.log(`Successfully fetched ${events.length} events`);

    // Transform the data to match the frontend format
    const transformedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      shortDescription: event.shortDescription,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString(),
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

    const response = {
      success: true,
      data: transformedEvents,
      count: transformedEvents.length,
      timestamp: new Date().toISOString(),
    };

    console.log('Returning response with', transformedEvents.length, 'events');

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Error fetching events:', error);
    
    const errorResponse = {
      success: false,
      error: 'Failed to fetch events',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(errorResponse, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    // Ensure database connection is closed
    await prisma.$disconnect();
  }
}
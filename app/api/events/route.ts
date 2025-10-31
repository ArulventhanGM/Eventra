import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    console.log('API /events called');
    
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
      distinct: ['id'], // Ensure unique events by ID at database level
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

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/events called');
    
    const formData = await request.formData();
    
    // Extract form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const category = formData.get('category') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const registrationDeadline = formData.get('registrationDeadline') as string;
    const venue = formData.get('venue') as string;
    const capacity = formData.get('capacity') as string;
    const isOnline = formData.get('isOnline') === 'true';
    const onlineLink = formData.get('onlineLink') as string;
    const ticketType = formData.get('ticketType') as string;
    const ticketPrice = formData.get('ticketPrice') as string;
    const organizerEmail = formData.get('organizerEmail') as string;
    const organizerPhone = formData.get('organizerPhone') as string;
    const bannerImage = formData.get('bannerImage') as File;
    
    // Basic validation
    if (!title || !description || !category || !startDate || !endDate || !registrationDeadline) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!capacity || parseInt(capacity) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid capacity is required' },
        { status: 400 }
      );
    }

    // Date validation
    const start = new Date(startDate);
    const end = new Date(endDate);
    const regDeadline = new Date(registrationDeadline);
    const now = new Date();

    if (start <= now) {
      return NextResponse.json(
        { success: false, error: 'Start date must be in the future' },
        { status: 400 }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        { success: false, error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    if (regDeadline >= start) {
      return NextResponse.json(
        { success: false, error: 'Registration deadline must be before event start' },
        { status: 400 }
      );
    }

    // For now, we'll create a default organizer or you could get from session
    // In a real app, you'd get the organizer ID from the authenticated session
    let organizerId = 'default-organizer-id';
    
    // Try to find an existing organizer or create one
    let organizer = await prisma.user.findFirst({
      where: { email: organizerEmail }
    });

    if (!organizer) {
      // Create a new organizer user
      organizer = await prisma.user.create({
        data: {
          email: organizerEmail,
          firstName: 'Event',
          lastName: 'Organizer',
          password: 'temp-password', // In real app, this should be hashed
          phone: organizerPhone,
          role: 'ORGANIZER',
        }
      });
    }

    organizerId = organizer.id;

    // Handle image upload (simplified - in production, save to cloud storage)
    let bannerImageUrl = null;
    if (bannerImage && bannerImage.size > 0) {
      // For now, just use a placeholder URL
      // In production, upload to S3/Cloudinary and get URL
      bannerImageUrl = '/images/events/default-banner.jpg';
    }

    // Create the event
    const newEvent = await prisma.event.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        shortDescription: shortDescription?.trim() || '',
        category: category.toUpperCase(),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        registrationDeadline: new Date(registrationDeadline),
        venue: isOnline ? 'Online Event' : venue.trim(),
        capacity: parseInt(capacity),
        isOnline,
        onlineLink: isOnline ? onlineLink?.trim() || '' : null,
        ticketType: ticketType.toUpperCase(),
        ticketPrice: ticketType === 'PAID' ? parseFloat(ticketPrice) || 0 : 0,
        bannerImage: bannerImageUrl,
        organizerId,
        status: 'PUBLISHED', // Auto-publish for now, or use 'DRAFT'
      },
      include: {
        organizer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          }
        }
      }
    });

    console.log('Event created successfully:', newEvent.id);

    return NextResponse.json({
      success: true,
      data: {
        id: newEvent.id,
        title: newEvent.title,
        message: 'Event created successfully!',
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    
    // Handle Prisma validation errors
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: `Failed to create event: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create event. Please try again.' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const email = searchParams.get('email');

    if (!eventId || !email) {
      return NextResponse.json(
        { success: false, error: 'EventId and email are required' },
        { status: 400 }
      );
    }

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId: eventId,
        email: email
      },
      select: {
        id: true,
        registeredAt: true,
        status: true,
        fullName: true
      }
    });

    return NextResponse.json({
      success: true,
      isRegistered: !!existingRegistration,
      registration: existingRegistration
    });

  } catch (error) {
    console.error('❌ Check registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found' 
      }, { status: 404 });
    }

    // Start a transaction to delete all user-related data
    await prisma.$transaction(async (tx) => {
      // Delete user's event registrations first (if any)
      // Note: You might need to add this table when you implement event registration
      // await tx.eventRegistration.deleteMany({
      //   where: { userId: user.id }
      // });

      // Delete user's created events (if organizer)
      await tx.event.deleteMany({
        where: { organizerId: user.id }
      });

      // Finally, delete the user account
      await tx.user.delete({
        where: { id: user.id }
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
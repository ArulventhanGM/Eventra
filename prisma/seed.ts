import { PrismaClient, EventCategory, TicketType, EventStatus, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create a sample organizer user
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@eventra.com' },
    update: {},
    create: {
      email: 'organizer@eventra.com',
      password: 'hashed_password_here', // In real app, this should be properly hashed
      firstName: 'Event',
      lastName: 'Organizer',
      phone: '+1234567890',
      college: 'Eventra University',
      department: 'Computer Science',
      role: UserRole.ORGANIZER,
    },
  });

  console.log('✅ Created organizer user');

  // Create sample events
  const events = [
    {
      title: 'AI & Machine Learning Workshop',
      description: 'Learn the fundamentals of AI and ML with hands-on coding sessions. This comprehensive workshop covers neural networks, deep learning, and practical applications in real-world scenarios.',
      shortDescription: 'Hands-on AI/ML workshop with practical coding sessions',
      category: EventCategory.TECH,
      startDate: new Date('2025-10-25T09:00:00'),
      endDate: new Date('2025-10-25T11:00:00'),
      venue: 'Computer Lab A',
      capacity: 50,
      ticketType: TicketType.FREE,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
    },
    {
      title: 'Cultural Dance Performance',
      description: 'Traditional and contemporary dance performances by student groups showcasing diverse cultural heritage and artistic expressions.',
      shortDescription: 'Diverse cultural dance performances',
      category: EventCategory.CULTURAL,
      startDate: new Date('2025-10-25T10:30:00'),
      endDate: new Date('2025-10-25T11:30:00'),
      venue: 'Main Auditorium',
      capacity: 500,
      ticketType: TicketType.FREE,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
    },
    {
      title: 'Startup Pitch Competition',
      description: 'Students present their innovative startup ideas to industry experts and investors. Win prizes and get mentorship opportunities.',
      shortDescription: 'Student startup pitch competition',
      category: EventCategory.TECH,
      startDate: new Date('2025-10-25T11:00:00'),
      endDate: new Date('2025-10-25T13:00:00'),
      venue: 'Seminar Hall',
      capacity: 30,
      ticketType: TicketType.FREE,
      registrationDeadline: new Date('2025-10-24T23:59:59'),
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
    },
    {
      title: 'Photography Workshop',
      description: 'Professional photography techniques and portfolio building session. Learn composition, lighting, and post-processing techniques.',
      shortDescription: 'Professional photography techniques workshop',
      category: EventCategory.WORKSHOP,
      startDate: new Date('2025-10-25T14:00:00'),
      endDate: new Date('2025-10-25T16:00:00'),
      venue: 'Art Studio',
      capacity: 25,
      ticketType: TicketType.FREE,
      registrationDeadline: new Date('2025-10-24T23:59:59'),
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
    },
    {
      title: 'Basketball Tournament Finals',
      description: 'Final match of the inter-department basketball tournament. Cheer for your department and witness an exciting finale.',
      shortDescription: 'Inter-department basketball finals',
      category: EventCategory.SPORTS,
      startDate: new Date('2025-10-25T15:00:00'),
      endDate: new Date('2025-10-25T17:00:00'),
      venue: 'Sports Complex',
      capacity: 200,
      ticketType: TicketType.FREE,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
    },
    {
      title: 'Music Concert',
      description: 'Live music performances by student bands and guest artists. Experience diverse musical genres and celebrate creativity.',
      shortDescription: 'Live music concert with bands',
      category: EventCategory.CULTURAL,
      startDate: new Date('2025-10-25T18:00:00'),
      endDate: new Date('2025-10-25T21:00:00'),
      venue: 'Open Ground',
      capacity: 1000,
      ticketType: TicketType.FREE,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
    },
  ];

  for (const eventData of events) {
    const event = await prisma.event.create({
      data: eventData,
    });
    
    console.log(`✅ Created event: ${event.title}`);

    // Create some sample registrations
    const registrationCount = Math.floor(Math.random() * (eventData.capacity * 0.8));
    for (let i = 0; i < registrationCount; i++) {
      try {
        await prisma.registration.create({
          data: {
            userId: organizer.id, // Using organizer as sample user
            eventId: event.id,
            status: 'CONFIRMED',
            registeredAt: new Date(),
          },
        });
      } catch (error) {
        // Registration might already exist, skip
      }
    }
  }

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
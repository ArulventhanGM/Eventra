import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create a sample organizer user
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@eventra.com' },
    update: {},
    create: {
      email: 'organizer@eventra.com',
      password: hashedPassword,
      firstName: 'Event',
      lastName: 'Organizer',
      phone: '+1234567890',
      college: 'Eventra University',
      department: 'Computer Science',
      role: 'ORGANIZER',
    },
  });

  console.log('✅ Created organizer user');

  // Create a sample attendee user
  const attendee = await prisma.user.upsert({
    where: { email: 'attendee@eventra.com' },
    update: {},
    create: {
      email: 'attendee@eventra.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567891',
      college: 'Eventra University',
      department: 'Business Administration',
      role: 'ATTENDEE',
    },
  });

  console.log('✅ Created attendee user');

  // Create sample events
  const events = [
    {
      title: 'AI & Machine Learning Workshop',
      description: 'Learn the fundamentals of AI and ML with hands-on coding sessions. This comprehensive workshop covers neural networks, deep learning, and practical applications in real-world scenarios.',
      shortDescription: 'Hands-on AI/ML workshop with practical coding sessions',
      category: 'TECH',
      startDate: new Date('2025-10-25T09:00:00'),
      endDate: new Date('2025-10-25T11:00:00'),
      venue: 'Computer Lab A',
      capacity: 50,
      ticketType: 'FREE',
      status: 'PUBLISHED',
      organizerId: organizer.id,
    },
    {
      title: 'Cultural Dance Performance',
      description: 'Traditional and contemporary dance performances by student groups showcasing diverse cultural heritage and artistic expressions.',
      shortDescription: 'Diverse cultural dance performances',
      category: 'CULTURAL',
      startDate: new Date('2025-10-25T10:30:00'),
      endDate: new Date('2025-10-25T11:30:00'),
      venue: 'Main Auditorium',
      capacity: 500,
      ticketType: 'FREE',
      status: 'PUBLISHED',
      organizerId: organizer.id,
    },
    {
      title: 'Startup Pitch Competition',
      description: 'Students present their innovative startup ideas to industry experts and investors. Win prizes and get mentorship opportunities.',
      shortDescription: 'Student startup pitch competition',
      category: 'TECH',
      startDate: new Date('2025-10-25T11:00:00'),
      endDate: new Date('2025-10-25T13:00:00'),
      venue: 'Seminar Hall',
      capacity: 30,
      ticketType: 'FREE',
      registrationDeadline: new Date('2025-10-24T23:59:59'),
      status: 'PUBLISHED',
      organizerId: organizer.id,
    },
    {
      title: 'Photography Workshop',
      description: 'Professional photography techniques and portfolio building session. Learn composition, lighting, and post-processing techniques.',
      shortDescription: 'Professional photography techniques workshop',
      category: 'WORKSHOP',
      startDate: new Date('2025-10-25T14:00:00'),
      endDate: new Date('2025-10-25T16:00:00'),
      venue: 'Art Studio',
      capacity: 25,
      ticketType: 'FREE',
      registrationDeadline: new Date('2025-10-24T23:59:59'),
      status: 'PUBLISHED',
      organizerId: organizer.id,
    },
    {
      title: 'Basketball Tournament Finals',
      description: 'Final match of the inter-department basketball tournament. Cheer for your department and witness an exciting finale.',
      shortDescription: 'Inter-department basketball finals',
      category: 'SPORTS',
      startDate: new Date('2025-10-25T15:00:00'),
      endDate: new Date('2025-10-25T17:00:00'),
      venue: 'Sports Complex',
      capacity: 200,
      ticketType: 'FREE',
      status: 'PUBLISHED',
      organizerId: organizer.id,
    },
    {
      title: 'Music Concert',
      description: 'Live music performances by student bands and guest artists. Experience diverse musical genres and celebrate creativity.',
      shortDescription: 'Live music concert with bands',
      category: 'CULTURAL',
      startDate: new Date('2025-10-25T18:00:00'),
      endDate: new Date('2025-10-25T21:00:00'),
      venue: 'Open Ground',
      capacity: 1000,
      ticketType: 'FREE',
      status: 'PUBLISHED',
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
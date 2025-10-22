import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password for test users
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create test organizer user
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@college.edu' },
    update: {},
    create: {
      email: 'organizer@college.edu',
      password: hashedPassword,
      firstName: 'Event',
      lastName: 'Organizer',
      phone: '+1234567890',
      college: 'Tech College',
      department: 'Computer Science',
      role: 'ORGANIZER',
    },
  });

  // Create test attendee user for profile testing
  const testUser = await prisma.user.upsert({
    where: { email: 'test@college.edu' },
    update: {},
    create: {
      email: 'test@college.edu',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567891',
      college: 'Tech College',
      department: 'Computer Science',
      role: 'ATTENDEE',
    },
  });

  console.log('✅ Created test users');

  // Create sample events
  const techEvent = await prisma.event.create({
    data: {
      title: 'Tech Innovation Summit 2025',
      description: 'Join us for the biggest tech event of the year! Experience cutting-edge technologies, network with industry leaders, and participate in hands-on workshops.',
      shortDescription: 'The biggest tech event of the year',
      category: 'TECH',
      status: 'PUBLISHED',
      startDate: new Date('2025-12-15T09:00:00Z'),
      endDate: new Date('2025-12-17T18:00:00Z'),
      registrationDeadline: new Date('2025-12-10T23:59:59Z'),
      venue: 'Tech Campus Auditorium',
      capacity: 500,
      isOnline: false,
      ticketType: 'FREE',
      ticketPrice: 0,
      tags: '["technology", "innovation", "AI"]',
      organizerId: organizer.id
    }
  });

  const culturalEvent = await prisma.event.create({
    data: {
      title: 'Cultural Fusion Festival',
      description: 'Celebrate diversity and cultural heritage at our annual Cultural Fusion Festival!',
      shortDescription: 'Annual cultural diversity festival',
      category: 'CULTURAL',
      status: 'PUBLISHED', 
      startDate: new Date('2025-11-30T10:00:00Z'),
      endDate: new Date('2025-11-30T18:00:00Z'),
      registrationDeadline: new Date('2025-11-25T23:59:59Z'),
      venue: 'Open Grounds',
      capacity: 1000,
      isOnline: false,
      ticketType: 'FREE',
      ticketPrice: 0,
      tags: '["culture", "music", "dance"]',
      organizerId: organizer.id
    }
  });

  const sportsEvent = await prisma.event.create({
    data: {
      title: 'Annual Sports Meet 2025',
      description: 'Inter-departmental sports competition with multiple events and activities.',
      shortDescription: 'Annual inter-department sports competition',
      category: 'SPORTS',
      status: 'PUBLISHED',
      startDate: new Date('2025-11-20T08:00:00Z'),
      endDate: new Date('2025-11-22T18:00:00Z'),
      registrationDeadline: new Date('2025-11-15T23:59:59Z'),
      venue: 'Sports Complex',
      capacity: 300,
      isOnline: false,
      ticketType: 'FREE',
      ticketPrice: 0,
      tags: '["sports", "competition", "athletics"]',
      organizerId: organizer.id
    }
  });

  console.log('✅ Created sample events');
  console.log('\n🎉 Database seeded successfully!');
  console.log('\nTest accounts:');
  console.log('📧 Email: test@college.edu');
  console.log('🔐 Password: password123');
  console.log('📧 Email: organizer@college.edu');
  console.log('🔐 Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
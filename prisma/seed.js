const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  
  // Create a sample organizer user
  const hashedPassword = await bcrypt.hash('password123', 12);
  const organizer = await prisma.user.create({
    data: {
      email: 'organizer@college.edu',
      password: hashedPassword,
      firstName: 'Event',
      lastName: 'Organizer',
      phone: '+1234567890',
      college: 'Tech College',
      department: 'Computer Science',
      role: 'ORGANIZER'
    }
  });

  // Create a test attendee user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@college.edu',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567891',
      college: 'Tech College',
      department: 'Computer Science',
      role: 'ATTENDEE'
    }
  });

  // Create sample events
  const techEvent = await prisma.event.create({
    data: {
      title: 'Tech Innovation Summit 2025',
      description: 'Join us for the biggest tech event of the year! Experience cutting-edge technologies, network with industry leaders, and participate in hands-on workshops. This 3-day summit will feature keynote speakers from major tech companies, startup showcases, and interactive demonstrations of emerging technologies like AI, blockchain, and quantum computing.',
      shortDescription: 'The biggest tech event of the year with industry leaders and cutting-edge technologies',
      category: 'TECH',
      status: 'PUBLISHED',
      startDate: new Date('2025-12-15T09:00:00Z'),
      endDate: new Date('2025-12-17T18:00:00Z'),
      registrationDeadline: new Date('2025-12-10T23:59:59Z'),
      venue: 'Tech Campus Auditorium, Building A',
      capacity: 500,
      isOnline: false,
      ticketType: 'FREE',
      ticketPrice: 0,
      tags: '["technology", "innovation", "AI", "blockchain", "networking"]',
      organizerId: organizer.id
    }
  });

  const culturalEvent = await prisma.event.create({
    data: {
      title: 'Cultural Fusion Festival',
      description: 'Celebrate diversity and cultural heritage at our annual Cultural Fusion Festival! Experience traditional music, dance performances, authentic cuisine, and art exhibitions from around the world. Join us for a day of cultural exchange, interactive workshops, and community building.',
      shortDescription: 'Annual festival celebrating cultural diversity with music, dance, and cuisine',
      category: 'CULTURAL',
      status: 'PUBLISHED', 
      startDate: new Date('2025-11-30T10:00:00Z'),
      endDate: new Date('2025-11-30T20:00:00Z'),
      registrationDeadline: new Date('2025-11-28T23:59:59Z'),
      venue: 'Main Campus Quad',
      capacity: 1000,
      isOnline: false,
      ticketType: 'FREE',
      ticketPrice: 0,
      tags: '["culture", "diversity", "music", "dance", "food", "community"]',
      organizerId: organizer.id
    }
  });

  const sportsEvent = await prisma.event.create({
    data: {
      title: 'Inter-College Cricket Championship',
      description: 'Get ready for the most exciting cricket tournament of the year! Teams from various colleges will compete for the championship trophy. Join us for thrilling matches, team spirit, and sportsmanship. Whether you\'re playing or cheering, this event promises action-packed entertainment.',
      shortDescription: 'Inter-college cricket tournament with teams competing for the championship',
      category: 'SPORTS',
      status: 'PUBLISHED',
      startDate: new Date('2025-12-01T08:00:00Z'),
      endDate: new Date('2025-12-05T18:00:00Z'),
      registrationDeadline: new Date('2025-11-25T23:59:59Z'),
      venue: 'College Sports Complex',
      capacity: 200,
      isOnline: false,
      ticketType: 'PAID',
      ticketPrice: 50,
      tags: '["sports", "cricket", "tournament", "competition", "teams"]',
      organizerId: organizer.id
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`Created organizer: ${organizer.firstName} ${organizer.lastName}`);
  console.log(`Created events:`);
  console.log(`- ${techEvent.title} (ID: ${techEvent.id})`);
  console.log(`- ${culturalEvent.title} (ID: ${culturalEvent.id})`);
  console.log(`- ${sportsEvent.title} (ID: ${sportsEvent.id})`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { prisma } from './lib/prisma.js';

async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test 1: Check if we can connect to the database
    const eventCount = await prisma.event.count();
    console.log(`✅ Database connected! Found ${eventCount} events.`);
    
    // Test 2: Get all events
    const events = await prisma.event.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        capacity: true,
        _count: {
          select: { registrations: true }
        }
      }
    });
    
    console.log('\n📅 Available Events:');
    events.forEach(event => {
      console.log(`- ${event.title} (ID: ${event.id})`);
      console.log(`  Status: ${event.status}, Capacity: ${event.capacity}, Registered: ${event._count.registrations}`);
    });
    
    // Test 3: Try to create a test registration
    const testEventId = events[0]?.id;
    if (testEventId) {
      console.log(`\n🧪 Testing registration for event: ${testEventId}`);
      
      const testRegistration = await prisma.registration.create({
        data: {
          eventId: testEventId,
          fullName: 'Test User',
          email: 'test@example.com',
          college: 'Test College',
          department: 'Computer Science',
          phoneNumber: '1234567890',
          numberOfMembers: 1,
          status: 'CONFIRMED'
        }
      });
      
      console.log('✅ Test registration created successfully!');
      console.log(`Registration ID: ${testRegistration.id}`);
      
      // Clean up test registration
      await prisma.registration.delete({
        where: { id: testRegistration.id }
      });
      console.log('🧹 Test registration cleaned up.');
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();
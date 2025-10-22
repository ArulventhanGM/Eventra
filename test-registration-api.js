/**
 * Test Registration API Endpoint
 * This script tests the /api/events/register endpoint with sample data
 */

async function testRegistrationAPI() {
  const baseUrl = 'http://localhost:3000';
  const eventId = 'cmh0qil6z0002ji8mcdm9cebk'; // Tech Innovation Summit
  
  const testRegistrationData = {
    eventId: eventId,
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    college: 'Tech University',
    department: 'Computer Science',
    phoneNumber: '+1234567890',
    numberOfMembers: 1,
    additionalInfo: 'Looking forward to the AI workshops!'
  };

  try {
    console.log('🧪 Testing Registration API...');
    console.log('📝 Registration Data:', testRegistrationData);

    const response = await fetch(`${baseUrl}/api/events/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRegistrationData)
    });

    const result = await response.json();
    
    console.log('📊 API Response Status:', response.status);
    console.log('📋 API Response:', result);

    if (response.ok) {
      console.log('✅ Registration successful!');
      console.log('🎫 Registration ID:', result.registrationId);
      return { success: true, data: result };
    } else {
      console.log('❌ Registration failed:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('💥 Network Error:', error.message);
    return { success: false, error: error.message };
  }
}

// Test duplicate registration
async function testDuplicateRegistration() {
  const baseUrl = 'http://localhost:3000';
  const eventId = 'cmh0qil6z0002ji8mcdm9cebk';
  
  const duplicateData = {
    eventId: eventId,
    fullName: 'John Doe',
    email: 'john.doe@example.com', // Same email as previous test
    college: 'Another College',
    department: 'Engineering',
    phoneNumber: '+0987654321',
    numberOfMembers: 1
  };

  try {
    console.log('\n🔄 Testing Duplicate Registration Prevention...');
    
    const response = await fetch(`${baseUrl}/api/events/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(duplicateData)
    });

    const result = await response.json();
    
    console.log('📊 Duplicate Test Status:', response.status);
    console.log('📋 Duplicate Test Response:', result);

    if (response.status === 409) {
      console.log('✅ Duplicate prevention working correctly!');
      return { success: true, prevented: true };
    } else {
      console.log('⚠️ Unexpected response for duplicate registration');
      return { success: false, prevented: false };
    }
  } catch (error) {
    console.error('💥 Network Error in duplicate test:', error.message);
    return { success: false, error: error.message };
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting API Tests for 3D Event Registration System\n');
  
  // Test 1: Normal registration
  const test1 = await testRegistrationAPI();
  
  // Test 2: Duplicate registration
  const test2 = await testDuplicateRegistration();
  
  console.log('\n📊 Test Summary:');
  console.log('Normal Registration:', test1.success ? '✅ PASS' : '❌ FAIL');
  console.log('Duplicate Prevention:', test2.success ? '✅ PASS' : '❌ FAIL');
  
  if (test1.success && test2.success) {
    console.log('\n🎉 All tests passed! The 3D Event Registration System is working perfectly!');
  } else {
    console.log('\n⚠️ Some tests failed. Check the API implementation.');
  }
}

// Execute tests if this file is run directly
if (typeof window === 'undefined') {
  // Node.js environment - fetch is available in Node 18+
  runTests();
} else {
  // Browser environment
  console.log('Run runTests() in the browser console to execute the tests.');
}
'use client';

import { useState } from 'react';

export default function TestRegistrationPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testRegistration = async () => {
    setLoading(true);
    setResult('Testing...');

    try {
      // First, get a real event ID from the database
      const eventsResponse = await fetch('/api/events');
      const eventsData = await eventsResponse.json();
      
      if (!eventsData.success || !eventsData.data || eventsData.data.length === 0) {
        setResult('❌ No events found in database. Please seed the database first.');
        return;
      }
      
      const firstEvent = eventsData.data[0];
      setResult(`Found event: ${firstEvent.title} (ID: ${firstEvent.id})\n\nTesting registration...`);
      
      const testData = {
        eventId: firstEvent.id, // Use real event ID
        fullName: 'Test User',
        email: 'test@example.com',
        college: 'Test College',
        department: 'Computer Science',
        phoneNumber: '1234567890',
        numberOfMembers: 1,
        additionalInfo: 'Test registration from API test page'
      };

      console.log('Sending registration data:', testData);

      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (response.ok) {
        const data = JSON.parse(responseText);
        setResult(`✅ Success: ${JSON.stringify(data, null, 2)}`);
      } else {
        setResult(`❌ Error (${response.status}): ${responseText}`);
      }
    } catch (error) {
      console.error('Registration test error:', error);
      setResult(`❌ Network Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Registration API Test</h1>
        
        <button
          onClick={testRegistration}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold mb-6"
        >
          {loading ? 'Testing...' : 'Test Registration API'}
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Result:</h2>
          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded border overflow-auto max-h-96">
            {result || 'Click the button to test the registration API'}
          </pre>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Check the browser console for detailed logs</strong></p>
        </div>
      </div>
    </div>
  );
}
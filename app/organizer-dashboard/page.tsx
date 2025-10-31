'use client';

import Link from 'next/link';

// Organizer Dashboard - manage events
export default function OrganizerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Organizer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-blue-600">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Active Events</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Registrations</h3>
          <p className="text-3xl font-bold text-purple-600">1,247</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Volunteers</h3>
          <p className="text-3xl font-bold text-orange-600">24</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Events</h2>
            <Link 
              href="/organizer/create-event" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Create Event
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Tech Fest 2025</h3>
                  <p className="text-gray-600">March 15-17, 2025</p>
                  <p className="text-sm text-green-600">1,120 registrations</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Published</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Cultural Night</h3>
                  <p className="text-gray-600">March 20, 2025</p>
                  <p className="text-sm text-blue-600">89 registrations</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Published</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded">
              <h3 className="font-semibold">Manage Volunteers</h3>
              <p className="text-sm text-gray-600">Assign shifts & roles</p>
            </button>
            <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded">
              <h3 className="font-semibold">Send Announcement</h3>
              <p className="text-sm text-gray-600">Notify attendees</p>
            </button>
            <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded">
              <h3 className="font-semibold">View Analytics</h3>
              <p className="text-sm text-gray-600">Event insights</p>
            </button>
            <button className="p-4 text-left bg-orange-50 hover:bg-orange-100 rounded">
              <h3 className="font-semibold">Check-in Tools</h3>
              <p className="text-sm text-gray-600">QR scanner</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
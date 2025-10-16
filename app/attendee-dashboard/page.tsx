// Attendee Dashboard - My Profile
export default function AttendeeDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Registered Events</h3>
          <p className="text-3xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
          <p className="text-3xl font-bold text-green-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Events Attended</h3>
          <p className="text-3xl font-bold text-purple-600">12</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded">
              View My Tickets
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded">
              My Schedule
            </button>
            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded">
              Browse Events
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Announcements</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-gray-600">Tech Fest 2025</p>
              <p className="font-medium">Venue changed to Main Auditorium</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-sm text-gray-600">Cultural Night</p>
              <p className="font-medium">Registration deadline extended</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
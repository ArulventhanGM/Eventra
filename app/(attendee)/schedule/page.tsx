// My Schedule - personalized agenda
export default function MySchedule() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Schedule</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Calendar
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">AI Workshop</h3>
                <p className="text-gray-600">Tech Fest 2025</p>
                <p className="text-sm text-gray-500">Hall A - 10:00 AM - 12:00 PM</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Today</span>
            </div>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Hackathon Finals</h3>
                <p className="text-gray-600">Tech Fest 2025</p>
                <p className="text-sm text-gray-500">Lab 1 - 2:00 PM - 6:00 PM</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Tomorrow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
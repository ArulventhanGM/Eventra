// Manage Sessions - add/edit sessions, speakers
export default function ManageSessions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Sessions</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Session
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Tech Fest 2025 - Sessions</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">AI & Machine Learning Workshop</h3>
                  <p className="text-gray-600 mt-1">Interactive workshop on latest AI trends</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📅 March 15, 2025</span>
                    <span>🕒 10:00 AM - 12:00 PM</span>
                    <span>📍 Hall A</span>
                    <span>👥 50/100 registered</span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Dr. Sarah Johnson</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Web Development Bootcamp</h3>
                  <p className="text-gray-600 mt-1">Full-stack development with React & Node.js</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📅 March 15, 2025</span>
                    <span>🕒 2:00 PM - 5:00 PM</span>
                    <span>📍 Lab 1</span>
                    <span>👥 25/30 registered</span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">John Smith</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Hackathon Finals</h3>
                  <p className="text-gray-600 mt-1">24-hour coding competition</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>📅 March 16, 2025</span>
                    <span>🕒 12:00 PM - 12:00 PM (next day)</span>
                    <span>📍 Main Auditorium</span>
                    <span>👥 80/100 registered</span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">Multiple Judges</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
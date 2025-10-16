// Check-in History - attendance proof
export default function CheckinHistory() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Check-in History</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Attendance Record</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded">
              <div>
                <h3 className="font-semibold">Tech Talk: Future of AI</h3>
                <p className="text-gray-600">March 10, 2025 - 2:00 PM</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded">Attended</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-green-50 rounded">
              <div>
                <h3 className="font-semibold">Web Development Workshop</h3>
                <p className="text-gray-600">March 8, 2025 - 10:00 AM</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded">Attended</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-red-50 rounded">
              <div>
                <h3 className="font-semibold">Database Design Session</h3>
                <p className="text-gray-600">March 5, 2025 - 3:00 PM</p>
              </div>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded">Missed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
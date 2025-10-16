// My Tickets - QR codes, ticket status
export default function MyTickets() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Tech Fest 2025</h3>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Active</span>
          </div>
          <p className="text-gray-600 mb-4">March 15-17, 2025</p>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="text-center font-mono">QR Code Here</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register Now!
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Cultural Night</h3>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Upcoming</span>
          </div>
          <p className="text-gray-600 mb-4">March 20, 2025</p>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="text-center font-mono">QR Code Here</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register Now!
          </button>
        </div>
      </div>
    </div>
  );
}
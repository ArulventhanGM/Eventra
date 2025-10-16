// Feedback Page - post-event surveys
export default function Feedback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Event Feedback</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pending Feedback</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded p-4">
              <h3 className="font-semibold mb-2">Tech Fest 2025</h3>
              <p className="text-gray-600 mb-3">Please share your experience</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Give Feedback
              </button>
            </div>
            
            <div className="border border-gray-200 rounded p-4">
              <h3 className="font-semibold mb-2">AI Workshop</h3>
              <p className="text-gray-600 mb-3">Rate the session content and delivery</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Give Feedback
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Completed Feedback</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Web Dev Workshop</h3>
                  <p className="text-gray-600">Submitted on March 8, 2025</p>
                </div>
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
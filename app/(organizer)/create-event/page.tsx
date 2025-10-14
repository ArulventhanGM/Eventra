// Create Event Wizard
export default function CreateEvent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      
      <div className="bg-white rounded-lg shadow p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Select category</option>
                <option>Technical</option>
                <option>Cultural</option>
                <option>Sports</option>
                <option>Literary</option>
                <option>Workshop</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your event..."
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Capacity</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Maximum attendees"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Event Banner</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-600">Drag & drop image here or click to browse</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
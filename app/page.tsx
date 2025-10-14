import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Eventra</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/events" className="text-gray-700 hover:text-indigo-600">Events</Link>
              <Link href="/schedule" className="text-gray-700 hover:text-indigo-600">Schedule</Link>
              <Link href="/sponsors" className="text-gray-700 hover:text-indigo-600">Sponsors</Link>
              <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            🎉 Welcome to <span className="text-indigo-600">Eventra</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Smart College Event Management Platform - Your one-stop solution for discovering, 
            organizing, and managing campus events and fests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Explore Events
            </Link>
            <Link 
              href="/signup" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-3xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Event Discovery</h3>
            <p className="text-gray-600">Browse and search events, filter by category, date, and popularity.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">QR-Based Check-ins</h3>
            <p className="text-gray-600">Paperless event management with QR code tickets and attendance tracking.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
            <p className="text-gray-600">Data-driven insights for better event planning and engagement.</p>
          </div>
        </div>

        {/* User Roles */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">For Everyone in Your College</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-semibold mb-2">Students</h3>
              <p className="text-sm text-gray-600">Discover events, register, and build personal schedules</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎪</span>
              </div>
              <h3 className="font-semibold mb-2">Organizers</h3>
              <p className="text-sm text-gray-600">Create events, manage registrations, and track analytics</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Volunteers</h3>
              <p className="text-sm text-gray-600">Access shift schedules and manage task assignments</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="font-semibold mb-2">Sponsors</h3>
              <p className="text-sm text-gray-600">Track engagement and manage promotional assets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Eventra</h3>
              <p className="text-sm text-gray-300">
                Smart College Event Management Platform for the digital age.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/events" className="text-gray-300 hover:text-white">Events</Link></li>
                <li><Link href="/schedule" className="text-gray-300 hover:text-white">Schedule</Link></li>
                <li><Link href="/sponsors" className="text-gray-300 hover:text-white">Sponsors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="text-gray-300 hover:text-white">Help</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2025 Eventra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
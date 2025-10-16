import Link from 'next/link'
import Navbar from '@/components/Navbar'
import EventCarousel from '@/components/EventCarousel'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navbar />
      
      {/* Event Promotion Carousel */}
      <EventCarousel />

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
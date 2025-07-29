import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Expert Sports Betting
            <span className="block text-yellow-300">Analysis & Picks</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Get professional betting picks, in-depth analysis, and strategy guides from expert handicappers. 
            Turn your sports knowledge into winning bets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/picks" 
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Expert Picks
            </Link>
            <Link 
              href="/subscribe" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-primary-700 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">85%</div>
              <div className="text-purple-100">Win Rate on Premium Picks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">500+</div>
              <div className="text-purple-100">Betting Articles & Guides</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">10K+</div>
              <div className="text-purple-100">Active Subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
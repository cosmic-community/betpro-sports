import Link from 'next/link'

export default function SubscriptionCTA() {
  return (
    <section className="bg-primary-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Take Your Betting to the Next Level?
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of successful bettors who trust our expert analysis, premium picks, and proven strategies to maximize their winnings.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary-700 rounded-lg p-6">
            <div className="text-primary-100 text-3xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-white mb-2">Expert Analysis</h3>
            <p className="text-primary-100 text-sm">
              In-depth breakdowns of every pick with key stats and insights
            </p>
          </div>
          
          <div className="bg-primary-700 rounded-lg p-6">
            <div className="text-primary-100 text-3xl mb-2">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">Proven Results</h3>
            <p className="text-primary-100 text-sm">
              Track record of consistent wins with transparent results
            </p>
          </div>
          
          <div className="bg-primary-700 rounded-lg p-6">
            <div className="text-primary-100 text-3xl mb-2">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">Real-Time Updates</h3>
            <p className="text-primary-100 text-sm">
              Get picks and analysis delivered instantly as games approach
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/subscribe" 
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Subscription
          </Link>
          <Link 
            href="/picks" 
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            View Free Picks
          </Link>
        </div>
        
        <p className="text-primary-200 text-sm mt-6">
          No long-term contracts • Cancel anytime • 7-day money-back guarantee
        </p>
      </div>
    </section>
  )
}
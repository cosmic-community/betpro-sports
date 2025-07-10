import { getFeaturedArticles, getLatestPicks } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import PickCard from '@/components/PickCard'
import SubscriptionCTA from '@/components/SubscriptionCTA'
import Link from 'next/link'

export default async function HomePage() {
  const [featuredArticles, latestPicks] = await Promise.all([
    getFeaturedArticles(3),
    getLatestPicks(4)
  ])

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Featured Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth betting analysis, strategy guides, and expert insights to give you the edge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article}
                showExcerpt={true}
                className="h-full"
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/articles" 
              className="btn btn-primary"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Picks Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expert Picks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get our latest betting picks with detailed analysis and confidence ratings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {latestPicks.map((pick) => (
              <PickCard 
                key={pick.id} 
                pick={pick}
                showDescription={false}
                className="h-full"
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/picks" 
              className="btn btn-primary"
            >
              View All Picks
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <SubscriptionCTA />
    </div>
  )
}
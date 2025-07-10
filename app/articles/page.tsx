import { getArticles } from '@/lib/cosmic'
import ArticleCard from '@/components/ArticleCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sports Betting Articles - BetPro Sports',
  description: 'Expert sports betting analysis, strategy guides, and game previews from professional handicappers.',
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Articles</h1>
          <p className="text-gray-600">No articles available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sports Betting Articles
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Expert analysis, strategy guides, and insights to improve your betting game
        </p>
      </div>

      <CategoryFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article}
            showExcerpt={true}
            className="h-full"
          />
        ))}
      </div>
    </div>
  )
}
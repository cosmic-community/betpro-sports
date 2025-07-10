import Link from 'next/link'
import type { ArticleCardProps } from '@/types'
import SportBadge from '@/components/SportBadge'

export default function ArticleCard({ article, showExcerpt = false, className = '' }: ArticleCardProps) {
  const featuredImage = article.metadata?.featured_image
  const sportCategory = article.metadata?.sport_category
  const articleType = article.metadata?.article_type
  const isPremium = article.metadata?.premium_content

  return (
    <article className={`card overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {/* Featured Image */}
      {featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <Link href={`/articles/${article.slug}`}>
            <img
              src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={article.title}
              width={400}
              height={200}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {isPremium && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-warning">Premium</span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {sportCategory && (
            <SportBadge sport={sportCategory.key} />
          )}
          {articleType && (
            <span className="badge badge-secondary">
              {articleType.value}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          <Link 
            href={`/articles/${article.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {article.metadata?.headline || article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {showExcerpt && article.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.metadata.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-3">
            {article.metadata?.author && (
              <span>{article.metadata.author}</span>
            )}
            {article.metadata?.read_time && (
              <span>{article.metadata.read_time}</span>
            )}
          </div>
          <time dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>
    </article>
  )
}
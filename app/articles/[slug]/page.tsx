// app/articles/[slug]/page.tsx
import { getArticleBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import SportBadge from '@/components/SportBadge'
import SubscriptionCTA from '@/components/SubscriptionCTA'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article Not Found - BetPro Sports'
    }
  }

  return {
    title: `${article.metadata?.headline || article.title} - BetPro Sports`,
    description: article.metadata?.excerpt || 'Expert sports betting analysis and insights.',
    openGraph: {
      title: article.metadata?.headline || article.title,
      description: article.metadata?.excerpt || 'Expert sports betting analysis and insights.',
      type: 'article',
      images: article.metadata?.featured_image ? [
        {
          url: `${article.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : [],
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const featuredImage = article.metadata?.featured_image
  const sportCategory = article.metadata?.sport_category
  const articleType = article.metadata?.article_type
  const isPremium = article.metadata?.premium_content

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/articles" className="text-primary-600 hover:text-primary-700">
          ← Back to Articles
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {sportCategory && (
            <SportBadge sport={sportCategory.key} />
          )}
          {articleType && (
            <span className="badge badge-secondary">
              {articleType.value}
            </span>
          )}
          {isPremium && (
            <span className="badge badge-warning">
              Premium
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.metadata?.headline || article.title}
        </h1>
        
        {article.metadata?.excerpt && (
          <p className="text-xl text-gray-600 mb-6">
            {article.metadata.excerpt}
          </p>
        )}

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          {article.metadata?.author && (
            <span>By {article.metadata.author}</span>
          )}
          {article.metadata?.read_time && (
            <span>{article.metadata.read_time}</span>
          )}
          <time dateTime={article.created_at}>
            {new Date(article.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-8">
          <img
            src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Premium Content Gate */}
      {isPremium ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="text-yellow-600 text-2xl mr-3">🔒</span>
            <h3 className="text-lg font-semibold text-yellow-800">
              Premium Content
            </h3>
          </div>
          <p className="text-yellow-700 mb-4">
            This is exclusive premium content. Subscribe to access our expert analysis and in-depth betting strategies.
          </p>
          <Link href="/subscribe" className="btn btn-primary">
            Subscribe Now
          </Link>
        </div>
      ) : null}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        {article.metadata?.content && (
          <div 
            dangerouslySetInnerHTML={{ 
              __html: isPremium ? 
                article.metadata.content.substring(0, 300) + '...' : 
                article.metadata.content 
            }} 
          />
        )}
      </div>

      {/* Subscription CTA */}
      <div className="mt-12">
        <SubscriptionCTA />
      </div>
    </article>
  )
}
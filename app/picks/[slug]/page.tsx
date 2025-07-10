// app/picks/[slug]/page.tsx
import { getPickBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import SportBadge from '@/components/SportBadge'
import ConfidenceBadge from '@/components/ConfidenceBadge'
import SubscriptionCTA from '@/components/SubscriptionCTA'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pick = await getPickBySlug(slug)

  if (!pick) {
    return {
      title: 'Pick Not Found - BetPro Sports'
    }
  }

  return {
    title: `${pick.title} - BetPro Sports`,
    description: pick.metadata?.pick_description || 'Expert sports betting pick with detailed analysis.',
  }
}

export default async function PickPage({ params }: PageProps) {
  const { slug } = await params
  const pick = await getPickBySlug(slug)

  if (!pick) {
    notFound()
  }

  const sport = pick.metadata?.sport
  const confidenceLevel = pick.metadata?.confidence_level
  const betType = pick.metadata?.bet_type
  const result = pick.metadata?.result
  const isPremium = pick.metadata?.premium_pick

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/picks" className="text-primary-600 hover:text-primary-700">
          ← Back to Picks
        </Link>
      </nav>

      {/* Pick Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {sport && (
            <SportBadge sport={sport.key} />
          )}
          {betType && (
            <span className="badge badge-secondary">
              {betType.value}
            </span>
          )}
          {confidenceLevel && (
            <ConfidenceBadge level={confidenceLevel.key} />
          )}
          {result && (
            <span className={`badge ${
              result.key === 'win' ? 'badge-success' :
              result.key === 'loss' ? 'badge-danger' :
              result.key === 'push' ? 'badge-warning' :
              'badge-secondary'
            }`}>
              {result.value}
            </span>
          )}
          {isPremium && (
            <span className="badge badge-warning">
              Premium
            </span>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {pick.title}
        </h1>
        
        {pick.metadata?.game_title && (
          <p className="text-xl text-gray-600 mb-4">
            {pick.metadata.game_title}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {pick.metadata?.pick_details && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Pick</h3>
              <p className="text-gray-700">{pick.metadata.pick_details}</p>
            </div>
          )}
          {pick.metadata?.odds && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Odds</h3>
              <p className="text-gray-700">{pick.metadata.odds}</p>
            </div>
          )}
          {pick.metadata?.game_date && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Game Date</h3>
              <p className="text-gray-700">
                {new Date(pick.metadata.game_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Premium Content Gate */}
      {isPremium ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <span className="text-yellow-600 text-2xl mr-3">🔒</span>
            <h3 className="text-lg font-semibold text-yellow-800">
              Premium Pick
            </h3>
          </div>
          <p className="text-yellow-700 mb-4">
            This is a premium pick with detailed analysis. Subscribe to access our expert reasoning and full pick breakdown.
          </p>
          <Link href="/subscribe" className="btn btn-primary">
            Subscribe Now
          </Link>
        </div>
      ) : null}

      {/* Pick Analysis */}
      {pick.metadata?.pick_description && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {isPremium ? 
                pick.metadata.pick_description.substring(0, 200) + '...' : 
                pick.metadata.pick_description
              }
            </p>
          </div>
        </div>
      )}

      {/* Subscription CTA */}
      <div className="mt-12">
        <SubscriptionCTA />
      </div>
    </div>
  )
}
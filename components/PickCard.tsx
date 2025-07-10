import Link from 'next/link'
import type { PickCardProps } from '@/types'
import SportBadge from '@/components/SportBadge'
import ConfidenceBadge from '@/components/ConfidenceBadge'

export default function PickCard({ pick, showDescription = false, className = '' }: PickCardProps) {
  const sport = pick.metadata?.sport
  const confidenceLevel = pick.metadata?.confidence_level
  const betType = pick.metadata?.bet_type
  const result = pick.metadata?.result
  const isPremium = pick.metadata?.premium_pick

  return (
    <article className={`card p-6 hover:shadow-lg transition-shadow ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          {sport && (
            <SportBadge sport={sport.key} />
          )}
          {betType && (
            <span className="badge badge-secondary">
              {betType.value}
            </span>
          )}
        </div>
        {isPremium && (
          <span className="badge badge-warning">Premium</span>
        )}
      </div>

      {/* Game Title */}
      {pick.metadata?.game_title && (
        <p className="text-sm text-gray-600 mb-2">
          {pick.metadata.game_title}
        </p>
      )}

      {/* Pick Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        <Link 
          href={`/picks/${pick.slug}`}
          className="hover:text-primary-600 transition-colors"
        >
          {pick.title}
        </Link>
      </h3>

      {/* Pick Details */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {pick.metadata?.pick_details && (
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Pick</div>
            <div className="font-semibold text-gray-900">{pick.metadata.pick_details}</div>
          </div>
        )}
        {pick.metadata?.odds && (
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Odds</div>
            <div className="font-semibold text-gray-900">{pick.metadata.odds}</div>
          </div>
        )}
      </div>

      {/* Description */}
      {showDescription && pick.metadata?.pick_description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {isPremium ? 
            pick.metadata.pick_description.substring(0, 100) + '...' : 
            pick.metadata.pick_description
          }
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        </div>
        {pick.metadata?.game_date && (
          <time className="text-xs text-gray-500" dateTime={pick.metadata.game_date}>
            {new Date(pick.metadata.game_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </time>
        )}
      </div>
    </article>
  )
}
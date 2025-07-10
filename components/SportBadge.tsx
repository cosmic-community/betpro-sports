import type { SportBadgeProps } from '@/types'

const sportColors: Record<string, string> = {
  'NFL': 'bg-purple-100 text-purple-800',
  'NBA': 'bg-orange-100 text-orange-800',
  'MLB': 'bg-green-100 text-green-800',
  'NHL': 'bg-blue-100 text-blue-800',
  'Soccer': 'bg-emerald-100 text-emerald-800',
  'College Football': 'bg-red-100 text-red-800',
  'College Basketball': 'bg-yellow-100 text-yellow-800',
  'General': 'bg-gray-100 text-gray-800',
}

export default function SportBadge({ sport, className = '' }: SportBadgeProps) {
  const colorClass = sportColors[sport] || 'bg-gray-100 text-gray-800'
  
  return (
    <span className={`badge ${colorClass} ${className}`}>
      {sport}
    </span>
  )
}
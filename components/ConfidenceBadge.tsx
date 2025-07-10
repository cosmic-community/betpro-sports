import type { ConfidenceBadgeProps } from '@/types'

const confidenceColors: Record<string, string> = {
  'low': 'bg-gray-100 text-gray-800',
  'medium': 'bg-blue-100 text-blue-800',
  'high': 'bg-green-100 text-green-800',
  'lock': 'bg-yellow-100 text-yellow-800',
}

const confidenceLabels: Record<string, string> = {
  'low': 'Low Confidence',
  'medium': 'Medium Confidence',
  'high': 'High Confidence',
  'lock': 'Lock of the Day',
}

export default function ConfidenceBadge({ level, className = '' }: ConfidenceBadgeProps) {
  const colorClass = confidenceColors[level] || 'bg-gray-100 text-gray-800'
  const label = confidenceLabels[level] || level
  
  return (
    <span className={`badge ${colorClass} ${className}`}>
      {label}
    </span>
  )
}
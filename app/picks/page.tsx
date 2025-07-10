import { getPicks } from '@/lib/cosmic'
import PickCard from '@/components/PickCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Expert Sports Betting Picks - BetPro Sports',
  description: 'Get expert sports betting picks with detailed analysis and confidence ratings from professional handicappers.',
}

export default async function PicksPage() {
  const picks = await getPicks()

  if (!picks || picks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Expert Picks</h1>
          <p className="text-gray-600">No picks available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Expert Sports Betting Picks
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Get our latest betting picks with detailed analysis and confidence ratings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {picks.map((pick) => (
          <PickCard 
            key={pick.id} 
            pick={pick}
            showDescription={true}
            className="h-full"
          />
        ))}
      </div>
    </div>
  )
}
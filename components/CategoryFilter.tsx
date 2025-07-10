'use client'
import { useState } from 'react'
import type { SportCategory } from '@/types'

const categories: { key: SportCategory; label: string }[] = [
  { key: 'NFL', label: 'NFL' },
  { key: 'NBA', label: 'NBA' },
  { key: 'MLB', label: 'MLB' },
  { key: 'NHL', label: 'NHL' },
  { key: 'Soccer', label: 'Soccer' },
  { key: 'College Football', label: 'College Football' },
  { key: 'College Basketball', label: 'College Basketball' },
  { key: 'General', label: 'General' },
]

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState<SportCategory | 'all'>('all')

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
            selectedCategory === 'all'
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          All Articles
        </button>
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
              selectedCategory === category.key
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
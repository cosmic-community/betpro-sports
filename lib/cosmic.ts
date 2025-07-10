import { createBucketClient } from '@cosmicjs/sdk'
import type { Article, Pick, Subscriber, CosmicResponse, SportCategory, ConfidenceLevel, ArticleType } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Article functions
export async function getArticles(): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')

    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching articles:', error)
    throw new Error('Failed to fetch articles')
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'articles', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return response.object as Article
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching article:', error)
    throw new Error('Failed to fetch article')
  }
}

export async function getArticlesByCategory(category: SportCategory): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'articles',
        'metadata.sport_category.key': category
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')

    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching articles by category:', error)
    throw new Error('Failed to fetch articles by category')
  }
}

export async function getArticlesByType(type: ArticleType): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'articles',
        'metadata.article_type.key': type
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')

    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching articles by type:', error)
    throw new Error('Failed to fetch articles by type')
  }
}

// Pick functions
export async function getPicks(): Promise<Pick[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'picks' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')

    return response.objects as Pick[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching picks:', error)
    throw new Error('Failed to fetch picks')
  }
}

export async function getPickBySlug(slug: string): Promise<Pick | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'picks', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return response.object as Pick
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching pick:', error)
    throw new Error('Failed to fetch pick')
  }
}

export async function getPicksByConfidence(confidence: ConfidenceLevel): Promise<Pick[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'picks',
        'metadata.confidence_level.key': confidence
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')

    return response.objects as Pick[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching picks by confidence:', error)
    throw new Error('Failed to fetch picks by confidence')
  }
}

export async function getPicksBySport(sport: SportCategory): Promise<Pick[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'picks',
        'metadata.sport.key': sport
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')

    return response.objects as Pick[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching picks by sport:', error)
    throw new Error('Failed to fetch picks by sport')
  }
}

// Subscriber functions
export async function createSubscriber(email: string, fullName: string, subscriptionTier: string = 'free'): Promise<Subscriber> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'subscribers',
      title: email,
      metadata: {
        email,
        full_name: fullName,
        subscription_tier: subscriptionTier,
        subscription_start_date: new Date().toISOString().split('T')[0],
        active_subscription: true,
        email_notifications: true,
        favorite_sports: []
      }
    })

    return response.object as Subscriber
  } catch (error) {
    console.error('Error creating subscriber:', error)
    throw new Error('Failed to create subscriber')
  }
}

export async function getSubscriberByEmail(email: string): Promise<Subscriber | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'subscribers',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Subscriber
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching subscriber:', error)
    throw new Error('Failed to fetch subscriber')
  }
}

// Utility functions
export async function getFeaturedArticles(limit: number = 3): Promise<Article[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'articles' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')
      .limit(limit)

    return response.objects as Article[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching featured articles:', error)
    throw new Error('Failed to fetch featured articles')
  }
}

export async function getLatestPicks(limit: number = 5): Promise<Pick[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'picks' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
      .sort('-created_at')
      .limit(limit)

    return response.objects as Pick[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching latest picks:', error)
    throw new Error('Failed to fetch latest picks')
  }
}
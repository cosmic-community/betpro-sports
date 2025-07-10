// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Article interface
interface Article extends CosmicObject {
  type_slug: 'articles';
  metadata: {
    headline?: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    sport_category?: {
      key: SportCategory;
      value: string;
    };
    article_type?: {
      key: ArticleType;
      value: string;
    };
    premium_content?: boolean;
    author?: string;
    read_time?: string;
  };
}

// Pick interface
interface Pick extends CosmicObject {
  type_slug: 'picks';
  metadata: {
    game_title?: string;
    pick_description?: string;
    bet_type?: {
      key: BetType;
      value: string;
    };
    pick_details?: string;
    odds?: string;
    confidence_level?: {
      key: ConfidenceLevel;
      value: string;
    };
    sport?: {
      key: SportCategory;
      value: string;
    };
    game_date?: string;
    result?: {
      key: PickResult;
      value: string;
    };
    premium_pick?: boolean;
  };
}

// Subscriber interface
interface Subscriber extends CosmicObject {
  type_slug: 'subscribers';
  metadata: {
    email?: string;
    full_name?: string;
    subscription_tier?: {
      key: SubscriptionTier;
      value: string;
    };
    favorite_sports?: string[];
    subscription_start_date?: string;
    active_subscription?: boolean;
    email_notifications?: boolean;
  };
}

// Type literals for select-dropdown values
type SportCategory = 'NFL' | 'NBA' | 'MLB' | 'NHL' | 'Soccer' | 'College Football' | 'College Basketball' | 'General';

type ArticleType = 'preview' | 'analysis' | 'strategy' | 'recap' | 'news';

type BetType = 'spread' | 'moneyline' | 'over_under' | 'prop' | 'parlay';

type ConfidenceLevel = 'low' | 'medium' | 'high' | 'lock';

type PickResult = 'pending' | 'win' | 'loss' | 'push';

type SubscriptionTier = 'free' | 'premium' | 'vip';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Component prop types
interface ArticleCardProps {
  article: Article;
  showExcerpt?: boolean;
  className?: string;
}

interface PickCardProps {
  pick: Pick;
  showDescription?: boolean;
  className?: string;
}

interface SubscriptionBadgeProps {
  tier: SubscriptionTier;
  className?: string;
}

interface SportBadgeProps {
  sport: SportCategory;
  className?: string;
}

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  className?: string;
}

// Form data types
interface SubscribeFormData {
  email: string;
  fullName: string;
  subscriptionTier: SubscriptionTier;
  favoriteSports: string[];
}

interface NewsletterFormData {
  email: string;
}

// Type guards
function isArticle(obj: CosmicObject): obj is Article {
  return obj.type_slug === 'articles';
}

function isPick(obj: CosmicObject): obj is Pick {
  return obj.type_slug === 'picks';
}

function isSubscriber(obj: CosmicObject): obj is Subscriber {
  return obj.type_slug === 'subscribers';
}

// Utility types
type OptionalMetadata<T extends CosmicObject> = Partial<T['metadata']>;
type CreateArticleData = Omit<Article, 'id' | 'created_at' | 'modified_at'>;
type CreatePickData = Omit<Pick, 'id' | 'created_at' | 'modified_at'>;
type CreateSubscriberData = Omit<Subscriber, 'id' | 'created_at' | 'modified_at'>;

export type {
  CosmicObject,
  Article,
  Pick,
  Subscriber,
  CosmicResponse,
  ArticleCardProps,
  PickCardProps,
  SubscriptionBadgeProps,
  SportBadgeProps,
  ConfidenceBadgeProps,
  SubscribeFormData,
  NewsletterFormData,
  SportCategory,
  ArticleType,
  BetType,
  ConfidenceLevel,
  PickResult,
  SubscriptionTier,
  OptionalMetadata,
  CreateArticleData,
  CreatePickData,
  CreateSubscriberData,
};

export {
  isArticle,
  isPick,
  isSubscriber,
};
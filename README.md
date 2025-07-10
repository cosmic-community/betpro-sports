# BetPro Sports

A modern sports betting blog featuring expert picks, in-depth analysis, and premium subscription content. Built with Next.js and powered by Cosmic for seamless content management.

## Features

- 🏈 **Expert Sports Picks** - Professional betting picks across NFL, NBA, MLB, NHL, and College Sports
- 📊 **Detailed Analysis** - In-depth game previews, strategy guides, and betting breakdowns
- 🔒 **Premium Subscriptions** - Tiered subscription model with exclusive premium content
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Next.js 15 for optimal speed and SEO
- 🎯 **Sports Categories** - Filter content by sport and article type
- 📈 **Pick Tracking** - Track wins, losses, and betting performance
- 💡 **Strategy Guides** - Educational content for improving betting skills

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=my-test-project-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a sports betting blog that has a modern style and a subscription option."

### Code Generation Prompt

> "Build a sports betting blog. add to Cosmic config  apiEnvironment: "staging""

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Cosmic (with staging environment)
- **Language**: TypeScript
- **Runtime**: Bun
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with the staging environment

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Cosmic SDK Examples

### Fetching Articles
```typescript
import { cosmic } from '@/lib/cosmic'

const articles = await cosmic.objects
  .find({ type: 'articles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Picks by Sport
```typescript
const nflPicks = await cosmic.objects
  .find({ 
    type: 'picks',
    'metadata.sport': 'NFL'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Managing Subscribers
```typescript
const newSubscriber = await cosmic.objects.insertOne({
  type: 'subscribers',
  title: email,
  metadata: {
    email,
    full_name: fullName,
    subscription_tier: 'free',
    active_subscription: true
  }
})
```

## Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) using their powerful SDK. The content model includes:

- **Articles** - Sports betting content with categories and premium flags
- **Picks** - Expert betting picks with confidence levels and results tracking
- **Subscribers** - User management with subscription tiers and preferences

For more information on the Cosmic SDK, visit the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Production
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->
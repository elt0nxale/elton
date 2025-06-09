# Why This Was Built

Wanted a site for myself on the internet mainly to:
1) Rekindle interest in frontend (nextjs has a great developer user exp imo)
2) Recruiter visibility 
3) Improve my writing
4) Be more in touch with tech

## Features
- Markdown-based blog posts
- Server-side caching to minimise file system reads and markdown processing
- Server-side rendering
- Client-side caching of blog posts using sessionStorage
- Responsive layouts
- Accessibiity optimised

## Stack
- Next.js
- TypeScript
- Tailwind CSS
- Markdown Processing (remark, rehype)
- Centralized Redis cache

## Project Structure
```
posts
└── *.md # Markdown blog posts 
src
├── app/ # Next.js pages 
├── components/ # Reusable components 
├── contexts/ # Themes
├── lib/ # Utils
└── types/ # TypeScript definitions
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
Visit http://localhost:3000


## Blog Posts
Add new posts in the posts/ directory:
```markdown
---
title: "Post Title"
date: "2024-01-18"
---
Content here...
```

## Deployment
- Continuous deployment (because this is the only place where this can be done)
- Hosted on Vercel (free things)
- CI/CD workflow does some accessibility checks using lighthouse

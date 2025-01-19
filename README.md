# Personal Portfolio & Blog

Wanted a site for myself on the internet mainly to:
1) Rekindle interest in frontend (nextjs has a great developer user exp imo)
2) Recruiter visibility 
3) Improve my writing
4) Be more in touch with tech

## Features
- Dark/Light mode toggle
- Markdown-based blog posts
- Server-side rendering
- Responsive layout

## Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Markdown Processing (remark, rehype)

## Project Structure
src
├── app/# Next.js pages 
├── components/ # Reusable components 
├── contexts/ # React contexts (theme) 
├── lib/ # Utilities 
├── posts/ # Markdown blog posts 
└── types/ # TypeScript definitions

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
Deployed on Vercel with continuous deployment from main branch.

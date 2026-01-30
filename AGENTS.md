# Agent Instructions

This document provides guidance for AI coding agents working on this project.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

## Project Structure

This is a Next.js landing page template with:
- Static export configured (`output: 'export'` in `next.config.js`)
- Tailwind CSS for styling
- TypeScript for type safety
- ESLint and Prettier for code quality
- Husky for git hooks

## Deployment Architecture

The application is deployed to AWS using CDK:
- **CloudFront** for global CDN and HTTPS
- **S3** for static file storage
- **CloudFront Functions** for URL rewriting (Next.js routing) and CSP headers
- **IAM** for secure access controls

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build production bundle
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run check-types  # TypeScript type checking
npm run test:e2e     # Run Playwright tests
```

## Deployment Commands

```bash
./scripts/deploy.sh                 # Deploy to preview environment
./scripts/deploy.sh dev             # Deploy to dev environment
./scripts/deploy.sh prod            # Deploy to production
```

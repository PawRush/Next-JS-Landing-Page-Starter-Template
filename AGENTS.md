# Agent Instructions

This file contains instructions for AI coding agents working on this project.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, and next steps.

The application is deployed to AWS using CDK infrastructure with automated CI/CD via CodePipeline.

**Automated Deployment:** Push to `deploy-to-aws` branch triggers pipeline
**Manual Deployment:** Use `./scripts/deploy.sh` for preview environments

Pipeline URL: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NextLandingPipeline/view

## Project Overview

This is a Next.js 14 landing page template with:
- Static site generation (`output: 'export'`)
- Tailwind CSS for styling
- TypeScript for type safety
- ESLint and Prettier for code quality

## Development

```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run lint        # Run linting
```

## Deployment

```bash
./scripts/deploy.sh                 # Deploy to preview environment
./scripts/deploy.sh dev             # Deploy to dev environment
./scripts/deploy.sh prod            # Deploy to production
```

See DEPLOYMENT.md for detailed deployment documentation.

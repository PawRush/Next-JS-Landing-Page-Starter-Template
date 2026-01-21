# Agent Guide

This file provides guidance for AI coding agents working with this repository.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

The application is deployed to AWS using CDK infrastructure:
- Frontend: Next.js static site on S3 + CloudFront
- Environment: preview-sergeyka
- URL: https://d9adrq419rcwu.cloudfront.net

## Project Structure

```
.
├── src/                    # Next.js source code
│   ├── pages/             # Pages and routes
│   ├── templates/         # Component templates
│   └── styles/            # Global styles
├── public/                # Static assets
├── infra/                 # CDK infrastructure code
│   ├── lib/stacks/       # CDK stack definitions
│   └── bin/              # CDK app entry point
├── scripts/               # Deployment and utility scripts
│   └── deploy.sh         # Main deployment script
├── out/                   # Build output (static export)
└── DEPLOYMENT.md          # Deployment documentation
```

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production static export
npm run build

# Run linter
npm run lint

# Run e2e tests
npm run test:e2e
```

## Deployment Commands

```bash
# Deploy to preview environment (default)
./scripts/deploy.sh

# Deploy to specific environment
./scripts/deploy.sh dev
./scripts/deploy.sh prod

# View deployment status
aws cloudformation describe-stacks --stack-name "NextJSLandFrontend-preview-sergeyka"
```

## Configuration Files

- `next.config.js` - Next.js configuration (static export enabled)
- `infra/bin/infra.ts` - CDK app configuration
- `infra/lib/stacks/frontend-stack.ts` - CDK stack definition
- `.eslintrc` - ESLint configuration with CDK overrides

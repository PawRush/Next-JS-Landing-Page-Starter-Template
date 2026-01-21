# Agent Guide

This file provides guidance for AI coding agents working with this repository.

## Deployment

See `./DEPLOYMENT.md` for deployment status, logs, troubleshooting, pipeline setup, and next steps.

The application uses automated CI/CD with AWS CodePipeline:
- **Pipeline**: NextJSLandPipeline (triggers on push to deploy-to-aws branch)
- **Production**: Deployed via pipeline to NextJSLandFrontend-prod stack
- **Manual Preview**: preview-sergeyka environment at https://d9adrq419rcwu.cloudfront.net
- **Infrastructure**: CDK (S3 + CloudFront + CodePipeline)

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
# Automated deployment (production)
git push origin deploy-to-aws

# View pipeline status
aws codepipeline get-pipeline-state --name "NextJSLandPipeline"

# Manual preview deployment
./scripts/deploy.sh

# View production deployment status
aws cloudformation describe-stacks --stack-name "NextJSLandFrontend-prod"
```

## Configuration Files

- `next.config.js` - Next.js configuration (static export enabled)
- `infra/bin/infra.ts` - CDK app configuration (manual and pipeline modes)
- `infra/lib/stacks/frontend-stack.ts` - Frontend CDK stack definition
- `infra/lib/stacks/pipeline-stack.ts` - Pipeline CDK stack definition
- `.eslintrc` - ESLint configuration with CDK overrides

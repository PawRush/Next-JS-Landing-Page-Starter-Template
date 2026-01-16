---
sop_name: deploy-frontend-app
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextLanding
app_type: Frontend Application
deployment_date: 2026-01-16
---

# Deployment Summary

Your app is deployed to AWS with a 'preview' URL that doesn't change when you update GitHub. Share this link with others.

To connect deployments to GitHub changes, ask your coding agent to `setup a AWS CodePipeline`.

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
- What resources were deployed to AWS?
- How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "NextLandingFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text --no-cli-pager

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E172PG5Z69OS3M" --paths "/*" --no-cli-pager

# View CloudFront access logs (last hour)
aws s3 ls "s3://nextlandingfrontend-previ-cftos3cloudfrontloggingb-cqyr8axtzqqu/" --recursive | tail -20

# Redeploy
./scripts/deploy.sh
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

---

# Deployment Details

## Deployment Info

- Deployment URL: https://d356f16bmh1m0e.cloudfront.net
- Stack name: NextLandingFrontend-preview-sergeyka
- Distribution ID: E172PG5Z69OS3M
- S3 Bucket Name: nextlandingfrontend-preview-cftos3s3bucketcae9f2be-f44tkju5225l
- CloudFront Log Bucket: nextlandingfrontend-previ-cftos3cloudfrontloggingb-cqyr8axtzqqu
- S3 Log Bucket: nextlandingfrontend-previ-cftos3s3loggingbucket64b-iplhu4xdxmp7

## Deployment Process Completed

### Phase 1: Gather Context and Configure ✓
- Analyzed Next.js 14 landing page template
- Configured static export with `output: 'export'`
- Detected build configuration: npm, output to `out/`

### Phase 2: Build CDK Infrastructure ✓
- Initialized CDK project with TypeScript
- Created S3 + CloudFront stack with AWS Solutions Constructs
- Configured SPA error responses for client-side routing
- Added deployment script with environment support

### Phase 3: Deploy and Validate ✓
- Deployed to AWS account 126593893432 (us-east-1)
- CloudFormation stack: CREATE_COMPLETE
- CloudFront distribution: Deployed
- Validated URL returns HTTP 200

### Phase 4: Update Documentation ✓
- Created DEPLOYMENT.md
- Updated AGENTS.md
- Updated README.md

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "NextLandingFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh

# Deploy to different environment
./scripts/deploy.sh dev       # Deploy to dev environment
./scripts/deploy.sh prod      # Deploy to production
```

## Architecture

The deployment uses:
- **S3**: Hosts static website files (HTML, CSS, JS, images)
- **CloudFront**: Global CDN for fast content delivery with HTTPS
- **Origin Access Control (OAC)**: Secures S3 bucket access from CloudFront only
- **S3 Logging**: Tracks S3 access for debugging
- **CloudFront Logging**: Tracks CDN requests for analytics
- **Custom Resource**: Deploys files to S3 and invalidates CloudFront cache

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Stale content after update | Run cache invalidation command above |
| 403 errors | Check CloudFront distribution status with `aws cloudfront get-distribution --id E172PG5Z69OS3M` |
| Build fails | Run `npm run build` locally to test |
| Deployment fails | Check CloudFormation events: `aws cloudformation describe-stack-events --stack-name NextLandingFrontend-preview-sergeyka --no-cli-pager` |

## Session Log

### Session 1 - 2026-01-16T15:37:00Z - 2026-01-16T16:02:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment from scratch to production
- Configured Next.js for static export
- Built CDK infrastructure
- Deployed to AWS successfully
- Created documentation

Deployment successful! ✨

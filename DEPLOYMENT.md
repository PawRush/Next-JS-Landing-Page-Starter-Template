---
sop_name: deploy-frontend-app
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextLanding
app_type: Frontend Application
deployment_date: 2026-01-16
---

# Deployment Summary

Your app is deployed to AWS with automated CI/CD via AWS CodePipeline. Push to the `deploy-to-aws` branch to trigger automatic deployments.

**Pipeline URL:** https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NextLandingPipeline/view

**Production URL:** Will be available after first pipeline execution completes

Services used: CodePipeline, CodeBuild, CodeConnections, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
- What resources were deployed to AWS?
- How do I update my deployment?

## Quick Commands

```bash
# View pipeline status
aws codepipeline get-pipeline-state --name "NextLandingPipeline" --query 'stageStates[*].[stageName,latestExecution.status]' --output table --no-cli-pager

# View build logs
aws logs tail "/aws/codebuild/PipelineBuildSynthCdkBuildP-olad4BNaNGLw" --follow --no-cli-pager

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name "NextLandingPipeline" --no-cli-pager

# Deploy to production
git push origin deploy-to-aws

# View production deployment status
aws cloudformation describe-stacks --stack-name "NextLandingFrontend-prod" --query 'Stacks[0].StackStatus' --output text --no-cli-pager
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

### CI/CD Pipeline
- Pipeline Name: NextLandingPipeline
- Pipeline ARN: arn:aws:codepipeline:us-east-1:126593893432:NextLandingPipeline
- Pipeline URL: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NextLandingPipeline/view
- CodeConnection ARN: arn:aws:codeconnections:us-east-1:126593893432:connection/c140aa0c-7407-42c9-aa4b-7c81f5faf40b
- Repository: PawRush/Next-JS-Landing-Page-Starter-Template
- Branch: deploy-to-aws

### Preview Environment (Manual Deployment)
- Deployment URL: https://d356f16bmh1m0e.cloudfront.net
- Stack name: NextLandingFrontend-preview-sergeyka
- Distribution ID: E172PG5Z69OS3M
- S3 Bucket Name: nextlandingfrontend-preview-cftos3s3bucketcae9f2be-f44tkju5225l

### Production Environment (Pipeline Deployment)
- Stack name: NextLandingFrontend-prod
- Deployment URL: Available after pipeline completes
- Deployed via: Automated pipeline on git push

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

### Phase 5: CI/CD Pipeline Setup ✓
- Created PipelineStack with CDK Pipelines
- Configured automated deployments from deploy-to-aws branch
- Set up quality checks (linting, secret scanning)
- Integrated with existing CodeConnection
- Pipeline triggers automatically on git push

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

### CI/CD Pipeline Architecture
- **CodePipeline**: Orchestrates automated deployments
- **CodeBuild**: Runs linting, tests, and CDK synthesis
- **CodeConnections**: Integrates with GitHub repository
- **Self-Mutation**: Pipeline updates itself when infrastructure changes

### Application Architecture
- **S3**: Hosts static website files (HTML, CSS, JS, images)
- **CloudFront**: Global CDN for fast content delivery with HTTPS
- **Origin Access Control (OAC)**: Secures S3 bucket access from CloudFront only
- **S3 Logging**: Tracks S3 access for debugging
- **CloudFront Logging**: Tracks CDN requests for analytics
- **Custom Resource**: Deploys files to S3 and invalidates CloudFront cache

### Pipeline Stages
1. **Source**: Pull from GitHub via CodeConnection
2. **Build (Synth)**: Quality checks + CDK synthesis
3. **UpdatePipeline**: Self-mutation (if pipeline changed)
4. **Assets**: Publish file/Docker assets
5. **Deploy**: Deploy application stacks to production

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Pipeline failed at Synth | Check build logs: `aws logs tail "/aws/codebuild/PipelineBuildSynthCdkBuildP-olad4BNaNGLw" --follow --no-cli-pager` |
| Stack deployment failed | View CloudFormation events: `aws cloudformation describe-stack-events --stack-name "NextLandingFrontend-prod" --no-cli-pager` |
| Pipeline not triggering | Verify CodeConnection is AVAILABLE: `aws codeconnections get-connection --connection-arn "arn:aws:codeconnections:us-east-1:126593893432:connection/c140aa0c-7407-42c9-aa4b-7c81f5faf40b" --query 'Connection.ConnectionStatus' --no-cli-pager` |
| Stale content after deploy | CloudFront cache invalidation happens automatically during deployment |
| Build fails locally | Run `npm run build` locally to test |

## Session Log

### Session 1 - 2026-01-16T15:37:00Z - 2026-01-16T16:02:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment from scratch to production
- Configured Next.js for static export
- Built CDK infrastructure
- Deployed to AWS successfully
- Created documentation

Deployment successful! ✨

### Session 2 - 2026-01-16T16:05:00Z - 2026-01-16T16:15:00Z
Agent: Claude Sonnet 4.5
Progress: CI/CD Pipeline setup
- Detected existing infrastructure
- Created PipelineStack with CDK Pipelines
- Used existing CodeConnection
- Deployed pipeline to AWS
- Pipeline triggered automatically
- Updated documentation

Pipeline setup complete! ✨

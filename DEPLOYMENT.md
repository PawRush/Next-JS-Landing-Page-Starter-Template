---
sop_name: deploy-frontend-app, setup-pipeline
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextLanding
app_type: Frontend Application + CI/CD Pipeline
branch: deploy-to-aws-20260128_174824-sergeyka
created: 2026-01-28T17:48:24Z
last_updated: 2026-01-28T18:19:00Z
framework: Next.js 14 (static export)
package_manager: npm
build_command: npm run build
output_directory: out/
base_path: /
entry_point: index.html
lint_command: npm run lint
pipeline_name: NextLandingPipeline
pipeline_arn: arn:aws:codepipeline:us-east-1:126593893432:NextLandingPipeline
---

# Deployment Summary

Your app is deployed to AWS with automated CI/CD!

**Production URL:** https://d3tj3wsicl0bp.cloudfront.net (manual deployment - preview environment)

**Automated Deployments:** ✅ Set up! Push to `deploy-to-aws-20260128_174824-sergeyka` branch triggers automatic deployment to production.

**Pipeline:** [NextLandingPipeline](https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NextLandingPipeline/view)

Services used: CloudFront, S3, CloudFormation, IAM, CodePipeline, CodeBuild, CodeConnections

Questions? Ask your Coding Agent:
- What resources were deployed to AWS?
- How do I update my deployment?

## Pipeline Commands

```bash
# View pipeline status
aws codepipeline get-pipeline-state --name NextLandingPipeline --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name NextLandingPipeline

# View build logs
aws logs tail "/aws/codebuild/NextLandingPipelineStack-Synth" --follow

# Deploy automatically
git push origin deploy-to-aws-20260128_174824-sergeyka
```

## Manual Deployment Commands

```bash
# View preview deployment status
aws cloudformation describe-stacks --stack-name "NextLandingFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E3L13E7QXQWEDG" --paths "/*"

# Manual redeploy (preview environment)
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

*Original deployment plan continues below...*

# Deployment Plan: NextLanding

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

## Deployment Info

- Deployment URL: https://d3tj3wsicl0bp.cloudfront.net
- Stack name: NextLandingFrontend-preview-sergeyka
- Distribution ID: E3L13E7QXQWEDG
- S3 Bucket Name: nextlandingfrontend-preview-cftos3s3bucketcae9f2be-e61p7r2rikpo
- CloudFront Log Bucket: nextlandingfrontend-previ-cftos3cloudfrontloggingb-akmw01l7hi1k
- S3 Log Bucket: nextlandingfrontend-previ-cftos3s3loggingbucket64b-h3ceardowope
- Deployment Status: CREATE_COMPLETE
- Deployment Time: 2026-01-28T18:11:35Z

## Recovery Guide

```bash
# Rollback
cd infra
npx cdk destroy "NextLandingFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

- ESLint errors in generated CDK files - resolved by adding `infra/` to `.eslintignore`
- Husky pre-commit hooks not initialized - resolved by running `npm install`
- Next.js Image Optimization incompatible with static export - resolved by adding `images.unoptimized: true`

## Session Log

### Session 1 - 2026-01-28T17:48:24Z - 2026-01-28T18:12:00Z
Agent: Claude Sonnet 4.5
Progress:
- Completed all 4 phases of deployment
- Created CDK infrastructure with CloudFront + S3
- Deployed to AWS successfully
- Website is live at https://d3tj3wsicl0bp.cloudfront.net
Next: Update README.md with deployment section

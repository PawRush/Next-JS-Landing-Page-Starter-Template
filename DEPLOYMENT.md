---
sop_name: deploy-frontend-app
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextLanding
app_type: Frontend Application
deployment_date: 2026-05-01T12:42:04Z
---

# Deployment Summary

Your app is deployed to AWS with automated CI/CD! 

**Preview URL**: https://d27virod7qmujy.cloudfront.net

**Pipeline**: Changes pushed to `deploy-to-aws-20260501_121659-kamielw` branch are automatically deployed.

Pipeline console: https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NextLandingPipeline/view

Services used: CodePipeline, CodeBuild, CodeConnections, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - How can I change the pipeline branch?
 - How do I add a production deployment?
 - What quality checks are running in the pipeline?

## Quick Commands

```bash
# View pipeline status
AWS_PAGER="" aws codepipeline get-pipeline-state --name "NextLandingPipeline" --region eu-central-1 --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# View build logs
AWS_PAGER="" aws logs tail "/aws/codebuild/PipelineBuildSynthCdkBuildP-7955bAOtmTAn" --follow --region eu-central-1

# Trigger pipeline manually
AWS_PAGER="" aws codepipeline start-pipeline-execution --name "NextLandingPipeline" --region eu-central-1

# View preview deployment status
AWS_PAGER="" aws cloudformation describe-stacks --stack-name "NextLandingFrontend-preview-kamielw" --region eu-central-1 --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E25MZBVI2YBF8K" --paths "/*"
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

---

# Original Deployment Plan

## Deployment Info

### Pipeline
- **Pipeline URL**: https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NextLandingPipeline/view
- **Pipeline ARN**: arn:aws:codepipeline:eu-central-1:189681391221:NextLandingPipeline
- **Pipeline Stack**: NextLandingPipelineStack
- **CodeConnection ARN**: arn:aws:codeconnections:eu-central-1:189681391221:connection/ee7a600a-99ab-4b3a-bf6c-b42cc9f5a026
- **Branch**: deploy-to-aws-20260501_121659-kamielw
- **Quality Checks**: lint, check-types, secretlint

### Preview Deployment (Manual)
- **Preview URL**: https://d27virod7qmujy.cloudfront.net
- **Stack name**: NextLandingFrontend-preview-kamielw
- **Distribution ID**: E25MZBVI2YBF8K
- **S3 Bucket**: nextlandingfrontend-preview-cftos3s3bucketcae9f2be-tpru7o8vpxuk
- **CloudFront Log Bucket**: nextlandingfrontend-previ-cftos3cloudfrontloggingb-ulu2le4sbj31
- **S3 Log Bucket**: nextlandingfrontend-previ-cftos3s3loggingbucket64b-ybbsd8h1ckjk

### Common
- **Region**: eu-central-1
- **Initial deployment**: 2026-05-01T12:42:04Z
- **Pipeline setup**: 2026-05-01T12:53:00Z

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
  - Framework: Next.js with static export
  - Package manager: npm
  - Build command: npm run build
  - Output directory: out/
  - Base path: / (root)
  - Trailing slash: true
  - Lint command: npm run lint
  - CloudFront config: URL rewrite function (for /path/index.html)
- [x] Step 4: Validate Prerequisites
  - AWS credentials: ✓
  - npm: ✓
  - Build succeeds: ✓
  - CDK CLI v2.1031.0: ✓
  - Git working: ✓
- [x] Step 5: Revisit Deployment Plan
  - Plan confirmed, proceeding to Phase 2

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

## Recovery Guide

```bash
# Destroy pipeline
cd infra
npm run destroy:pipeline

# Or manual deletion
AWS_PAGER="" aws codepipeline delete-pipeline --name "NextLandingPipeline" --region eu-central-1
AWS_PAGER="" aws cloudformation delete-stack --stack-name "NextLandingPipelineStack" --region eu-central-1

# Destroy preview deployment
cd infra
cdk destroy "NextLandingFrontend-preview-kamielw" --region eu-central-1

# Manual redeploy (preview)
./scripts/deploy.sh
```

## Issues Encountered

- Linting: Initial deployment failed due to prettier formatting conflicts. Fixed by updating .eslintignore to exclude CDK build outputs and running prettier on TypeScript files.
- Region mismatch: Deployment script tried to query stack in wrong region. Stack deployed successfully to eu-central-1.

## Session Log

### Session 1 - 2026-05-01T12:17:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment to AWS CloudFront + S3
Status: ✅ Successfully deployed
Next: Set up CI/CD pipeline

### Session 2 - 2026-05-01T12:30:00Z
Agent: Claude Sonnet 4.5
Progress: CI/CD Pipeline setup complete
Summary:
- Created NextLandingPipelineStack
- Pipeline automatically triggers on push to deploy-to-aws-20260501_121659-kamielw
- Quality checks: lint, check-types, secretlint
- Deploys to NextLandingFrontend-prod stack
Status: ✅ Pipeline deployed and running
Next: Monitor pipeline at https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/NextLandingPipeline/view

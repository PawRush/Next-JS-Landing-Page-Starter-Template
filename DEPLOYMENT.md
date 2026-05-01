---
sop_name: deploy-frontend-app
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextLanding
app_type: Frontend Application
deployment_date: 2026-05-01T12:42:04Z
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d27virod7qmujy.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "NextLandingFrontend-preview-kamielw" --region eu-central-1 --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E25MZBVI2YBF8K" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://nextlandingfrontend-previ-cftos3cloudfrontloggingb-ulu2le4sbj31/" --recursive | tail -20

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

# Original Deployment Plan

## Deployment Info

- **Deployment URL**: https://d27virod7qmujy.cloudfront.net
- **Stack name**: NextLandingFrontend-preview-kamielw
- **Distribution ID**: E25MZBVI2YBF8K
- **S3 Bucket**: nextlandingfrontend-preview-cftos3s3bucketcae9f2be-tpru7o8vpxuk
- **CloudFront Log Bucket**: nextlandingfrontend-previ-cftos3cloudfrontloggingb-ulu2le4sbj31
- **S3 Log Bucket**: nextlandingfrontend-previ-cftos3s3loggingbucket64b-ybbsd8h1ckjk
- **Region**: eu-central-1
- **Deployment timestamp**: 2026-05-01T12:42:04Z

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
# Rollback
cd infra
cdk destroy "NextLandingFrontend-preview-kamielw" --region eu-central-1

# Redeploy
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
Next: See DEPLOYMENT.md for usage instructions

---
sop_name: deploy-frontend-app
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextJSLand
app_type: Frontend Application (Next.js Static Landing Page)
branch: deploy-to-aws
framework: Next.js 14.1.0
package_manager: npm
build_command: npm run build
output_directory: out/
base_path: /
routing_type: static-multi-page-trailing-slash
lint_command: npm run lint
created: 2026-01-21T20:24:00Z
last_updated: 2026-01-21T20:27:00Z
---

# Deployment Plan: NextJSLand

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [ ] Step 5: Revisit Deployment Plan
- [ ] Phase 1 Checkpoint

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth
- [x] Phase 2 Checkpoint

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack
- [x] Phase 3 Checkpoint

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md
- [ ] Completion Step

## Deployment Info

- Deployment URL: https://d9adrq419rcwu.cloudfront.net
- Stack name: NextJSLandFrontend-preview-sergeyka
- Distribution ID: E3KJCC0BV5LNFH
- S3 Bucket Name: nextjslandfrontend-preview--cftos3s3bucketcae9f2be-1c9wroq6umz1
- S3 Log Bucket: nextjslandfrontend-previe-cftos3s3loggingbucket64b-f4zpthd22hhh
- CloudFront Log Bucket: nextjslandfrontend-previe-cftos3cloudfrontloggingb-oesvcpjvotgu

## Recovery Guide

```bash
# Rollback
cd infra
npx cdk destroy "NextJSLandFrontend-<environment>"

# Redeploy
./scripts/deploy.sh

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "<distribution-id>" --paths "/*"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-21T20:24:00Z
Agent: Claude Sonnet 4.5
Progress: Created deployment plan
Next: Create deploy branch

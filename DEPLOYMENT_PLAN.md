---
sop_name: deploy-frontend-app
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextJSLand
app_type: Frontend Application (Next.js Static Landing Page)
branch: master
created: 2026-01-21T20:24:00Z
last_updated: 2026-01-21T20:24:00Z
---

# Deployment Plan: NextJSLand

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [...] Step 1: Create Deployment Plan
- [ ] Step 2: Create Deploy Branch
- [ ] Step 3: Detect Build Configuration
- [ ] Step 4: Validate Prerequisites
- [ ] Step 5: Revisit Deployment Plan
- [ ] Phase 1 Checkpoint

## Phase 2: Build CDK Infrastructure
- [ ] Step 6: Initialize CDK Foundation
- [ ] Step 7: Generate CDK Stack
- [ ] Step 8: Create Deployment Script
- [ ] Step 9: Validate CDK Synth
- [ ] Phase 2 Checkpoint

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack
- [ ] Phase 3 Checkpoint

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md
- [ ] Completion Step

## Deployment Info

- Deployment URL: [after completion]
- Stack name: [after creation]
- Distribution ID: [after creation]
- S3 Bucket Name: [after creation]
- S3 Log Bucket: [after creation]
- CloudFront Log Bucket: [after creation]

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

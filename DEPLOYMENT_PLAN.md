---
sop_name: deploy-frontend-app
repo_name: Next-JS-Landing-Page-Starter-Template
app_name: NextJSLanding
app_type: Frontend Application
branch: deploy-to-aws
created: 2026-01-11T15:45:00Z
last_updated: 2026-01-11T15:45:00Z
---

# Deployment Plan: Next.js Landing Page

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure

- [ ] Step 0: Inform User of Execution Flow
- [ ] Step 1: Create Deployment Plan
- [ ] Step 2: Create Deploy Branch
- [ ] Step 3: Detect Build Configuration
- [ ] Step 4: Validate Prerequisites
- [ ] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure

- [ ] Step 6: Initialize CDK Foundation
- [ ] Step 7: Generate CDK Stack
- [ ] Step 8: Create Deployment Script
- [ ] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate

- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation

- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md

## Deployment Info

- Framework: Next.js 14.1.0
- Build Command: `npm run build`
- Output Directory: `out/` (Next.js static export)
- Base Path: `/` (root)
- CloudFront Config: URL rewrite for `/path/index.html` (trailing slash enabled)
- Deployment URL: [pending]
- Stack Name: [pending]
- Distribution ID: [pending]
- S3 Bucket Name: [pending]
- Deployment Status: In Progress

## Recovery Guide

```bash
# Rollback
cd infra
npx cdk destroy --all

# Redeploy
./scripts/deploy.sh preview-$(whoami)

# Manual invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <DISTRIBUTION_ID> --paths "/*"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-11T15:45:00Z
Agent: Claude Haiku 4.5
Progress: Created deployment plan, analyzing project structure
Next: Step 2 - Create deploy branch

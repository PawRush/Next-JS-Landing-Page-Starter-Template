#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { execSync } from 'child_process';

import { FrontendStack } from '../lib/stacks/frontend-stack';
import { PipelineStack } from '../lib/stacks/pipeline-stack';

const app = new cdk.App();

const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || 'us-east-1';

const codeConnectionArn = app.node.tryGetContext('codeConnectionArn');
const repositoryName =
  app.node.tryGetContext('repositoryName') ||
  'PawRush/Next-JS-Landing-Page-Starter-Template';
const branchName =
  app.node.tryGetContext('branchName') ||
  'deploy-to-aws-20260128_174824-sergeyka';

// Deploy standalone stacks when no CodeConnection provided
if (!codeConnectionArn) {
  const getDefaultEnvironment = (): string => {
    try {
      const username =
        process.env.USER || execSync('whoami').toString().trim();
      return `preview-${username}`;
    } catch {
      return 'preview-local';
    }
  };

  const environment =
    app.node.tryGetContext('environment') || getDefaultEnvironment();
  const buildOutputPath = app.node.tryGetContext('buildPath') || '../out';

  new FrontendStack(app, `NextLandingFrontend-${environment}`, {
    env: { account, region },
    environment,
    buildOutputPath,
    description: `Static website hosting - ${environment}`,
    terminationProtection: environment === 'prod',
  });

  cdk.Tags.of(app).add('Environment', environment);
}

// Deploy pipeline stack when CodeConnection provided
if (codeConnectionArn) {
  new PipelineStack(app, 'NextLandingPipelineStack', {
    env: { account, region },
    description: 'CI/CD Pipeline for NextLanding',
    codeConnectionArn,
    repositoryName,
    branchName,
    terminationProtection: true,
  });
}

cdk.Tags.of(app).add('Project', 'NextLanding');
cdk.Tags.of(app).add('ManagedBy', 'CDK');

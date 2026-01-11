#!/usr/bin/env node
/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib';
import { execSync } from 'child_process';

import { FrontendStack } from '../lib/stacks/frontend-stack';
import { PipelineStack } from '../lib/stacks/pipeline-stack';

const app = new cdk.App();

const getDefaultEnvironment = (): string => {
  try {
    const username = process.env.USER || execSync('whoami').toString().trim();
    return `preview-${username}`;
  } catch {
    return 'preview-local';
  }
};

const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || 'us-east-1';

const codeConnectionArn = app.node.tryGetContext('codeConnectionArn');
const repositoryName =
  app.node.tryGetContext('repositoryName') ||
  'PawRush/Next-JS-Landing-Page-Starter-Template';
const branchName = app.node.tryGetContext('branchName') || 'deploy-to-aws';

// Deploy frontend stacks only when not deploying pipeline
if (!codeConnectionArn) {
  const environment =
    app.node.tryGetContext('environment') || getDefaultEnvironment();
  const buildOutputPath = app.node.tryGetContext('buildPath') || '../out';

  new FrontendStack(app, `NextJSLandingFrontend-${environment}`, {
    env: { account, region },
    environment,
    buildOutputPath,
    description: `Next.js Landing Page static website hosting - ${environment}`,
    terminationProtection: environment === 'prod',
  });
}

// Deploy pipeline stack when codeConnectionArn is provided
if (codeConnectionArn) {
  new PipelineStack(app, 'NextJSLandingPipelineStack', {
    env: { account, region },
    description: 'CI/CD Pipeline for Next.js Landing Page',
    codeConnectionArn,
    repositoryName,
    branchName,
    terminationProtection: true,
  });
}

cdk.Tags.of(app).add('Project', 'NextJSLanding');
cdk.Tags.of(app).add('ManagedBy', 'CDK');
if (!codeConnectionArn) {
  const environment =
    app.node.tryGetContext('environment') || getDefaultEnvironment();
  cdk.Tags.of(app).add('Environment', environment);
}

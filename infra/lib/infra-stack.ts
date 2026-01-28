import * as cdk from 'aws-cdk-lib/core';
import type { Construct } from 'constructs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Placeholder - will be replaced in Step 7
    cdk.Tags.of(this).add('Placeholder', 'true');
  }
}

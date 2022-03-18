import { Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as eks from 'aws-cdk-lib/aws-eks'

export class CdkStackDiffIssuesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cluster = new eks.Cluster(this, 'staging-eks', {
      clusterName: 'staging',
      version: eks.KubernetesVersion.V1_21,
      defaultCapacity: 0,
      albController: {
        version: eks.AlbControllerVersion.V2_3_0
      }
    })

    cluster.addNodegroupCapacity('staging-node-group', {
      instanceTypes: [new ec2.InstanceType('t3.large')],
      minSize: 1,
      maxSize: 10
    })
  }
}

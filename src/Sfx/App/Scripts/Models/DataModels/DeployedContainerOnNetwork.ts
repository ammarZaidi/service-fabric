//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

module Sfx {

    export class DeployedContainerOnNetwork extends DataModelBase<IRawDeployedContainerOnNetwork> {

        //public deplyedAppsOnNetwork: DeployedApplicationOnNetworkCollection;
        //public networkProperties: NetworkProperties;
        //nodeDetails: Node;

        public nodeName: string;
        public constructor(data: DataService, nodeName: string, raw?: IRawDeployedContainerOnNetwork) {
            super(data, raw);
            this.nodeName = nodeName;
        }

        /*protected retrieveNewData(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {
            return this.data.restClient.getNode(this.raw.nodeName, messageHandler).then(items => {
                this.nodeDetails = new Node(this.data, items.data);
            });
        }
*/
        public get viewPath(): string {
            return this.data.routes.getCodePackageViewPath(
                this.nodeName,
                IdUtils.nameToId(this.raw.ApplicationName),
                 this.raw.ServiceManifestName,
                 this.raw.ServicePackageActivationId,
                 this.raw.CodePackageName
                 );
        }
    }

}

//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

module Sfx {

    export class DeployedContainerOnNetwork extends DataModelBase<IRawDeployedContainerOnNetwork> {

        //public deplyedAppsOnNetwork: DeployedApplicationOnNetworkCollection;
        //public networkProperties: NetworkProperties;
        //nodeDetails: Node;

        public constructor(data: DataService, raw?: IRawDeployedContainerOnNetwork) {
            super(data, raw);
        }

        /*protected retrieveNewData(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {
            return this.data.restClient.getNode(this.raw.nodeName, messageHandler).then(items => {
                this.nodeDetails = new Node(this.data, items.data);
            });
        }
*/
  /*      public get viewPath(): string {
            return this.data.routes.getNodeViewPath(this.raw.nodeName);
        }*/
    }

}
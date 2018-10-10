//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

module Sfx {

    export class Network extends DataModelBase<IRawNetwork> {

        //public deplyedAppsOnNetwork: DeployedApplicationOnNetworkCollection;
        //public networkProperties: NetworkProperties;

        public constructor(data: DataService, raw?: IRawNetwork) {
            super(data, raw);
            //this.networkProperties = new NetworkProperties(data, raw.properties);
            console.log("constructors =====");
            console.log(this.raw.name);
            //this.deplyedAppsOnNetwork = new DeployedApplicationOnNetworkCollection(this.data, this);
            if (this.data.actionsEnabled()) {
                this.setUpActions();
            }
        }

        public get name(): string {
            return this.raw.name;
        }
        public get type(): string {
            return this.raw.properties.kind;
        }
        public get addressPrefix(): string {
            return this.raw.properties.networkAddressPrefix;
        }
        public get status(): string {
            return this.raw.properties.networkStatus;
        }
        public get viewPath(): string {
            return this.data.routes.getNetworkViewPath(this.name);
        }
        protected retrieveNewData(messageHandler?: IResponseMessageHandler): angular.IPromise<IRawNetwork> {
            return this.data.restClient.getNetwork(this.name, messageHandler).then(response => {
                return response.data;
            });

        }
        private setUpActions(): void {
            this.actions.add(new ActionWithConfirmationDialog(
                this.data.$uibModal,
                this.data.$q,
                "deleteNetwork",
                "Delete",
                "Deleting",
                () => this.delete(),
                // There are various levels of "disabling" and it should be possible to disable "at a higher level" an already-disabled node.
                () => this.raw.properties.networkStatus === "Ready",
                // We do not track the level of disabling, so we just enable the command as long as the node is not down.
                "Confirm Netwrok Deletion",
                `Delete network '${this.name}' from cluster? `,
                this.name
            ));
        }

        private delete(): angular.IPromise<any> {
            return this.data.restClient.deleteNetwork(this.name);
        }
    }

    export class NetworkProperties extends DataModelBase<IRawNetworkProperties> {
        public constructor(data: DataService, raw: IRawNetworkProperties) {
            super(data, raw);

        }

    }

}

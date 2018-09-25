//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

module Sfx {

    export class NetworkOnApp extends DataModelBase<IRawNetworkOnApp> {

        //public deplyedAppsOnNetwork: DeployedApplicationOnNetworkCollection;
        //public networkProperties: NetworkProperties;

        public constructor(data: DataService, raw?: IRawNetworkOnApp) {
            super(data, raw);
        }
        public get viewPath(): string {
            return this.data.routes.getNetworkViewPath(this.raw.networkName);
        }
    }

}

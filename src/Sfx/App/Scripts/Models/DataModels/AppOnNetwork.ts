//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

module Sfx {

    export class AppOnNetwork extends DataModelBase<IRawAppOnNetwork> {

        //public deplyedAppsOnNetwork: DeployedApplicationOnNetworkCollection;
        //public networkProperties: NetworkProperties;
        public appDetail: Application;

        public constructor(data: DataService, raw?: IRawAppOnNetwork) {
            super(data, raw);
        }

        protected retrieveNewData(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {
            return this.data.restClient.getApplication(this.nameToId(this.raw.ApplicationName), messageHandler).then(items => {
                this.appDetail = new Application(this.data, items.data);
            });
        }

        public get viewPath(): string {
            return this.data.routes.getAppViewPath(this.appDetail.raw.TypeName, this.appDetail.raw.Id);
        }

        public nameToId(name: string): string {
            return name.substr(name.indexOf("/") + 1);
        }
    }

}

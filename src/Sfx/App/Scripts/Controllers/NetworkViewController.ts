//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

module Sfx {

    export interface INetworkViewScope extends angular.IScope {
        network: Network;
        //deployedApps: DeployedApplicationOnNetworkCollection;
        //deployedNodes: IRawNodesInNetwork[];
        listSettings: ListSettings;
    }

    export class NetworkViewController extends MainViewController {
        public networkName: string;

        constructor($injector: angular.auto.IInjectorService, public $scope: INetworkViewScope) {
            super($injector, {
                "essentials": { name: "Essentials" },
                "details": { name: "Details" }
            });
            //this.tabs["essentials"].refresh = (messageHandler) => this.refreshEssentials(messageHandler);
            //this.tabs["details"].refresh = (messageHandler) => this.refreshDetails(messageHandler);
            this.networkName = IdUtils.getNetworkName(this.routeParams);

            this.selectTreeNode([
                IdGenerator.cluster(),
                IdGenerator.networkGroup(),
                IdGenerator.network(this.networkName)
            ]);
            this.$scope.listSettings = this.settings.getNewOrExistingListSettings("apps", ["name"], [
                new ListColumnSettingForLink("name", "Name", item => item.viewPath),
                new ListColumnSetting("raw.TypeName", "Application Type"),
                new ListColumnSettingForBadge("health.healthState", "Health State"),
                new ListColumnSettingWithFilter("raw.Status", "Status"),
            ]);
            this.refresh();
        }

        protected refreshCommon(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {
            console.log("refresh common");
            return this.data.getNetwork(this.networkName, true, messageHandler)
                .then(network => {
                    this.$scope.network = network;
                });
        }
        /*private refreshEssentials(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {
            console.log("referesh essentials");
            return this.$scope.network.deplyedAppsOnNetwork.refresh(messageHandler).then(deployedApps => {
                this.$scope.deployedApps = deployedApps;
            });
        }

        private refreshDetails(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {
            console.log("refresh details");
            return this.$scope.network.deplyedAppsOnNetwork.refresh(messageHandler).then(deployedApps => {
                this.$scope.deployedApps = deployedApps;
            });
        }*/
    }

    (function () {

        let module = angular.module("networkViewController", ["ngRoute", "dataService"]);
        module.controller("NetworkViewController", ["$injector", "$scope", NetworkViewController]);

    })();
}

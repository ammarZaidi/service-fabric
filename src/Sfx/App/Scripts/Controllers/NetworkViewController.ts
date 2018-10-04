//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//-----------------------------------------------------------------------------

module Sfx {

    export interface INetworkViewScope extends angular.IScope {
        network: Network;
        //deployedApps: DeployedApplicationOnNetworkCollection;
        //deployedNodes: IRawNodesInNetwork[];
        listSettings: ListSettings;
        apps: AppOnNetworkCollection;
        appListSettings: ListSettings;
        nodes: NodeOnNetworkCollection;
        nodeListSettings: ListSettings;
        containers: DeployedContainerOnNetworkCollection;
        containerListSettings: ListSettings;
    }

    export class NetworkViewController extends MainViewController {
        public networkName: string;

        constructor($injector: angular.auto.IInjectorService, public $scope: INetworkViewScope) {
            super($injector, {
                "essentials": { name: "Essentials" },
                "details": { name: "Details" }
            });
            this.tabs["essentials"].refresh = (messageHandler) => this.refreshEssentials(messageHandler);
            //this.tabs["details"].refresh = (messageHandler) => this.refreshDetails(messageHandler);
            this.networkName = IdUtils.getNetworkName(this.routeParams);

            this.selectTreeNode([
                IdGenerator.cluster(),
                IdGenerator.networkGroup(),
                IdGenerator.network(this.networkName)
            ]);
            this.$scope.appListSettings = this.settings.getNewOrExistingListSettings("apps", ["appDetail.raw.Name"], [
                new ListColumnSettingForLink("appDetail.raw.Name", "Application Name", item => item.viewPath),
                new ListColumnSetting("appDetail.raw.TypeName", "Application Type"),
                new ListColumnSettingForBadge("appDetail.healthState", "Health State"),
                new ListColumnSetting("appDetail.raw.Status", "Status"),
            ]);
            this.$scope.apps = new AppOnNetworkCollection(this.data, this.networkName);
            this.$scope.nodeListSettings = this.settings.getNewOrExistingListSettings("nodes", ["nodeDetails.name"], [
                new ListColumnSettingForLink("nodeDetails.name", "Name", item => item.viewPath),
                new ListColumnSetting("nodeDetails.raw.IpAddressOrFQDN", "Address"),
                new ListColumnSettingWithFilter("nodeDetails.raw.Type", "Node Type"),
                new ListColumnSettingWithFilter("nodeDetails.raw.UpgradeDomain", "Upgrade Domain"),
                new ListColumnSettingWithFilter("nodeDetails.raw.FaultDomain", "Fault Domain"),
                new ListColumnSettingWithFilter("nodeDetails.raw.IsSeedNode", "Is Seed Node"),
                new ListColumnSettingForBadge("nodeDetails.healthState", "Health State"),
                new ListColumnSettingWithFilter("nodeDetails.nodeStatus", "Status"),
            ]);
            this.$scope.nodes = new NodeOnNetworkCollection(this.data, this.networkName);
            this.$scope.containerListSettings = this.settings.getNewOrExistingListSettings("containers", ["raw.ServicePackageActivationId"], [
                new ListColumnSetting("raw.ServicePackageActivationId", "Activation Id"),
            ]);
            this.$scope.containers = new DeployedContainerOnNetworkCollection(this.data, this.networkName);
            this.refresh();
        }

        protected refreshCommon(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {
            console.log("refresh common");
            return this.data.getNetwork(this.networkName, true, messageHandler)
                .then(network => {
                    this.$scope.network = network;
                });
        }

        private refreshEssentials(messageHandler?: IResponseMessageHandler): angular.IPromise<any> {

            return this.$q.all([
                this.$scope.apps.refresh(messageHandler),
                this.$scope.nodes.refresh(messageHandler),
                this.$scope.containers.refresh(messageHandler)
            ]);
        }
/*
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

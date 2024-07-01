sap.ui.define([
    "sap/ui/Device",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet"

], function (Device, Controller, JSONModel, Popover, Button, library, MessageToast,MessageBox,exportLibrary,Spreadsheet) {
    "use strict";
    var EdmType = exportLibrary.EdmType;
    return Controller.extend("com.app.yardmanagement.controller.Entrance", {

        onInit: function () {
            
        },
        createColumnConfig: function() {
            return [
                { label: 'Slot no', property: 'parkingslots_slotno', type: EdmType.String },
                { label: 'Type (Inward / Outward)', property: 'parkingslots/type', type: EdmType.String },
                { label: 'Driver name', property: 'driverName', type: EdmType.String},
                { label: 'Phone no', property: 'PhoneNo', type: EdmType.String },
                { label: 'Vehicle no', property: 'vehicleNo', type: EdmType.String },
                { label: 'Time', property: 'time', type: EdmType.String},
                { label: 'Time', property: 'time', type: EdmType.String }
            ];
        },


        onSelectItem: function (oEvent) {
            var oItem = oEvent.getParameter("item").getKey();
            var navContainer = this.getView().byId("pageContainer");

            switch (oItem) {
                case "AllSlots":
                    navContainer.to(this.getView().createId("Page1"));
                    break;
                case "AssignedSlots":
                    navContainer.to(this.getView().createId("Page2"));
                    break;
                case "Parking-lotAllocation":
                    navContainer.to(this.getView().createId("Page3"));
                    break;
                case "History":
                    navContainer.to(this.getView().createId("Page4"));
                    break;
                case "DataVisualization":
                    navContainer.to(this.getView().createId("Page5"));
                    break;
                case "Reservations":
                    navContainer.to(this.getView().createId("Page6"));
                    break;
            }
        },

        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();

            this._setToggleButtonTooltip(bSideExpanded);

            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        _setToggleButtonTooltip: function (bLarge) {
            var oToggleButton = this.byId('sideNavigationToggleButton');
            if (bLarge) {
                oToggleButton.setTooltip('Large Size Navigation');
            } else {
                oToggleButton.setTooltip('Small Size Navigation');
            }
        },
        onSearch: function (oEvent) {
            // Get the search query
            var sQuery = oEvent.getParameter("query");
    
            // Build filters based on the search query
            var aFilters = [];
            if (sQuery) {
                aFilters.push(new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("slotno", sap.ui.model.FilterOperator.Contains, sQuery),
                        new sap.ui.model.Filter("type", sap.ui.model.FilterOperator.Contains, sQuery),
                    ],
                    and: false
                }));
            }
            // Get the table and binding
            var oTable = this.byId("allSlotsTable");
            var oBinding = oTable.getBinding("items");
            // Apply the filters to the binding
            oBinding.filter(aFilters);
        },
        
        onAddButtonPress: function(){
            if (!this.byId("addDialog")) {
                this.loadFragment({
                    name: "com.app.yardmanagement.view.AddDialog"
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this.byId("addDialog").open();
            }
        },

        onCancelDialog: function () {
            this.byId("addDialog").close();
        },

        onSaveParkingSlot: async function () {
            
        },





        onExport: function() {
            var aCols, oBinding, oSettings, oSheet, oTable;

            oTable = this.byId('assignedSlotsTable');
            oBinding = oTable.getBinding('items');
            aCols = this.createColumnConfig();

            oSettings = {
                workbook: { columns: aCols },
                dataSource: oBinding,
                fileName: 'Assigned Slots.xlsx'
            };
         oSheet = new Spreadsheet(oSettings);
            oSheet.build()
                .then(function() {
                    MessageToast.show('Spreadsheet export has finished');
                })
                .finally(function() {
                    oSheet.destroy();
                });
        },
    });
});

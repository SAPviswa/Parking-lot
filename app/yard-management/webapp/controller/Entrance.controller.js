sap.ui.define([
    "sap/ui/Device",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/m/MessageBox"

], function (Device, Controller, JSONModel, Popover, Button, library, MessageToast,MessageBox) {
    "use strict";

    return Controller.extend("com.app.yardmanagement.controller.Entrance", {

        onInit: function () {
            var oModel = new JSONModel(sap.ui.require.toUrl("com/app/yardmanagement/model/data.json"));
            this.getView().setModel(oModel);
            this._setToggleButtonTooltip(!Device.system.desktop);
        },

        onItemSelect: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
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

        onSaveDialog: function () {
            var oView = this.getView();
            var oDialog = this.byId("addDialog");
        
            var sSlotNo = oView.byId("inputSlotNo").getValue().trim(); // Trim whitespace
            var sType = oView.byId("inputType").getSelectedItem().getKey();
        
            // Validate slot number format (case insensitive and maximum 4 characters)
            if (!sSlotNo || !/^s.{0,3}$/i.test(sSlotNo)) {
                MessageBox.error("Slot no must start with 'S' and have a maximum of 4 characters.");
                return;
            }
        
            // Check if the slot number already exists
            var oModel = this.getView().getModel();
            var aData = oModel.getProperty("/rows");
        
            var existingSlot = aData.find(function (slot) {
                return slot.slotno.toLowerCase() === sSlotNo.toLowerCase();
            });
        
            if (existingSlot) {
                MessageBox.error("Slot no already exists. Please enter a different slot number.");
                return;
            }
        
            // Add the new slot to the data
            aData.push({
                slotno: sSlotNo,
                type: sType
            });
        
            oModel.setProperty("/rows", aData);
        
            oDialog.close();
        },
        

    });
});

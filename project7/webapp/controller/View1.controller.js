sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
	"use strict";

	return Controller.extend("project7.controller.View1", {
		onInit: function () {            
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var oModel = new JSONModel("products.json");
			this.getView().setModel(oModel);
        },
        
		getPage : function() {
			return this.byId("dynamicPageId");
        },
        
		onToggleFooter: function () {
			this.getPage().setShowFooter(!this.getPage().getShowFooter());
        },
        
		onGenericTagPress: function (oEvent) {
			var oView = this.getView(),
				oSourceControl = oEvent.getSource();
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: "project7.view.Card"
				}).then(function (oPopover) {
					oView.addDependent(oPopover);
					return oPopover;
				});
			}

			this._pPopover.then(function (oPopover) {
				oPopover.openBy(oSourceControl);
			});
		}
	});
});
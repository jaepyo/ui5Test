sap.ui.define([
   "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
   "sap/m/MessageToast",
    "sap/ui/core/Fragment",

], function (Controller, JSONModel, MessageToast, Fragment) {
   "use strict";
   return Controller.extend("project4.controller.HelloPanel", {
        onInit: function () {

			// set explored app's demo model on this sample
			var oModel1= new JSONModel("CoutriesExtendedCollection.json");
			this.getView().setModel(oModel1);
		},

      onShowHello : function () {
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
         var sMsg = oBundle.getText("helloMsg", [sRecipient]);
         // show message
         MessageToast.show(sMsg);
      },
//       onOpenDialo에서 이 문장 뺐다.
// syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
		onOpenDialog : function () {
			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
                    name: "project4.view.HelloDialog"
                    				}).then(function (oDialog){
					// forward compact/cozy style into dialog
					
					return oDialog;
				}.bind(this));
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
        },
        
		onCloseDialog : function () {
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("helloDialog").close();
        },

        onAvatarPressed: function () {
			MessageToast.show("Avatar pressed!");
		}
   });
});
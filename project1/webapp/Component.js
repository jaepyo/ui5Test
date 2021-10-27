sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
   "use strict";
   return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
      metadata : {
		rootView: {
			"viewName": "sap.ui.demo.walkthrough.view.View1",
			"type": "XML",
			"async": true,
			"id": "app"
		}
	},
      init : function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);

         // set data model
         var oData = {
            recipient : { name : "World" }
         };

         // 이름있는 모델 사용
         var oModel = new JSONModel(oData);
         this.setModel(oModel, "model1");

         // set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "sap.ui.demo.walkthrough.i18n.i18n"
         });
         this.setModel(i18nModel, "i18n");
      }
   });
});

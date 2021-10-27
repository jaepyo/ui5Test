sap.ui.require([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
	"use strict";

	// Attach an anonymous function to the SAPUI5 'init' event
	sap.ui.getCore().attachInit(function () {

		var oProductModel = new JSONModel();
		oProductModel.loadData("./model/Products.json");
		sap.ui.getCore().setModel(oProductModel, "products");

        // Create a JSON model from an object literal
		var oModel = new JSONModel({
            firstName: "Jaepyo",
			lastName: "So",
			enabled: true,
			address: {
				street: "Yeonse-ro",
				city: "Seoul",
				zip: "16523",
				country: "Repulbic of Korea"
			},
            salesAmount: 100.5,
            priceThreshold: 20,
			currencyCode: "KRW"
		});
            
		// Assign the model object to the SAPUI5 core
		sap.ui.getCore().setModel(oModel);

		var oResourceModel = new ResourceModel({
			bundleName: "project5.i18n.i18n",
			supportedLocales: ["", "de"],
			fallbackLocale: ""
		});

		// Assign the model object to the SAPUI5 core using the name "i18n"
		sap.ui.getCore().setModel(oResourceModel, "i18n");

		// Display the XML view called "App"
		var oView = new XMLView({
			viewName: "project5.view.App"
        });
        
        // Register the view with the message manager
        sap.ui.getCore().getMessageManager().registerObject(oView, true);
        
        // Insert the view into the DOM
		oView.placeAt("content");
    });
});
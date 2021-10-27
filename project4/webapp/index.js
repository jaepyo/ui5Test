sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "project4",
		settings : {
			id : "project4"
		},
		async: true
	}).placeAt("content");
});
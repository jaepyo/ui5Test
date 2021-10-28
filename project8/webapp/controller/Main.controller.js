sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    'sap/ui/unified/DateRange', 
    'sap/ui/core/format/DateFormat', 
    'sap/ui/core/library',
    "sap/ui/vbm/AnalyticMap",
    "sap/ui/Device",
    "sap/m/MessageToast"   
], function (Controller, JSONModel, Fragment, DateRange, DateFormat, coreLibrary, AnalyticMap, Device, MessageToast) {
    "use strict";

	AnalyticMap.GeoJSONURL = "project8/L0.json";

    var CalendarType = coreLibrary.CalendarType;

	return Controller.extend("project8.controller.Main", {
        oFormatYyyymmdd: null,

		onInit: function () {
			var oModel = new JSONModel("products.json");
            this.getView().setModel(oModel);
            
            this.oFormatYyyymmdd = DateFormat.getInstance({pattern: "yyyy-MM-dd", CalendarType: CalendarType.Islamic});

            // set the device model
			var oDeviceModel1 = new JSONModel(Device);
			oDeviceModel1.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel1, "device");
        },
        // map
        	onPressResize: function() {
if (this.byId("btnResize").getTooltip() == "Minimize") {
				if (Device.system.phone) {
					this.byId("vbi").minimize(132, 56, 1320, 560);// Height: 3,5 rem; Width: 8,25 rem
				} else {
					this.byId("vbi").minimize(168, 72, 1680, 720);// Height: 4,5 rem; Width: 10,5 rem
				}
				this.byId("btnResize").setTooltip("Maximize");
			} else {
				this.byId("vbi").maximize();
				this.byId("btnResize").setTooltip("Minimize");
			}
		},

		onRegionClick: function(e) {
			MessageToast.show("onRegionClick " + e.getParameter("code"));
		},

		onRegionContextMenu: function(e) {
			MessageToast.show("onRegionContextMenu " + e.getParameter("code"));
        },
        // page layout
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
					name: "project8.view.Card"
				}).then(function (oPopover) {
					oView.addDependent(oPopover);
					return oPopover;
				});
			}

			this._pPopover.then(function (oPopover) {
				oPopover.openBy(oSourceControl);
			});
        },
        // Calendar
        handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.getSource();

			this._updateText(oCalendar);
		},

		_updateText: function(oCalendar) {
			var oText = this.byId("selectedDate"),
				aSelectedDates = oCalendar.getSelectedDates(),
				oDate = aSelectedDates[0].getStartDate();

			oText.setText(this.oFormatYyyymmdd.format(oDate));
		},

		handleSelectToday: function() {
			var oCalendar = this.byId("calendar");

			oCalendar.removeAllSelectedDates();
			oCalendar.addSelectedDate(new DateRange({startDate: new Date()}));
			this._updateText(oCalendar);
		}
	});
});
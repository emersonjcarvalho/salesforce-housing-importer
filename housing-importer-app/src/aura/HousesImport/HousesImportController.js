({
	doInit : function(component, event, helper) {		
		helper.loadWebsiteOptions(component);
	},
    
    importHousesData : function(component, event, helper){          
        helper.loadHouseTableColumns(component);
        helper.getData(component, helper);        
        component.set("v.listHousesVisible", true);
    }
})
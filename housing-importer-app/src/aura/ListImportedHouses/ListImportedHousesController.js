({ 
    handleSelectedRowsEvent : function(component, event) {
        var selectedRows = event.getParam("selectedRowsEventAttribute");                              
        component.set("v.selectedRows", selectedRows);                
    },
        
    saveSelectedHouses : function(component, event, helper) {                    
            helper.saveHouseList(component, helper);       
    }
})
({
    getSelectedRows: function (component, event) {        
        var selectedRows = event.getParam('selectedRows');               
        var selectedRowsEvent = component.getEvent("dtSelectedRowsEventCmp");       
        selectedRowsEvent.setParams({"selectedRowsEventAttribute" : selectedRows});
        selectedRowsEvent.fire();                
    }
})
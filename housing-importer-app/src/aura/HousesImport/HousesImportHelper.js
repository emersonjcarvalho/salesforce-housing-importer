({    
    loadWebsiteOptions : function(component){
        var options = [
            { value: "Craigslist", label: "Craigslist" },
            { value: "Kijiji", label: "Kijiji" },
            { value: "MercadoLibre", label: "MercadoLibre" }
        ];
        component.set("v.websiteOptions", options);
    }, 
    
    loadHouseTableColumns : function(component) {
        var tableColumns = [
            {label: 'Location', fieldName: 'Location__c', type: 'text'},            
            {label: 'Description', fieldName: 'Name', type: 'text'},
            {label: 'Size', fieldName: 'Size__c', type: 'text'},
            {label: 'Price', fieldName: 'Price__c', type: 'currency', typeAttributes: { currencyCode: 'CAD'}},                        
            {label: 'URL', fieldName: 'PostUrl__c', type: 'url'}
        ];        
        component.set('v.columns', tableColumns);
    },
    
    getData : function(component, helper) {
        var location = component.find("location").get("v.value");         
        var website = component.get('v.websiteSelectedValue');
                                
        var action = component.get('c.getHousesData');        
        action.setParams({location:location, website:website});
        
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {                                
                handleSuccess(response);
            } else {
                handleError(response, helper);
            }
        });
        
        function handleSuccess(response){            
            component.set('v.data', response.getReturnValue());                       
        }
        
        function handleError(response, helper){
            var errorMessage = 'Unknown error';
            
            var errors = response.getError();
            if (errors && Array.isArray(errors) && errors.length > 0) {
                errorMessage = errors[0].message;
            }            
            console.error(errorMessage);
            helper.showMessage(component, errorMessage, 'error');                       
        }
        
        $A.enqueueAction(action);
    }, 
    
    showMessage : function(component, message, severity) {
        component.find('messageContainer').set('v.message', message); 
        component.find('messageContainer').set('v.severity', severity); 
        component.find('messageContainer').set('v.hasErrors', true);        		        
    }                
})
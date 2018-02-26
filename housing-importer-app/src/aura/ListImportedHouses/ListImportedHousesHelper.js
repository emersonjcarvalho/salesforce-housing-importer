({             
    saveHouseList : function(component, helper){
        var selectedHouses = JSON.stringify(component.get('v.selectedRows'));        
        var action = component.get("c.saveHouses");
        action.setParams({housesJSON:selectedHouses});
        
        action.setCallback(this, function(response) {                                                     
            var state = response.getState();
            
            if (state === "SUCCESS") {                 
                handleSuccess(response, helper);                
            }  else {                 
                handleError(response, helper);
            } 
        });
        
        function handleSuccess(response, helper){ 
            var message = response.getReturnValue().length + " item(s) saved";
            helper.showMessage(component, message, 'confirm');
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
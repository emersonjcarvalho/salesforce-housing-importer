public class HousesImportController {
    
    private static final String ENDPOINT = 'https://serene-crag-83319.herokuapp.com/houses';   
    private static final String ERROR_LIST_EMPTY = 'List is empty';
    private static final String ERROR_FAIL_ACCESS_HEROKU = 'Failed trying access Heroku App';
    private static final String ERROR_INVALID_PARAMETER = 'Invalid Parameter(s)';
    
    @AuraEnabled
    public static List<House__c> saveHouses(String housesJSON){  
            
        List<House__c> housesResult = null;
        try {            
            List<House__c> houses = parseList(housesJSON);
            
            if(houses == null || houses.isEmpty()){
                System.debug('houses == null'); 
                throw new JSONException(ERROR_LIST_EMPTY); 
            }
            
            insert houses;            
            housesResult = new List<House__c>(houses);
            
        }catch (Exception e) {        
            throw new AuraHandledException(e.getMessage());    
        }                
        return housesResult;
    }
    
    @AuraEnabled
    public static List<House__c> getHousesData(String location, String website) {        
        List<House__c> houses = null;
        
        try{                
            if(String.isBlank(location) || String.isBlank(website)){
                // should be InvalidParameterValueException but for some reason doenst work
                throw new StringException(ERROR_INVALID_PARAMETER);
            }
            
            String queryUrl = ENDPOINT + '?location='+Location;
            
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(queryUrl);
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            
            if(response.getStatusCode() != 200){          	        	        	                                                            
                throw new CalloutException(ERROR_FAIL_ACCESS_HEROKU);                
            }            
            houses = parseList(response.getBody());                        
        }catch (Exception e) {        
            throw new AuraHandledException(e.getMessage());    
        }        
        return houses;           
    }
    
    public static List<House__c> parseList(String json) {
        return (List<House__c>) System.JSON.deserialize(json, List<House__c>.class);
    }            
}
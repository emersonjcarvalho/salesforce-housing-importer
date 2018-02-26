@isTest
private class HouseImportCalloutTest {
            
    @isTest static void testGetHousesData() {
        
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        
        mock.setStaticResource('housesJSONResource');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json');
        
        Test.setMock(HttpCalloutMock.class, mock);
        
        String location = 'burnaby'; 
        String website = 'Craigslist';
        
        List<House__c> houses = HousesImportController.getHousesData(location, website);                
                        
        System.assert(houses.size() > 2,
          'The array size should be greater that 2 items.');          
    }   

    //TODO Test case for Exceptions and Validations
}
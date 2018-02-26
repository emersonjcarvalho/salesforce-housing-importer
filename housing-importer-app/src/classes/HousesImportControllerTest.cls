@isTest
private class HousesImportControllerTest {
    
    static String housesJSONTest = getJSONTest();
    
    @isTest static void testSaveHouses() {                             
        Test.startTest();          
        //TODO Try use (database.saveresult result = Database.insert) to check the Database          
        List<House__c> houses = HousesImportController.saveHouses(housesJSONTest).clone();                    
        Test.stopTest();
        
        System.assertEquals(houses.size(), 3, 'List should have 3 items');
    }        
 
    @isTest static void testParseList(){
        List<House__c> expectedHouses = TestDataFactory.createHousesIncremental(3);
        List<House__c> houses = HousesImportController.parseList(housesJSONTest);
        System.assertEquals(houses.size(), 3, 'List should have 3 items');
    }
    
    private static String getJSONTest(){
        //TODO Change to get from static resource
        return '[{"Location__c":"Test Location 0","Name":"Test House Name 0","Size__c":"0 sqft","Price__c":0,"PostUrl__c":"https://developer.salesforce.com/0"},{"Location__c":"Test Location 1","Name":"Test House Name 1","Size__c":"1 sqft","Price__c":1,"PostUrl__c":"https://developer.salesforce.com/1"},{"Location__c":"Test Location 2","Name":"Test House Name 2","Size__c":"2 sqft","Price__c":2,"PostUrl__c":"https://developer.salesforce.com/2"}]';
    }
}
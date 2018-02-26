@isTest
public class TestDataFactory {
    public static List<House__c> createHousesIncremental(Integer numHouses) {
        List<House__c> houses = new List<House__c>();
                
        for(Integer i=0;i<numHouses;i++) {
            House__c h = new House__c();
            h.Name = 'Test House Name ' + i;
            h.Location__c = 'Test Location ' + i;
            h.Price__c = i;
            h.Size__c = i + ' sqft';
            h.PostUrl__c = 'https://developer.salesforce.com/' + i;
            
            houses.add(h);
        }
        
        insert houses;
        
        return houses;
    }
}
pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;
contract Car{ 
    struct AccidentDetails{
        uint timestamp;
        uint accidentId;
        
        uint carId;
        string issue;
    }
   
    mapping (uint => AccidentDetails) public acc;
    
    // event1: check enroll status
    event logAcciAddedStatus(bool status, uint timestamp, uint accidentId);
    //event2: get All of CarDetails
    event logGetAllOfAccidentIds(uint amount);
    
    //owner set with timestamp of block 
    function enroll_carId(uint _accidentId, uint _carId) public {
        if(acc[_accidentId].carId == 0){
            acc[_accidentId].accidentId = _accidentId;
            acc[_accidentId].carId = _carId;
            logAcciAddedStatus(true, block.timestamp, _accidentId);            
        }else{ 
            logAcciAddedStatus(false, block.timestamp, _accidentId); 
        } 
    }
    function enroll_issue(uint _accidentId, string _issue) public {
        if(acc[_accidentId].timestamp == 0){
            acc[_accidentId].issue = _issue;
            acc[_accidentId].timestamp = block.timestamp;
            logAcciAddedStatus(true, block.timestamp, _accidentId);            
        }else{ 
            logAcciAddedStatus(false, block.timestamp, _accidentId); 
        } 
    }
    
    
    // get CarDetails.accident by carId
    function getInfo(uint _accidentId) public view returns (uint, uint, string) {
        return (acc[_accidentId].accidentId, acc[_accidentId].carId, acc[_accidentId].issue);
    }
}
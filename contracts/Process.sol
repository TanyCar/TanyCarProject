pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;
contract Process{ 
    struct Renting{ 
        uint timestamp;
        uint proId;
        uint carId;
        uint userId;
        
        uint amount;
        uint8 rentTime;
        uint retLocation;
        uint[] pictureHash;
    }
   
    mapping (uint => Renting) renting;
    
    // event1: check Rent Process status
    event logRentProcessStatus(bool status, uint timestamp, uint carId);
    //event2: get All of CarDetails
    event logUseProcessStatus(bool status, uint proId, uint userId);
    //event3: get All of CarDetails
    event logTurnInProcessStatus(bool status, uint proId, uint userId);
    
    // Process of rent car
    function rent(uint _carId, uint _userId, uint8 _rentTime, uint _retLocation) returns (uint) {
        uint _proId = block.timestamp + _carId + _userId;
        if(renting[_proId].timestamp == 0){
            renting[_proId].proId = _proId;
            renting[_proId].carId = _carId;
            renting[_proId].userId = _userId;
            renting[_proId].timestamp = block.timestamp;
            renting[_proId].rentTime = _rentTime;
            renting[_proId].retLocation = _retLocation;
            logRentProcessStatus(true, block.timestamp, _proId); 
            return _proId;
        }
        else logRentProcessStatus(false, block.timestamp, _proId);
        return 1;
    }
    
    // Process of use car
    function useCar(uint _proId, uint _userId, uint _pictureHash) public {
        if (renting[_proId].userId == _userId){
            renting[_proId].pictureHash.push(_pictureHash);
            logUseProcessStatus(true, _proId, _userId);
        } 
        else logUseProcessStatus(false, _proId, _userId);
    }
    
    // Process of return car
    function turnIn(uint _userId, uint _proId, uint _retLocation, uint _pictureHash) public {
        if (renting[_proId].userId == _userId){
            if(renting[_proId].retLocation == _retLocation){
                renting[_proId].pictureHash.push(_pictureHash);
                logTurnInProcessStatus(true, _proId, _userId);
            } 
            else logTurnInProcessStatus(false, _proId, _userId);
        } 
        else logTurnInProcessStatus(false, _proId, _userId);
    }

    // get CarDetails.accident by carId
    function get(uint _proId) returns (uint, uint, uint, uint, uint8, uint, uint[]){
        return (renting[_proId].proId, renting[_proId].carId, renting[_proId].userId,
            renting[_proId].timestamp, renting[_proId].rentTime, renting[_proId].retLocation, renting[_proId].pictureHash); 
    }

    
}
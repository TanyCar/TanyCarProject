pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;
contract Car{ 
    struct CarDetails{
        uint timestamp;
        uint carId;
        
        string carName;
        uint carType;
        string company;
        uint fee;
        
        uint pnum;
        uint vmile;
        string fuel;
        string changeType;
        string purchaseTime;
        uint efficiency;
        
    }
   
    mapping (uint => CarDetails) public cars;
    
    // event1: check enroll status
    event logCarAddedStatus(bool status, uint timestamp, uint carId);
    //event2: get All of CarDetails
    event logGetAllOfCars(uint amount);
    
    //owner set with timestamp of block 
    function enroll_carName(uint _carId, string _carName) public {
        if(cars[_carId].timestamp == 0){
            cars[_carId].carId = _carId;
            cars[_carId].carName = _carName;
            cars[_carId].timestamp = block.timestamp;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_carType(uint _carId, uint _carType) public {
        if(cars[_carId].carType == 0){
            cars[_carId].carType = _carType;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_company(uint _carId, string _company) public {
        if(cars[_carId].fee == 0){
            cars[_carId].company = _company;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_fee(uint _carId, uint _fee) public {
        if(cars[_carId].fee == 0){
            cars[_carId].fee = _fee;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    } 
    function enroll_pnum(uint _carId, uint _pnum) public {
        if(cars[_carId].pnum == 0){
            cars[_carId].pnum = _pnum;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_vmile(uint _carId, uint _vmile) public {
        if(cars[_carId].vmile == 0){
            cars[_carId].vmile = _vmile;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_fuel(uint _carId, string _fuel) public {
        if(cars[_carId].efficiency == 0){
            cars[_carId].fuel = _fuel;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_changeType(uint _carId, string _changeType) public {
        if(cars[_carId].efficiency == 0){
            cars[_carId].changeType = _changeType;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_purchaseTime(uint _carId, string _purchaseTime) public {
        if(cars[_carId].efficiency == 0){
            cars[_carId].purchaseTime = _purchaseTime;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    function enroll_efficiency(uint _carId, uint _efficiency) public {
        if(cars[_carId].efficiency == 0){
            cars[_carId].efficiency = _efficiency;
            logCarAddedStatus(true, block.timestamp, _carId);            
        }else{ 
            logCarAddedStatus(false, block.timestamp, _carId); 
        } 
    }
    
    
    
    // get All of CarDetails
    function getAll(uint amount) {
        logGetAllOfCars(amount);
    }
    
    
    // get CarDetails.accident by carId
    function get(uint _Id) public returns (CarDetails) {
        return (cars[_Id]);
    }
    
    // get CarDetails.accident by carId
    function getInfoA(uint _carId) public view returns (uint, string, uint, string, uint) {
        return (cars[_carId].carId, cars[_carId].carName, cars[_carId].carType, cars[_carId].company, cars[_carId].fee);
    }
    function getInfoB(uint _carId) public view returns (uint, uint, string, uint, string, string) {
        return (cars[_carId].pnum, cars[_carId].vmile, cars[_carId].fuel, cars[_carId].efficiency, cars[_carId].changeType, cars[_carId].purchaseTime);
    }

}
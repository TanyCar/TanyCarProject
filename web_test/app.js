var express = require("express");  
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(8080);

app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
})

var Web3 = require("web3");

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));	
var carContract = web3.eth.contract([
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "status",
          "type": "bool"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "carId",
          "type": "uint256"
        }
      ],
      "name": "logCarAddedStatus",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "logGetAllOfCars",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_Id",
          "type": "uint256"
        },
        {
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "enroll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "getAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_Id",
          "type": "uint256"
        }
      ],
      "name": "get",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string[]"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_Id",
          "type": "uint256"
        },
        {
          "name": "_issue",
          "type": "string"
        }
      ],
      "name": "addAccident",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]);
var car = carContract.at("0xb7e33feca318f975ec002d788e39d8355a7cc396");

app.get("/enroll", function(req, res){
	var id = req.query.id;
    var name = req.query.name;

    car.enroll.sendTransaction(id, name, {
		from: web3.eth.accounts[0],
	}, function(error, transactionHash){
		if (!error)
		{
			res.send(transactionHash);
		}
		else
		{
			res.send("Error");
		}
	})
})

app.get("/add_acc", function(req, res){
	var id = req.query.id;
    var accident = req.query.accident;

   
	car.addAccident.sendTransaction(id, accident, {
		from: web3.eth.accounts[0],
	}, function(error, transactionHash){
		if (!error)
		{
			res.send(transactionHash);
		}
		else
		{
			res.send("Error");
		}
	})
    
})

app.get("/getInfo", function(req, res){
	var id = req.query.id;

	var details = car.get.call(id);

	res.send(details);
})

car.logCarAddedStatus().watch(function(error, result){
	if(!error)
	{
		if(result.args.status == true)
		{
			io.send(result);
		}
	}
})

car.logGetAllOfCars().watch(function(error, result){
	if(!error)
	{
		if(result.args.status == true)
		{
			io.send(result);
		}
	}
})


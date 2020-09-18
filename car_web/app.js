var fs=require('fs');
var ejs=require('ejs');
var express = require("express");
var session = require('express-session');
var bodyParser=require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
var mysql=require('mysql');
var app = express();  
var server = require("http").createServer(app);
var bodyParser=require('body-parser');
//var io = require("socket.io")(server);

server.listen(52273);

//데이터베이스 연결
var client=mysql.createConnection({
    user: 'root',
    password: '1111',
    database: 'tany'
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');
app.set('views', 'public/html');

app.use(session({
   secret: 'keyboard cat', //keboard cat (랜덤한 값)
   resave: false,
   saveUninitialized: false
}));

app.get("/", function(request, response){
       fs.readFile('public/html/index1.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID="kkk"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
})

app.get('/index1.ejs', function(request, response) {   
        var memID=request.session.memID;
        fs.readFile('public/html/index1.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID=1234',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.get('/index.ejs', function(request, response) {   
        var memID=request.session.memID;
        fs.readFile('public/html/index.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID=?',memID,function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

//라우트를 수행합니다.
app.get('/login.ejs',function(request,response) { 
    //파일을 읽습니다.
    fs.readFile('public/html/login.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID="kkk"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.post('/login.ejs',function(request,response) {
    //변수를 선언합니다.
    memID=request.body.memID;
    PW=request.body.PW;
    //파일을 읽습니다.
    fs.readFile('/public/html/login.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 시작합니다.
        client.query('SELECT * FROM member_tb WHERE memID=?', memID , function(error,results){
            if(error){
            } else {
                if (results.length==0) {
                    response.send('<script type="text/javascript"> alert("아이디 혹은 비밀번호가 옳지 않습니다."); history.go(-1); </script>');
                } else {

                    if(results[0].PW != PW) {
                        response.send('<script type="text/javascript"> alert("아이디 혹은 비밀번호가 옳지 않습니다."); history.go(-1); </script>');
                    } else {
                        request.session.memID = results[0].memID;
                        request.session.save(function() {
                            return response.redirect('/index.ejs');
                        });
                        
                  /*      response.send(ejs.render(data,{
                        data:results
                        })); */
                        
                    }
                }
            }
            
        });
    });
});

app.get('/car_enroll.ejs',function(request,response) { 
    var memID=request.session.memID;
        fs.readFile('public/html/car_enroll.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID=?',memID,function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});
/***** 지원추가5 *****/
app.get('/car_enroll_onlyDB.ejs',function(request,response) { 
    var memID=request.session.memID;
        fs.readFile('public/html/car_enroll_onlyDB.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID=?',memID,function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});
/***** 여기까지 *****/
app.get('/accident_enroll.ejs',function(request,response) { 
    var memID=request.session.memID;
        fs.readFile('public/html/accident_enroll.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID=?',memID,function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.get('/accident_confirm.ejs',function(request,response) { 
    var memID=request.session.memID;
        fs.readFile('public/html/accident_confirm.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID=?',memID,function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.get('/detail.ejs',function(request,response) { 
    var memID=request.session.memID;
    //파일을 읽습니다.
    fs.readFile('public/html/detail.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
            client.query('SELECT * FROM member_tb WHERE memID=?',memID,function(error,results){
                results[0].memID=memID;
                response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.get('/block_detail.ejs',function(request,response) { 
    var memID=request.session.memID;
    //파일을 읽습니다.
    fs.readFile('public/html/block_detail.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
         client.query('SELECT * FROM member_tb WHERE memID=?',memID,function(error,results){
                results[0].memID=memID;
                response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.get('/join.ejs',function(request,response) { 
    //파일을 읽습니다.
    fs.readFile('public/html/join.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM member_tb WHERE memID="kkk"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});


app.get('/mypage.ejs',function(request,response) { 
    var memID=request.session.memID;
    //파일을 읽습니다.
    fs.readFile('public/html/mypage.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
            client.query('SELECT proID,userID,rentalPIC,returnPIC FROM user_rec_tb WHERE userID IN (SELECT userID FROM member_tb WHERE memID=?)',memID,function(error,results){
                if (results.length==0) {
                    response.send('<script type="text/javascript"> alert("거래내역이 없습니다."); history.go(-1); </script>');
                }
                else{
                results[0].memID=memID;
                response.send(ejs.render(data,{
                data:results
            }));
                }

        });
    });
});

app.get('/return_car.ejs',function(request,response) { 
    var memID=request.session.memID;
    //파일을 읽습니다.
    fs.readFile('public/html/return_car.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
            client.query('SELECT proID,userID,rentalPIC,returnPIC FROM user_rec_tb WHERE userID IN (SELECT userID FROM member_tb WHERE memID=?)',memID,function(error,results){
                results[0].memID=memID;
                response.send(ejs.render(data,{
                data:results
            }));
        });
    });
})

app.get('/use_car.ejs',function(request,response) { 
    var memID=request.session.memID;
    //파일을 읽습니다.
    fs.readFile('public/html/use_car.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
            client.query('SELECT proID,userID,rentalPIC,returnPIC FROM user_rec_tb WHERE userID IN (SELECT userID FROM member_tb WHERE memID=?)',memID,function(error,results){
                results[0].memID=memID;
                response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.get('/confirm.ejs',function(request,response) { 
    var memID=request.session.memID;
    //파일을 읽습니다.
    fs.readFile('public/html/confirm.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
            client.query('SELECT * FROM car_model_tb WHERE modelID=7002',function(error,results){
                results[0].memID=memID;
                response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.post('/confirm.ejs',function(request,response) { 
    var time=request.body.time;
    //파일을 읽습니다.
    fs.readFile('public/html/confirm.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM car_model_tb WHERE modelID=7002',function(error,results){
        //응답합니다.
            var price=(results[0].drivingFEE+results[0].rentalFEE)*time;
            results[0].price=price;
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});

app.get('/find_car.ejs',function(request,response) { 
        //파일을 읽습니다.
    var memID=request.session.memID;
    fs.readFile('public/html/find_car.ejs','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT carPIC FROM car_pic_tb',function(error,results){
        //응답합니다.
            results[0].carPIC1=results[0].carPIC;
            results[0].carPIC2=results[1].carPIC;
            results[0].carPIC3=results[2].carPIC;
            results[0].memID=request.session.memID;
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});


var Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));   
var carContract = web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "cars",
      "outputs": [
        {
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "name": "carId",
          "type": "uint256"
        },
        {
          "name": "carName",
          "type": "string"
        },
        {
          "name": "carType",
          "type": "uint256"
        },
        {
          "name": "company",
          "type": "string"
        },
        {
          "name": "fee",
          "type": "uint256"
        },
        {
          "name": "pnum",
          "type": "uint256"
        },
        {
          "name": "vmile",
          "type": "uint256"
        },
        {
          "name": "fuel",
          "type": "string"
        },
        {
          "name": "changeType",
          "type": "string"
        },
        {
          "name": "purchaseTime",
          "type": "string"
        },
        {
          "name": "efficiency",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
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
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_carName",
          "type": "string"
        }
      ],
      "name": "enroll_carName",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_carType",
          "type": "uint256"
        }
      ],
      "name": "enroll_carType",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_company",
          "type": "string"
        }
      ],
      "name": "enroll_company",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_fee",
          "type": "uint256"
        }
      ],
      "name": "enroll_fee",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_pnum",
          "type": "uint256"
        }
      ],
      "name": "enroll_pnum",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_vmile",
          "type": "uint256"
        }
      ],
      "name": "enroll_vmile",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_fuel",
          "type": "string"
        }
      ],
      "name": "enroll_fuel",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_changeType",
          "type": "string"
        }
      ],
      "name": "enroll_changeType",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_purchaseTime",
          "type": "string"
        }
      ],
      "name": "enroll_purchaseTime",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        },
        {
          "name": "_efficiency",
          "type": "uint256"
        }
      ],
      "name": "enroll_efficiency",
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
          "components": [
            {
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "name": "carId",
              "type": "uint256"
            },
            {
              "name": "carName",
              "type": "string"
            },
            {
              "name": "carType",
              "type": "uint256"
            },
            {
              "name": "company",
              "type": "string"
            },
            {
              "name": "fee",
              "type": "uint256"
            },
            {
              "name": "pnum",
              "type": "uint256"
            },
            {
              "name": "vmile",
              "type": "uint256"
            },
            {
              "name": "fuel",
              "type": "string"
            },
            {
              "name": "changeType",
              "type": "string"
            },
            {
              "name": "purchaseTime",
              "type": "string"
            },
            {
              "name": "efficiency",
              "type": "uint256"
            }
          ],
          "name": "",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        }
      ],
      "name": "getInfoA",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_carId",
          "type": "uint256"
        }
      ],
      "name": "getInfoB",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]);
var car = carContract.at("0x637279f7af5ef92f08b7b55dc78fba71f65a9e3d");

app.get("/enroll", function(req, res){
    var carId = req.query.carId;
    var carName = req.query.carName;
    var carType = req.query.carType;
    var company = req.query.company;
    var fee = req.query.fee;
    var pnum = req.query.pnum;
    var vmile = req.query.vmile;
    var fuel = req.query.fuel;
    var efficiency = req.query.efficiency;
    var changeType = req.query.changeType;
    var purchaseTime = req.query.purchaseTime;
    
    car.enroll_carName.sendTransaction(carId, carName, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_carType.sendTransaction(carId, carType, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_company.sendTransaction(carId, company, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_fee.sendTransaction(carId, fee, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
          car.enroll_pnum.sendTransaction(carId, pnum, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_fuel.sendTransaction(carId, fuel, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_vmile.sendTransaction(carId, vmile, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_purchaseTime.sendTransaction(carId, purchaseTime, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_changeType.sendTransaction(carId, changeType, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         car.enroll_efficiency.sendTransaction(carId, efficiency, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
         res.send(transactionHash);
      }
      else
      {
         res.send("Error enroll_efficiency");
      }
   })
      }
      else
      {
         res.send("Error enroll_changeType");
      }
   })
      }
      else
      {
         res.send("Error enroll_purchaseTime");
      }
   })
      }
      else
      {
         res.send("Error enroll_vmile");
      }
   })
      }
      else
      {
         res.send("Error enroll_fuel");
      }
   })
      }
      else
      {
         res.send("Error enroll_pnum");
      }
   })
      }
      else
      {
         res.send("Error enroll_fee");
      }
   })
      }
      else
      {
         res.send("Error enroll_company");
      }
   })
      }
      else
      {
         res.send("Error enroll_changeType");
      }
   })
      }
      else
      {
         res.send("Error enroll_carName");
      }
   })
})

/****** only DB 동작 코드 ******/
app.get("/enroll_onlyDB", function(req, res){
    var carId = req.query.carId;
    var carName = req.query.carName;
    var carType = req.query.carType;
    var company = req.query.company;
    var fee = req.query.fee;
    var pnum = req.query.pnum;
    var vmile = req.query.vmile;
    var fuel = req.query.fuel;
    var efficiency = req.query.efficiency;
    var changeType = req.query.changeType;
    var purchaseTime = req.query.purchaseTime;
    
    
    
   
})
// 여기까지 onlyDB


app.get("/getInfoA", function(req, res){
    var carId = req.query.carId;
    
    var detailsA = car.getInfoA.call(carId);

    res.send(detailsA);
})
app.get("/getInfoB", function(req, res){
    var carId = req.query.carId;
    
    var detailsB = car.getInfoB.call(carId);

    res.send(detailsB);
})

car.logCarAddedStatus().watch(function(error, result){
   if(!error)
   {
      if(result.args.status == true)
      {
         //io.send(result);
      }
   }
})

car.logGetAllOfCars().watch(function(error, result){
   if(!error)
   {
      if(result.args.status == true)
      {
         //io.send(result);
      }
   }
})

var carAccidentContract = web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "acc",
      "outputs": [
        {
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "name": "accidentId",
          "type": "uint256"
        },
        {
          "name": "carId",
          "type": "uint256"
        },
        {
          "name": "issue",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
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
          "name": "accidentId",
          "type": "uint256"
        }
      ],
      "name": "logAcciAddedStatus",
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
      "name": "logGetAllOfAccidentIds",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_accidentId",
          "type": "uint256"
        },
        {
          "name": "_carId",
          "type": "uint256"
        }
      ],
      "name": "enroll_carId",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_accidentId",
          "type": "uint256"
        },
        {
          "name": "_issue",
          "type": "string"
        }
      ],
      "name": "enroll_issue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_accidentId",
          "type": "uint256"
        }
      ],
      "name": "getInfo",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]);
var carAccident = carAccidentContract.at("0x11473f2b2660c34f4f58b6848dbdc1d1970965ce");

app.get("/add_acc", function(req, res){
   // var accidentId;// = req.query.accidentId;
    var carId = req.query.carId;
    var accident = req.query.accident;

                                   
    //데이터베이스 쿼리를 시작합니다.
    client.query('insert into accident_tb(carId) values(?)', carId , function(error,results){
            if(error){
                res.send("Error DB insert");
            } else {
                console.log("succes");
                //res.send("Error DB insert");
            }
        });
    
    //데이터베이스 쿼리를 시작합니다.
    client.query('select accidentId from accident_tb where carId=? order by accidentId desc', carId, function(error,results){
            if(error){  
                res.send("Error DB select accidentID");
                console.log("fail1");
            } else {
                var accidentId = results[0].accidentId;
                console.log("succes1");
                console.log(accidentId);
            }
        });
    
    
    carAccident.enroll_carId.sendTransaction(accidentId, carId, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
           console.log("fail2");
         carAccident.enroll_issue.sendTransaction(accidentId, accident, {
      from: web3.eth.accounts[0],
   }, function(error, transactionHash){
      if (!error)
      {
                    //데이터베이스 쿼리를 시작합니다.
                    client.query('update accident_tb set txAddress=? where accidentId=?', transactionHash, accidentId , function(error,results){
                        if(error){
                            console.log("fail2");
                            console.log(transactionHash);
                            res.send("Error DB update");
                        } else {
                            console.log("success2");
                            console.log(transactionHash);
                        }
                        });
                        res.send(transactionHash);
      }
      else
      {
          console.log("Error enroll_issue");
         res.send("Error enroll_efficiency");
      }
   })
      }
      else
      {
           console.log("Error enroll_carid");
         res.send("Error enroll_changeType");
      }
   })
    
    
});
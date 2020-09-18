//모듈 추출
var fs=require('fs');
var ejs=require('ejs');
var mysql=require('mysql');
var express=require('express');
var bodyParser=require('body-parser');

//데이터베이스 연결
var client=mysql.createConnection({
    user: 'root',
    password: 'autoset',
    database: 'tany'
});

//서버를 생성합니다.
var app=express();
app.use(bodyParser.urlencoded({
    extended: false
}));

//서버를 실행합니다.
app.listen(52273,function(){
    console.log('server running at http://127.0.0.1:52273');
});

//라우트를 수행합니다.
app.get('/',function(request,response) { 
    //파일을 읽습니다.
    fs.readFile('../html/list.html','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM car_model_tb WHERE model="yulim"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});
app.post('/',function(request,response) {
    //변수를 선언합니다.
    var body=request.body;
    //파일을 읽습니다.
    fs.readFile('../html/list.html','utf-8',function(error,data){
        //데이터베이스 쿼리를 시작합니다.
        client.query('SELECT * FROM car_model_tb WHERE model=?',body.model,function(error,results){
            //응답합니다.
            console.log(body.model);
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});
app.get('/detail.html',function(request,response) { 
    //파일을 읽습니다.
    fs.readFile('../html/detail.html','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM car_model_tb WHERE model="yulim"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});
app.get('/confirm.html',function(request,response) { 
        //파일을 읽습니다.
    fs.readFile('../html/confirm.html','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM car_model_tb WHERE model="yulim"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});
app.get('/index.html',function(request,response) { 
            //파일을 읽습니다.
    fs.readFile('../html/index.html','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM car_model_tb WHERE model="yulim"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});
app.get('/find_car.html',function(request,response) { 
                //파일을 읽습니다.
    fs.readFile('../html/find_car.html','utf-8',function(error,data){
        //데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM car_model_tb WHERE model="yulim"',function(error,results){
        //응답합니다.
            response.send(ejs.render(data,{
                data:results
            }));
        });
    });
});


function enroll()
{
   var carId = document.getElementById("carId").value;

   if(carId)
   {
        var carName = document.getElementById("carName").value;
        var carType = document.getElementById("carType").value;
        var company = document.getElementById("company").value;
        var fee = document.getElementById("fee").value;
        var pnum = document.getElementById("pnum").value;
        var vmile = document.getElementById("vmile").value;
        var fuel = document.getElementById("fuel").value;
        var efficiency = document.getElementById("efficiency").value;
        var changeType = document.getElementById("changeType").value;
        var purchaseTime = document.getElementById("purchaseTime").value;
        var op0 = document.getElementById("op0").value;
        var op1 = document.getElementById("op1").value;
        var op2 = document.getElementById("op2").value;
        var op3 = document.getElementById("op3").value;
        var op4 = document.getElementById("op4").value;
        var op5 = document.getElementById("op5").value;
        var op6 = document.getElementById("op6").value;

      if(carName == "")
      {
         alert("Please enter accident");
      }
      else
      {
          $.get("/enroll?carId=" + carId + "&carName=" + carName + "&carType=" + carType+ "&company=" + company+ "&fee=" + fee+ "&pnum=" + pnum+ "&vmile=" + vmile+ "&fuel=" + fuel+ "&efficiency=" + efficiency+ "&changeType=" + changeType+ "&purchaseTime=" + purchaseTime, function(data){
             if(data == "Error")
             {
                $("#message").text("An error occured.");
             }
             else
             {
                $("#message").html("Transaction hash: " + data);
             }
         });
      }
   }
   else
   {
      alert("Please enter a id");
   }
}


function add_acc()
{
   var carId = document.getElementById("carId").value;
   
   if(carId)
   {
      var accident = document.getElementById("accident").value;

      if(accident == "")
      {
         alert("Please enter accident");
      }
      else
      {
          $.get("/add_acc?carId=" + carId + "&accident=" + accident, function(data){
             if(data == "Error")
             {
                $("#message").text("An error occured.");
             }
             else
             {
                $("#message").html("Transaction hash: " + data);
                
             }
         });
      }
   }
   else
   {
      alert("Please select a file");
   }
}


function getInfo()
{
   var carId = document.getElementById("carId").value;

   if(carId)
   {
           $.get("/getInfoA?carId=" + carId, function(data){
              if(data[0] == "")
              {
                 $("#carName").html("File not found");
              }
              else
              {
                  $("#carName").html(data[1]);
                  $("#carType").html(data[2]);
                  $("#company").html(data[3]);
                  $("#fee").html(data[4]);
              }
          });
            $.get("/getInfoB?carId=" + carId, function(data){
              if(data[0] == "")
              {
                 $("#message2").html("File not found");
              }
              else
              {
                  $("#pnum").html(data[0]);
                  $("#vmile").html(data[1]);
                  $("#fuel").html(data[2]);
                  $("#efficiency").html(data[3]);
                  $("#changeType").html(data[4]);
                  $("#purchaseTime").html(data[5]);
              }
          });
   }
   else
   {
      alert("Please select a file");
   }
}

function enroll_onlyDB()
{
   var carId = document.getElementById("carId").value;

   if(carId)
   {
        var carName = document.getElementById("carName").value;
        var carType = document.getElementById("carType").value;
        var company = document.getElementById("company").value;
        var fee = document.getElementById("fee").value;
        var pnum = document.getElementById("pnum").value;
        var vmile = document.getElementById("vmile").value;
        var fuel = document.getElementById("fuel").value;
        var efficiency = document.getElementById("efficiency").value;
        var changeType = document.getElementById("changeType").value;
        var purchaseTime = document.getElementById("purchaseTime").value;
        var op0 = document.getElementById("op0").value;
        var op1 = document.getElementById("op1").value;
        var op2 = document.getElementById("op2").value;
        var op3 = document.getElementById("op3").value;
        var op4 = document.getElementById("op4").value;
        var op5 = document.getElementById("op5").value;
        var op6 = document.getElementById("op6").value;

      if(carName == "")
      {
         alert("Please enter accident");
      }
      else
      {
          $.get("/enroll_onlyDB?carId=" + carId + "&carName=" + carName + "&carType=" + carType+ "&company=" + company+ "&fee=" + fee+ "&pnum=" + pnum+ "&vmile=" + vmile+ "&fuel=" + fuel+ "&efficiency=" + efficiency+ "&changeType=" + changeType+ "&purchaseTime=" + purchaseTime, function(data){
             if(data == "Error")
             {
                $("#message").text("An error occured.");
             }
             else
             {
                $("#message").html("Transaction hash: " + data);
             }
         });
      }
   }
   else
   {
      alert("Please enter a id");
   }
}

/*var socket = io("http://localhost:8080");

socket.on("connect", function () {
   socket.on("message", function (msg) {
      if($("#events_list").text() == "No Transaction Found")
      {
         $("#events_list").html("<li>Txn Hash: " + msg.transactionHash + "\nId: " + msg.args.Id + "\ncarName: " + msg.args.carName + "\naccident: " + msg.args.accident + "</li>");
      }
      else 
      {
         $("#events_list").prepend("<li>Txn Hash: " + msg.transactionHash + "\nId: " + msg.args.Id + "\ncarName: " + msg.args.carName + "\naccident: " + msg.args.accident + "</li>");
      }
    });
});
*/
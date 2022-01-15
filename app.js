//jshint esversion: 6
const bodyParser=require('body-parser');
const express=require('express');
const request=require('request');
const https=require('https');

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extened: true}));
app.listen(process.env.PORT || 3000, function() {
  console.log('server is running on port 3000');
});
app.get('/', function(req, res) {
res.sendFile(__dirname + '/signup.html');
});
app.post('/', function(req, res) {
const firstName=req.body.fName;
const lastName=req.body.lName;
const emaIl=req.body.email;

const data = {
  members: [
    {
      email_address:emaIl,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
  }
]
};
app.post("/failure",function(req, res){
  res.redirect("/");
});
const JsonData =JSON.stringify(data);
const url="https://us20.api.mailchimp.com/3.0/lists/3c17f2091e";
const options = {
  method: "POST",
  auth: "Fraser1:f5c1f920abfd53b94edf1f89a32ee557-us20"
};
const request=https.request(url,options,function(response){
  if (response.statusCode===200) {
    res.sendFile(__dirname+"/success.html");
  }else
  {
    res.sendFile(__dirname+"/failure.html");
  }
response.on("data",function(data){
  console.log(JSON.parse(data));
});
});
request.write(JsonData);
request.end();
});
// api key
// f5c1f920abfd53b94edf1f89a32ee557-us20
// list id
// 3c17f2091e.

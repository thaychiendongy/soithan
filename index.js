const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,function () {
    console.log("server is running...");
});
app.use(express.static("public"));
// sử dụng ejs làm view engine
app.set("view engine","ejs");

var counter = 0;
app.get("/",function (req,res) {
    counter++;
    let city = req.query.cityname;
    if(city === undefined){
        city = "Hanoi,vietnam";
    }
    res.render("home",{
        counter: counter,
        city:city
    });
});

app.get("/about-us",function (req,res) {
    res.send("Gioi thieu ve chung toi");
});
const fs = require("fs");
app.get("/danh-sach-thanh-pho",function (req,res) {
    let data = fs.readFileSync("data/thanhpho.json","utf-8");
    let cities = JSON.parse(data);
    res.render("cities",{
        cities:cities
    })
});

app.get("/thanh-pho/:id",function (req,res) {
    let cityId = req.params.id;
    let city = {};
    let data = fs.readFileSync("data/thanhpho.json","utf-8");
    let cities = JSON.parse(data);
    cities.map(function (e) {
        if(e.id == cityId){
            city = e;
        }
    });
    res.render("city",{
        city:city
    });
});
app.get("/api/messages",function (req,res) {
   let data = [
       {
           msg: "Xin chao",
           name: "Luna"
       },
       {
           msg:"Hi",
           name:"Long"
       },
       {
           msg:"Di choi ko?",
           name:"Luna"
       }
   ];
   let rs = {
       status: true,
       message: "Success",
       data: data
   };
   res.send(rs);
});

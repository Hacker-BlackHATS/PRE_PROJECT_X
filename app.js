var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");


var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database: "mydatabase" // First create a database in MySQL
});

app.get("/", function(req, res){
	var q = "SELECT COUNT(*) AS COUNT FROM users";
	connection.query(q, function(error, results){
		if (error) throw error;
		var count = results[0].COUNT;
		res.render("Pre_web", {data: count});
	});
	console.log("[+] REQUESTED THE HOME ROUTE !");
});

app.post("/register", function(req, res){
	var person = {
		email: req.body.email
	};
	connection.query('INSERT INTO users SET ?', person, function(err, result){
		if (err) throw err;
		res.redirect("/");
		});
	console.log("[+] POST REQUEST SENT TO /REGISTER");
});

app.get("/courses", function(req, res){
	var message_ = "Comming soon..."
	res.render("courses", {msg: message_});
});

app.get("/contact_us", function(req, res){
	var message_ = "Comming soon..."
	res.render("contact_us", {msg: message_});
});

app.listen(8080, function(){
	console.log("SERVER RUNNING ON 8080 !!!");
});



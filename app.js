const express = require('express');
const app = express();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");

// const con = mysql.createPool({
// 	host: "localhost",
// 	user: "root",
// 	database: "delivery",
// 	password: "4556776"
// });

const con = mysql.createPool({
	host: "eu-cdbr-west-03.cleardb.net",
	user: "b392b77862e829",
	database: "heroku_4e8b3c63620b57c",
	password: "dfb5ebce"
});

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(process.env.PORT || 3000);

function mailSend(req) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.mail.ru',
		port: 465,
		secure: true,
		auth: {
		  user: "duck-mail@mail.ru", //заменить на своё
		  pass: "************" //заменить на своё
		}
	});
	//Отправка клиету
	transporter.sendMail({
		from: '"DUCK" <duck-mail@mail.ru>',
		to: req.body.email,
		subject: "Ваша заявка принята.",
		text: "Здраствуйте, " + req.body.name + ". Ваша заявка на обратный звонок обрабатывается. Пожалуйста, ожидайте."
	});
	//отправка оператору
	transporter.sendMail({
		from: '"DUCK" <duck-mail@mail.ru>',
		to: 'duck-mail@mail.ru',
		subject: "Новая заявка!!",
		text: "Заявка от " + req.body.name + ". Телефон: " + req.body.phone + "\nЭлектронная почта: " + req.body.email
	});
}

app.post("/cart-info", urlencodedParser, function(req, res){
	if(Object.keys(req.body).length != 0) {
		con.query(`select goods.key,name,price,image from goods where goods.key in (${Object.keys(req.body).join(',')})`, function(err, data) {
			if(err) return console.log(err);
			res.json(data);
		});
	} else {
		res.send('0');
	}
});

app.post("/like-info", urlencodedParser, function(req, res){
	if(Object.keys(req.body).length != 0) {
		con.query(`select goods.key,name,price,image,weight from goods where goods.key in (${Object.keys(req.body).join(',')})`, function(err, data) {
			if(err) return console.log(err);
			res.json(data);
		});
	} else {
		res.send('0');
	}
});

app.post("/*", urlencodedParser, function (request, response) {
	console.log("отправлено.");
	if(!request.body) return response.sendStatus(400);
	mailSend(request);
});

app.get('/', function(req, res) {
	res.render('index', {
		hh: ""
	});
});

app.get('/product/:key', function(req, res) {
	con.query("select * from goods where goods.key = " + req.params.key, function(err, data) {
		if(err) return console.log(err);
		res.render('product', {
			hh: "",
			goods: data
		});
	});
});

app.get('/food-stock/:food', function(req, res) {
	let sort;
	let span = "по популярности";
	switch(req.query.sort){ 
		case "price_asc":
			sort = " ORDER BY price ASC;"
			span = "по возрастанию цены";
			break;
		case "price_desc":
			sort = " ORDER BY price DESC;"
			span = "по убыванию цены";
			break;
		case "alph":
			sort = " ORDER BY name ASC;"
			span = "по алфавиту";
			break;
		default:
			sort = "";
	}
	con.query(`SELECT * FROM goods WHERE type = "${req.params.food}"` + sort, function(err, data) {
		if(err) return console.log(err);
		let hh = "";
		switch(req.params.food){
			case "pizza": 
				hh = "Пицца";
				break;
			case "sushi": 
				hh = "Суши";
				break;
			case "soups": 
				hh = "Супы";
				break;
			case "salad": 
				hh = "Салаты";
				break;
			case "sugar": 
				hh = "Десерты";
				break;
			case "drink": 
				hh = "Напитки";
				break;	
		}
		res.render("food", {
			span: span,
			hh: hh,
			goods: data
		});
	});
});
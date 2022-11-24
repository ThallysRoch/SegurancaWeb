const express = require('express');
const session = require('express-session');
const { connect } = require('http2');
const path = require('path');

const db = require("./db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', async function(request, response) {
	// Capture the input fields
	//console.log(request.body)
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	//if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
	const retorno = await db.selectCustomers(username, password)
	console.log(retorno);
	if (retorno.length > 0) {
		response.send('Login efetuado com sucesso!');
	} else {
		response.send('Incorrect Username and/or Password!');
	}
	});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	//if (request.session.loggedin) {
		// Output username
	//response.sendFile(path.join(__dirname + '/homepage.html'));
	response.sendFile(path.join(__dirname + '/homepage.html'));
	//} else {
		// Not logged in
		//response.send('Please login to view this page!');
	//}
	response.end();
});

app.listen(3000);
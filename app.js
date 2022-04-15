/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// static css directory
app.use("/css", express.static(path.join(__dirname, '/pub/css')))

// static js directory
app.use("/scripts", express.static(path.join(__dirname, '/pub/scripts')))

// Routes vvv
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/index.html'))
})

app.get('/index.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/index.html'))
})

app.get('/examples.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/examples.html'))
})

app.get('/documentation.html', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/documentation.html'))
})

// End of Routes ^^^

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
const express = require("express")
const session = require('express-session')
const db = require('./db-connection')
const body_parser = require('body-parser')
const routes = require('./Routes')
const cors = require('cors')
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.static(`${__dirname}/upload`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use('/', routes)

app.listen(3001, () => {
    console.log("Server is Running at port 3001");
})
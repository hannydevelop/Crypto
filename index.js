const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const Usercontroller = require('./controllers/Usercontroller');

var app = express();

app.get("/", (req, res) => {
    res.render("home"); 
});

app.get("/login", (req, res) => {
    res.render("login"); 
});

app.get("/register", (req, res) => {
    res.render("register");
});


const { mong } = require('./db.js');

app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => console.log('server started successfully at port : 3000'));

app.use('/', Usercontroller);
const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const Usercontroller = require('./controllers/Usercontroller');


const { mong } = require('./db.js');


var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));





app.listen (3000, () => console.log('server started successfully at port : 3000'));
app.use('/users', Usercontroller);
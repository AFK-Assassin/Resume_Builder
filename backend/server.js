// server.js will hold only the server and things that works fully on the server
require('dotenv').config();
const app = require('./src/app');
const ConnectToDb = require('./src/config/database');



app.listen(3000,() =>{
    console.log ("server running in port 3000... ")
});
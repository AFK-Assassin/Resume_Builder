const mongoose = require('mongoose');

async function ConnectToDb() {

    try {
        await mongoose.connect(process.env.MONGO_URI);   
        console.log("Connected to DataBase...")    
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectToDb();
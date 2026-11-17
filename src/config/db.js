// 
const mongoose = require("mongoose");


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB", err.message);
        // Exit the process with failure
        process.exit(1);
    })

} 
// Connect to MongoDB
module.exports = connectToDB;
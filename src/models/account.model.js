const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true , "Account must be associated with a user"],
        // Create an index on the user field
        index: true
    },
    status:{
          type: String,
        enum: [ "ACTIVE" , "FROZEN" , "CLOSED"],
         message: "Status must be either ACTIVE , FROZEN or CLOSED",
         default: "ACTIVE",
        
    },
    

    currency:{
        type: String,
        required: [true , "Currency is required"],
        default: "INR"
    }
}, {
    timestamps: true
})
// Create a compound index on user and status
accountSchema.index({user: 1 , status:1})

const accountModel = mongoose.model("account" , accountSchema);

module.exports = accountModel;
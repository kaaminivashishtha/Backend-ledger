const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs"); // Importing bcryptjs for password hashing

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for creating an account"]
    },
    email: {
        type: String,
        // email field is required
        required: [true, "Email is required"],
        // trimming whitespace 
        trim: true,
         lowercase: true,
        // validating email format using regex
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"], 
        // ensuring email uniqueness
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6 , "password should be contain more than 6 characters"],
        select: false // Exclude password from query results by default 
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
}); 

// Pre-save middleware to hash the password before saving the user document

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return ;
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    



})
// Method to compare the provided password with the hashed password stored in the database

userSchema.methods.comparePassword = async function(Password){

    return await bcrypt.compare(Password, this.password);
}

const userModel= mongoose.model("user", userSchema);

module.exports = userModel;
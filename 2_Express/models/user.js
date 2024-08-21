const mongoose = require("mongoose")

//Schema using mongoose
const userSchema = new mongoose.Schema({
    first_name:{
      type: String,
      require: true,
    },
    last_name:{
      type: String,
    },
    email:{
      type: String,
      require: true,
      unique: true,
    },
    gender:{
      type: String,
      require: true,
    },
    jobTitle:{
      type: String,
    }
  },{timestamps: true} 
);

const User = mongoose.model("user", userSchema)
//default the collection name user become users 

module.exports = User;
const mongoose = require ('mongoose')
const Signup_Schema = mongoose.Schema({
    employeesId: {type:mongoose.Schema.Types.ObjectId, ref:'edit_employee',required:true},
    fullname: String,
    employeeid:Number,
    email:String,
    newpassword:String,
})
module.exports = mongoose.model("employees_signup",Signup_Schema)
const mongoose = require ('mongoose')

const AdminSignup_Schema = mongoose.Schema({
    fullname: String,
    employeeid: Number,
    email: String,
    newpassword: String
})
module.exports = mongoose.model("admin_signup",AdminSignup_Schema)
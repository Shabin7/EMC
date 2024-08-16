const mongoose = require('mongoose')
const HrSignup_Schema = mongoose.Schema({
    fullname: String,
    employeeid: Number,
    email: String,
    newpassword: String
})
module.exports = mongoose.model("hr_signup",HrSignup_Schema)

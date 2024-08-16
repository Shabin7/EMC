const mongoose = require('mongoose')
const Signup_Schema = require('./Signup_Schema.js')
const AddEmployee_Schema = mongoose.Schema({
    employee_name: String,
    employee_id: { type: Number, required: true, unique: true },
    date_of_birth: Date,
    designation: String,
    profile_picture: Object,
    date_of_joining: Date,
    house_number: Number,
    street_name: String,
    city: String,
    landmark: String,
    zip: Number,
    district: String,
    state: String,
    country: String,
    primary_phone: Number,
    secondary_phone: Number,
    email: { type: String, required: true, unique: true },
    pan_no: String,
    aadhar_no: Number,
    pf_no: String,
    bank: String,
    ifsc_code: String,
    account_no: Number,
    course: String,
    passout_year: Number,
    institute: String,
    course_1: String,
    passout_year_1: Number,
    institute_1: String,
    course_2: String,
    passout_year_2: Number,
    institute_2: String,
    casual_taken: { type: Number, default: 0 },
    sick_taken: { type: Number, default: 0 },
})
// Middleware to handle cascading delete
AddEmployee_Schema.pre('findOneAndDelete', async function (next) {
    const employeeId = this.getQuery()._id;
    // Delete associated signup data
    await Signup_Schema.findOneAndDelete({ employeesId: employeeId });
    next();
});
module.exports = mongoose.model("edit_employee", AddEmployee_Schema)
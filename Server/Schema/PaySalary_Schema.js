const mongoose = require('mongoose')
const PaySalary_Schema = mongoose.Schema({
    employeesId: {type:mongoose.Schema.Types.ObjectId, ref:'edit_employee',required:true},
    employee_name: String,
    employee_id: String,
    notes: String,
    date_of_payment: Date,
    pf_no: String,
    account_no: Number,
    bank_name: String,
    ifsc_code: String,
    totalWorkingDays: Number,
    leaves: Number,
    absent: Number,
    no_of_days_worked: Number,
    basicPay: Number,
    deductions: Number,
    additions: Number,
    netSalary: Number

})
module.exports = mongoose.model("pay_salary", PaySalary_Schema)

// Get Employee profile starts

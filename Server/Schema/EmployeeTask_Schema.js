const mongoose = require('mongoose')
const EmployeeTask_Schema = mongoose.Schema({
    employeesId: { type: mongoose.Types.ObjectId, ref: 'edit_employee', required: true },
    email: String,
    employee_name: String,
    heading: String,
    date_of_submission: Date,
    task_text: String,
    status: { type: String, default: 'pending' }
}, {
    timestamps: true,
}
)
module.exports = mongoose.model('employee_task', EmployeeTask_Schema)
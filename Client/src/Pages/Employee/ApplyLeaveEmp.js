// Employee leave request form
import React, { useEffect, useState } from 'react';
import Sidebar from '../../Component/Employee/Sidebar';
import Navbar from '../../Component/Employee/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../../Utils/Validation';


const ApplyLeaveEmp = () => {
    const [form, setForm] = useState({
        employee_name: '',
        employee_id: '',
        designation: '',
        from: '',
        to: '',
        typeOfLeave: '',
        reason: '',
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    useEffect(() => {
        axios
            .get('http://localhost:3001/employee/employeeprofile', { withCredentials: true })
            .then((res) => {
                setForm({ ...form, ...res.data })
            })
            .catch((err) => {
                console.log(err);
                alert('Something went wrong')
            })
    }, [])
    const handleOnChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const requiredFields = [
            'employee_name', 'employee_id', 'designation', 'from', 'to', 'typeOfLeave', 'reason',
        ];
        const errors = validateForm(form, requiredFields);
        setErrors(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }

        const days = (new Date(form.to) - new Date(form.from)) / (1000 * 60 * 60 * 24) + 1
        axios
            .post('http://localhost:3001/employee/leaveapply', form, { withCredentials: true })
            .then((res) => {
                console.log(res);
                alert('Leave Applied Successfully');
                axios
                    .post('http://localhost:3001/employee/updateLeaveBalance', {
                        employee_id: form.employee_id,
                        typeOfLeave: form.typeOfLeave,
                        days: days,
                    }, { withCredentials: true })
                    .then(() => {
                        navigate('/employee/calenderemployee')
                    })
            })
            .catch((err) => {
                console.log(err);
                alert('Something Went Wrong');
            })
    }

    return (
        <div className='d-flex bg-secondary-subtle' id='wrapper'>
            <Sidebar />
            <div className='w-100' id='page-content-wrapper'>
                <Navbar />
                <h3 className='my-4 mx-2 p-2 rounded text-center bg-white shadow'>Apply Leave</h3>
                <div className='container'>
                    <form className='row g-3' onSubmit={handleSubmit}>
                        <div className='col-md-4'>
                            <label htmlFor='employeename' className='form-label'>Employee Name</label>
                            <input className='form-control' id='employeename'
                                type='text'
                                name='employee_name'
                                value={form.employee_name}
                                onChange={handleOnChange}
                                readOnly
                            />
                            {errors.employee_name && <small className="text-danger">{errors.employee_name}</small>}
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='employeeid' className='form-label'>Employee ID</label>
                            <input className='form-control' id='employeeid'
                                type="number"
                                name='employee_id'
                                value={form.employee_id}
                                onChange={handleOnChange}
                                readOnly
                            />
                            {errors.employee_id && <small className="text-danger">{errors.employee_id}</small>}
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='designation' className='form-label'>Designation</label>
                            <input className='form-control' id='designation'
                                type='text'
                                name='designation'
                                value={form.designation}
                                onChange={handleOnChange}
                                readOnly
                            />
                            {errors.designation && <small className="text-danger">{errors.designation}</small>}
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='employeename' className='form-label'>From</label>
                            <input className='form-control' id='employeename'
                                type="date"
                                name='from'
                                value={form.from}
                                onChange={handleOnChange}
                            />
                            {errors.from && <small className="text-danger">{errors.from}</small>}
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='employeename' className='form-label'>To</label>
                            <input className='form-control' id='employeename'
                                type="date"
                                name='to'
                                value={form.to}
                                onChange={handleOnChange}
                            />
                            {errors.to && <small className="text-danger">{errors.to}</small>}
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor='typeofleave' className='form-label'>Type Of Leave</label>
                            <select className='form-select' aria-label='Default select example' id='typeofleave'
                                name='typeOfLeave'
                                value={form.typeOfLeave}
                                onChange={handleOnChange}
                            >
                                <option value='' disabled>Choose</option>
                                <option>Sick leave</option>
                                <option>Casual leave</option>
                                <option>Leave without pay</option>
                            </select>
                            {errors.typeOfLeave && <small className="text-danger">{errors.typeOfLeave}</small>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Reason</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                type='textarea'
                                name='reason'
                                value={form.reason}
                                onChange={handleOnChange}
                            ></textarea>
                            {errors.reason && <small className="text-danger">{errors.reason}</small>}
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary bg-success" ><i className="bi bi-upload"></i> Apply</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default ApplyLeaveEmp
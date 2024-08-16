import React, { useEffect, useState } from 'react'
import Navbar from '../../Component/Employee/Navbar';
import Sidebar from '../../Component/Employee/Sidebar';
import axios from 'axios';
import { validateForm } from '../../Utils/Validation';
import { useNavigate } from 'react-router-dom';

const EmployeeTickets = () => {
  const [form, setForm] = useState({
    employee_name: '',
    employee_id: '',
    subject: '',
    type: '',
    explain: ''
  })
  const [errors, setErrors] = useState({})
  const navigate =useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3001/employee/employeeprofile', { withCredentials: true })
      .then((res) => {
        setForm(res.data)
      })
      .catch((err) => {
        console.log(err);
        alert('Error in getting employee data')
      })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = () => {
    const requiredFields = [
      'employee_name', 'employee_id', 'subject', 'type', 'explain'
    ]
    const errors = validateForm(form, requiredFields)
    setErrors(errors)
    if (Object.keys(errors).length > 0) {
      return;
    }

    axios
      .post('http://localhost:3001/employee/tickets', form, { withCredentials: true })
      .then((res) => {
        console.log(res);
        alert("Ticket rised successfully")
        navigate('/employee/tickets')
        
      })
      .catch((err) => {
        console.log(err);
        alert("Ticket not rised")
      })

  }
  return (
    <div className='d-flex bg-secondary-subtle' id='wrapper'>
      <Sidebar />
      <div className='w-100' id='page-content-wrapper'>
        <Navbar />
        <h3 className="my-4 mx-2 p-2 rounded text-center bg-white shadow">Tickets</h3>
        <div className='container'>
          <form className="row g-3">
            <div className="col-md-6">
              <label for="employeeid" className="form-label">Employee ID</label>
              <input className="form-control" id="employeeid" readOnly
                type="number"
                name='employee_id'
                value={form.employee_id}
                onChange={handleChange}
              />
              {errors.employee_id && <small className="text-danger">{errors.employee_id}</small>}
            </div>
            <div className="col-md-6">
              <label for="employeename" className="form-label">Employee Name</label>
              <input className="form-control" id="employeename" readOnly
                type="text"
                name='employee_name'
                value={form.employee_name}
                onChange={handleChange}
              />
              {errors.employee_name && <small className="text-danger">{errors.employee_name}</small>}
            </div>
            <div className="col-md-6">
              <label for="subject" className="form-label">Subject</label>
              <input className="form-control" id="subject"
                type="text"
                name='subject'
                value={form.subject}
                onChange={handleChange}
              />
              {errors.subject && <small className="text-danger">{errors.subject}</small>}
            </div>
            <div className="col-md-6">
              <label for="inputState" className="form-label">Type</label>
              <select id="inputState" className="form-select"
                name='type'
                value={form.type}
                onChange={handleChange}
              >
                <option value='' disabled>Choose...</option>
                <option>High Priority</option>
                <option>Medium Priority</option>
                <option>Low Priority</option>
              </select>
              {errors.type && <small className="text-danger">{errors.type}</small>}
            </div>
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">Explain here</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                type="textarea"
                name='explain'
                value={form.explain}
                onChange={handleChange}
              ></textarea>
              {errors.explain && <small className="text-danger">{errors.explain}</small>}
            </div>
            <div className='row justify-content-end p-0 m-0'>
              <div className="col-3" >
                <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default EmployeeTickets
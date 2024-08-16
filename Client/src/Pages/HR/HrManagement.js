import React, { useState } from 'react';
import axios from 'axios';
import SidebarHr from '../../Component/HR/SidebarHr';
import NavbarHr from '../../Component/HR/NavbarHr';

const HrManagement = () => {
    const [form, setForm] = useState({})

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:3001/hr/tasks/create', form)
            .then((res) => {
                console.log(res);
                alert('Task Created')
                setForm({})
            })
            .catch((err) => {
                console.error('Error in creating task', err)
                alert('Error in creating task')
            })
    }
    return (
        <div className='d-flex bg-secondary-subtle' id='wrapper'>
            <SidebarHr />
            <div className='w-100' id='page-content-wrapper'>
                <NavbarHr />
                <h3 className='my-4 mx-2 p-2 rounded text-center bg-white shadow'>Management</h3>
                <div className="container d-flex flex-row mt-4">
                    <div className="p-2 m-2 rounded flex-grow-1">
                        <h5 className="text-center">Assign Tasks</h5>

                        <div className="d-flex flex-column justify-content-around">
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-info">
                                    <i className="bi bi-exclamation-triangle-fill"></i> Task
                                </p>
                                <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#taskModal">Asign task</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Model start */}
                <div className="modal fade" id="taskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Task</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input className="form-control" id="exampleInputEmail1"
                                            type="email"
                                            name='email'
                                            value={form.email || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input className="form-control" id="name"
                                            type="text"
                                            name='employee_name'
                                            value={form.employee_name || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="heading" className="form-label">Headin</label>
                                        <input className="form-control" id="heading"
                                            type="text"
                                            name='heading'
                                            value={form.heading || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor='finalDate' className='form-label'>Submit before</label>
                                        <input className='form-control' id='finalDate'
                                            type='date'
                                            name='date_of_submission'
                                            value={form.date_of_submission || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                                            name='task_text'
                                            value={form.task_text || ''}
                                            onChange={handleChange}
                                        ></textarea>
                                        <label htmlFor="floatingTextarea">Details</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Asign</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Model ends */}

            </div>
        </div>
    )
}

export default HrManagement
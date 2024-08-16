import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SidebarAdmin from '../../Component/Admin/SidebarAdmin'
import NavbarAdmin from '../../Component/Admin/NavbarAdmin'

function AllEmployees() {
    const [detail, setDetail] = useState([])
    const [employeeToDelete, setEmployeeToDelete] = useState(null)


    useEffect(() => {
        axios
            .get('http://localhost:3001/allemployee')
            .then((res => {
                setDetail(res.data.data)
            }))
            .catch((err => {
                setDetail(err)
            }))
    }, [])
    const deleteEmployee = () => {
        axios
            .delete(`http://localhost:3001/admin/deletebyid/${employeeToDelete}`)
            .then(() => {
                setDetail(detail.filter(employee => employee._id !== employeeToDelete))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <div className="d-flex  bg-secondary-subtle" id='wrapper'>
            {/* Sidebar starts */}
            <SidebarAdmin />
            {/* Sidebar ends */}

            <div className='w-100' id="page-content-wrapper">
                {/* Navbar starts */}
                <NavbarAdmin />
                {/* Navbar Ends */}

                <h3 className="my-4 mx-2 p-2 rounded text-center bg-white shadow">Employee Details</h3>

                <div className="container-fluid">

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className='text-success'>Employee Name</th>
                                <th scope="col" className='text-success'>Designation</th>
                                <th scope="col" className='text-success'>Join Date</th>
                                <th scope="col" className='text-center text-success'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail.map((a) => (
                                <tr key={a._id}>
                                    <th scope="row">{a.employee_name}</th>
                                    <td>{a.designation}</td>
                                    <td>{new Date(a.date_of_joining).toLocaleDateString()}</td>
                                    <td style={{ width: '250px' }}>
                                        <div className='row justify-content-end '>
                                            <div className='col-4 '>
                                                <Link to={`/admin/editemployees/${a._id}`} type="button" className="btn btn-primary btn-sm p-0">Edit</Link>
                                            </div>
                                            <div className='col-4'>
                                                <button type="button" className="btn btn-danger btn-sm p-0" data-bs-toggle="modal" data-bs-target={'#exampleModal'}
                                                    onClick={() => setEmployeeToDelete(a._id)}>delete
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal starts */}
            <div className="modal fade" id={'exampleModal'} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-danger" id="exampleModalLabel">Termination</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5 className='text-warning'>Do you really want to Delete this employee and Data?</h5>
                        </div>
                        <div className="modal-footer">
                            <div className='d-flex'>
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal">No</button>
                                <button type="button" onClick={deleteEmployee} className="btn btn-danger ms-2" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal starts */}
        </div>

    )
}

export default AllEmployees
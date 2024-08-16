import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarHr from '../../Component/HR/SidebarHr';
import NavbarHr from '../../Component/HR/NavbarHr';

const HrEmployeeLeaveRequest = () => {
    const [detail, setDetail] = useState([])
    const [leaveDetail, setLeaveDetail] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/hr/leaverequest')
            .then((res => {
                setDetail(res.data.data)
            }))
            .catch((err => {
                setDetail(err)
            }, []))
    })

    const handleLeaveRequest = (leave) => {
        setLeaveDetail(leave)
    }

    const handleLeaveApprove = (id) => {
        axios
            .post('http://localhost:3001/hr/approveLeaveRequest', { id })
            .then((res) => {
                console.log(res.data);
                setDetail(detail.filter((item) => item._id !== id))
            })
            .catch((err) => {
                console.error(err);
                alert('Somthing went wrong')
            })
    }

    const handleLeaveReject = (id) => {
        axios
            .post('http://localhost:3001/hr/rejectLeaveRequest', { id })
            .then((res) => {
                console.log(res.data);
                setDetail(detail.filter((item) => item._id !== id))
            })
            .catch((err) => {
                console.error(err);
                alert('Somthing went wrong')
            })
    }
    return (
        <div className="d-flex bg-secondary-subtle" id="wrapper">
            <SidebarHr />
            <div className="w-100" id="page-content-wraper">
                <NavbarHr />
                <h3 className="my-4 mx-2 p-2 rounded text-center bg-white shadow">Leave Request</h3>

                <div className='table-responsive m-1 rounded'>
                    <table className="table table-striped table-hover table-primary">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Leave Type</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {detail.map((a, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{a.employee_name}</td>
                                    <td>{a.employee_id}</td>
                                    <td>{a.typeOfLeave}</td>
                                    <td>{new Date(a.from).toLocaleDateString()}</td>
                                    <td>{new Date(a.to).toLocaleDateString()}</td>
                                    <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#leaveDetailModal" onClick={() => handleLeaveRequest(a)}>
                                        View
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            {/* Modal Starts */}
            <div className="modal fade" id="leaveDetailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Leave Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Employee Name: {leaveDetail.employee_name}</p>
                            <p>Employee ID: {leaveDetail.employee_id}</p>
                            <p>Designation: {leaveDetail.designation}</p>
                            <p>From: {new Date(leaveDetail.from).toLocaleDateString()}</p>
                            <p>To: {new Date(leaveDetail.to).toLocaleDateString()}</p>
                            <p>Type Of Leave: {leaveDetail.typeOfLeave}</p>
                            <p>Reason: {leaveDetail.reason}</p>

                        </div>
                        <div className="modal-footer">
                            <div className='d-flex'>
                                <button type="button" className="btn btn-secondary me-1" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger me-1" data-bs-dismiss="modal" onClick={() => handleLeaveReject(leaveDetail._id)}>Reject</button>
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleLeaveApprove(leaveDetail._id)}>Approve</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Ends */}
        </div>
    )
}

export default HrEmployeeLeaveRequest
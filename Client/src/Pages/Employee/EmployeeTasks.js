import React, { useEffect, useState } from 'react';
import Sidebar from '../../Component/Employee/Sidebar';
import Navbar from '../../Component/Employee/Navbar';
import axios from 'axios';

const EmployeeTasks = () => {
    const [details, setDetails] = useState([])
    const [selectedTaskId, setSelectedTaskId] = useState()

    useEffect(() => {
        axios
            .get('http://localhost:3001/employee/task', { withCredentials: true })
            .then((res) => {
                setDetails(res.data.data)
                console.log('data received', res.data);
            })
            .catch((err) => {
                console.error('Error getting details', err)
            })
    }, [])

    const handleConfirmDone = () => {
        if (!selectedTaskId) return;

        axios
            .put(`http://localhost:3001/employee/task/updateDone/${selectedTaskId}`, { withCredentials: true })
            .then((res) => {
                setDetails((prevDetails) =>
                    prevDetails.map((task) =>
                        task._id === selectedTaskId ? { ...task, status: 'done' } : task
                    )
                )
                console.log('Task status updated', res.data.data)
            })
            .catch((err) => {
                console.error('Error updating task status', err)
            })
    }
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'pendig':
                return 'text-info';
            case 'done':
                return 'text-warning';
            default:
                return '';
        }
    }

    return (
        <div className='d-flex bg-secondary-subtle' id='wrapper'>
            <Sidebar />
            <div className='w-100' id='page-content-wrapper'>
                <Navbar />
                <h3 className='my-4 mx-2 p-2 rounded text-center bg-white shadow'>Allocated Tasks</h3>
                <div className='m-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">NO</th>
                                <th scope="col">Task</th>
                                <th scope="col">Date of Allocation</th>
                                <th scope="col">Final Date</th>
                                <th scope="col">Status</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{detail.heading}</td>
                                    <td>{new Date(detail.createdAt).toLocaleDateString()}</td>
                                    <td>{new Date(detail.date_of_submission).toLocaleDateString()}</td>
                                    <td className={getStatusClass(detail.status)}>{detail.status}</td>
                                    <td className='text-center' style={{ width: '200px' }}>
                                        <button type="button" className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            style={{ width: '70px' }}
                                            onClick={() => setSelectedTaskId(detail._id)}
                                        >Done</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Modal  start*/}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Conformation</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p className='fw-bold'>Are you sure you have completed the task?</p>

                                </div>
                                <div className="modal-footer">
                                    <div className='d-flex'>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-primary ms-2"
                                            data-bs-dismiss="modal"
                                            onClick={handleConfirmDone}
                                        >Done</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Model Ends */}

                </div>
            </div>
        </div>
    )
}

export default EmployeeTasks
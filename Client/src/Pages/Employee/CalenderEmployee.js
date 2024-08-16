import React, { useEffect, useState } from "react";
import Sidebar from "../../Component/Employee/Sidebar";
import Navbar from "../../Component/Employee/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const CalenderEmployee = () => {
    const [leaveData, setLeaveData] = useState({
        casualAllocated: 24,
        sickAllocated: 12,
        casualTaken: 0,
        sickTaken: 0,
    });
    useEffect(() => {
        axios
            .get('http://localhost:3001/employee/getEmployeeLeaveBalance', { withCredentials: true })
            .then((res) => {
                setLeaveData(res.data);
            })
            .catch((err) => {
                console.error('Error fetching leave data', err);
            })
    }, []);

    const { casualAllocated, sickAllocated, casualTaken, sickTaken } = leaveData;

    const casualPending = casualAllocated - casualTaken;
    const sickPending = sickAllocated - sickTaken;
    const totalAllocated = casualAllocated + sickAllocated;
    const totalTaken = casualTaken + sickTaken;
    const totalPending = casualPending + sickPending;


    return (
        <div className="d-flex bg-secondary-subtle" id="wrapper">
            <Sidebar />
            <div className="w-100" id="page-content-wrapper">
                <Navbar />
                <h3 className="my-4 mx-2 p-2 rounded text-center bg-white">Attendance
                </h3>
                <div className="d-flex justify-content-between">
                    <Link to="/employee/leave/status" type="button" className="btn btn-success w-25 ms-2 py-2"><i className="bi bi-check-square me-2"></i>
                        Leave Status</Link>
                    <Link to='/employee/applyleaveemp' type="button" className="btn btn-primary w-25 me-2 py-2"><i className="bi bi-calendar-plus me-2"></i>
                        Apply Leave</Link>
                </div>
                <div className="container d-flex flex-row mt-4">
                    <div className="p-2 m-2 rounded flex-grow-1">
                        <h5 className="text-center">Casual Leave Per Year</h5>
                        <div className="d-flex flex-column justify-content-around">
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-primary">
                                    <i className="bi bi-check2-circle"></i> Allocated
                                </p>
                                <span className="text-primary">{casualAllocated}</span>
                            </div>
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-warning">
                                    <i className="bi bi-file-earmark-check"></i> Taken
                                </p>
                                <span className="text-warning">{casualTaken}</span>
                            </div>
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-success">
                                    <i className="bi bi-clock"></i> Pending
                                </p>
                                <span className="text-success">{casualPending} </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 m-2 rounded flex-grow-1 ">
                        <h5 className="text-center">Sick Leave Per Year</h5>
                        <div className="d-flex flex-column justify-content-around">
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-primary">
                                    <i className="bi bi-check2-circle"></i> Allocated
                                </p>
                                <span className="text-primary">{sickAllocated}</span>
                            </div>
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-warning">
                                    <i className="bi bi-file-earmark-check"></i> Taken
                                </p>
                                <span className="text-warning">{sickTaken}</span>
                            </div>
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-success">
                                    <i className="bi bi-clock"></i> Pending
                                </p>
                                <span className="text-success">{sickPending}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 m-2 rounded flex-grow-1 ">
                        <h5 className="text-center">Total Leave for the Year</h5>
                        <div className="d-flex flex-column justify-content-around">
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-primary">
                                    <i className="bi bi-check2-circle"></i> Allocated
                                </p>
                                <span className="text-primary">{totalAllocated}</span>
                            </div>
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-warning">
                                    <i className="bi bi-file-earmark-check"></i> Taken
                                </p>
                                <span className="text-warning">{totalTaken}</span>
                            </div>
                            <div className="bg-white p-2 m-1 rounded-2 border border-dark-subtle  text-center">
                                <p className="text-success">
                                    <i className="bi bi-clock"></i> Pending
                                </p>
                                <span className="text-success">{totalPending}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalenderEmployee;

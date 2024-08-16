import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../img/LogoHermes.png'
import './Sidebar.css'
import axios from 'axios'

function Sidebar() {
    const navigate = useNavigate()
    const handleLogout = () => {
        axios
            .post('http://localhost:3001/logout', {}, { withCredentials: true })
            .then(() => {
                localStorage.clear()
                localStorage.setItem('isEmployeeLoggedIn', false)
                navigate('/login')
            })
            .catch((err) => {
                console.error('Error during logout', err)
            })
    }
    return (

        <div className="bg-white offcanvas-md offcanvas-end" tabIndex="-1" id="sidebarMenu">
            <div className="container-fluid sidebar-heading text-center py-4 primary-text fs-5 border-bottom">
                <Link className="navbar-brand" to="#">
                    <img src={img1} alt="Logo" width="50" className="d-inline-block" />
                    Hermes Systems
                </Link>
                <button type="button" className="btn-close  d-sm-none" data-bs-dismiss="offcanvas"
                    data-bs-target="#sidebarMenu" aria-label="Close"></button>
            </div>

            <div className="list-group list-group-flush my-3 " id="sidebaritem">
                <Link href="#" className="list-group-item list-group-item-action bg-transparent second-text active">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </Link>
                <Link to="/employeeprofile" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-house me-2"></i> Profile
                </Link>
                <Link to="/employee/calenderemployee" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-calendar me-2"></i> Calender
                </Link>
                <Link to="/employee/employeetasks" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-person-workspace me-2"></i> Tasks
                </Link>
                <Link to="/employee/tickets" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-ticket me-2"></i> Tickets
                </Link>
                <Link to='/employee/salary' className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-cash me-2"></i> Salary
                </Link>
                <button className="list-group-item list-group-item-action bg-transparent text-danger fw-bold" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left me-2"></i> Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar
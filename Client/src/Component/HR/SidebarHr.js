import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '../../img/LogoHermes.png'
import './SidebarHr.css'

function SidebarHr() {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.clear()
        localStorage.setItem('isHrLoggedIn', false)
        navigate('/hrlogin')
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
                <Link to="#" className="list-group-item list-group-item-action bg-transparent second-text active">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </Link>
                <Link to='/hrhome' className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-house me-2"></i> Home
                </Link>
                <Link to="/hr/management" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-kanban me-2"></i> Management
                </Link>
                <Link to="/hr/timesheet" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-calendar3 me-2"></i> Time Sheet
                </Link>
                <Link to="/hr/allemployees" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-people me-2"></i> Employees
                </Link>
                <Link to="/hr/allsalary" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-bank me-2"></i> Payment
                </Link>
                <Link to="/hr/transactionhistoty" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                    <i className="bi bi-cash-stack me-2"></i> Transaction History
                </Link>
                <button onClick={logOut} className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
                    <i className="bi bi-box-arrow-left me-2"></i> Logout
                </button>
            </div>
        </div>
    )
}

export default SidebarHr
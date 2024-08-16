import React from 'react'
import './NavbarHr.css'
import img1 from '../../img/LogoHermes.png'


function NavbarHr() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light  p-3 m-1">

            <div className="d-flex align-item-center">
                <h2 className="fs-2 mx-6 "> HR Manager</h2>
                <ul className="navbar-nav flex-row d-md-none">
                    <li className="nav-item text-nowrap">
                        <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle search">
                            <i className="bi bi-person-square fs-4 text-primary"></i>
                        </button>
                    </li>
                    <li className="nav-item text-nowrap">
                        <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="bi bi-house-fill fs-4 text-primary"></i>
                        </button>
                    </li>
                </ul>
            </div>

            {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link active dropdown-toggle second-text fw-bold" id="navbarDropdown"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={img1} alt="Logo" width="50" className="d-inline-block pe-1 rounded-circle" />
                            John Doe
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a href="#" className="dropdown-item">Profile</a></li>
                            <li><a href="#" className="dropdown-item">Settings</a></li>
                            <li><a href="#" className="dropdown-item">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div> */}
        </nav>
    )
}

export default NavbarHr
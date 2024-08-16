import './Navbar.css'
import img1 from '../../img/LogoHermes.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { EmployeeContext } from '../../Contex/EmployeeContex'

function Navbar() {
    const { employee, loading } = useContext(EmployeeContext)

    const profilePictureSrc = employee && employee.profile_picture
        ? `http://localhost:3001/${employee.profile_picture.filename}`
        : img1;
    return (
        <nav className="navbar navbar-expand-lg navbar-light  p-3 m-1">

            <div className="d-flex align-item-center">
                <h2 className="fs-2 mx-6 "> Dashboard</h2>
                <ul className="navbar-nav flex-row d-md-none">
                    {/* <li className="nav-item text-nowrap">
                        <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle search">
                            <i className="bi bi-person-square fs-4 text-primary"></i>
                        </button>
                    </li> */}
                    <li className="nav-item text-nowrap">
                        <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="bi bi-house-fill fs-4 text-primary"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <div className=" navbar-collapse">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item ">
                        <button className="nav-link active  second-text fw-bold">
                            <img src={profilePictureSrc} alt="Logo" width="50" height="50" className="d-inline-block pe-1 rounded-circle" />
                            {loading ? 'Loading...' : (employee ? employee.employee_name : 'Unknown')}
                        </button>
                        
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
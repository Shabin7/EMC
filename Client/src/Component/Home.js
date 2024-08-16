import React from 'react'
import './Home.css'
import img1 from '../img/Report.jpg'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <body>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top  p-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Hermes Systems</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hermes Systems</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body ">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 ">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='#' className="nav-link">Abou Us</Link>
                                </li>
                                <li className="nav-item dropdown ">
                                    <Link className="nav-link dropdown-toggle" to="#" role='button' data-bs-toggle="dropdown" aria-expanded="false">Login</Link>
                                    <ul className="dropdown-menu " >
                                        <li><Link to="/login" className='dropdown-item'>Employee</Link></li>
                                        <li><Link to='/hrlogin' className="dropdown-item">HR</Link></li>
                                        <li><Link to='/adminlogin' className="dropdown-item">Admin</Link> </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="hero">
                <div className="hero__overlay"></div>
                <img src={img1} className='hero__picture'></img>
                <div className="hero__content h-100 container-custom position-relative">
                    <div className="d-flex h-100 align-items-center ps-2 hero__content-width">
                        <div className="text-white">
                            <h1 className="hero__heading fw-bold mb-4">
                                Working Over Years.
                            </h1>
                            <p className="lead mb-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                                magni.
                            </p>
                            <a href="#" className="mt-2 btn btn-lg btn-outline-light" data-bs-toggle='modal' data-bs-target='#exampleModal' type="button"
                            >Contact Us</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Contact Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3 flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping1">@</span>
                                <input type="text" className="form-control" placeholder="Full Name" aria-label="Username" aria-describedby="addon-wrapping1"/>
                            </div>
                            <div className="input-group mb-3 flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping2">@</span>
                                <input type="text" className="form-control" placeholder="Email Address" aria-label="Username" aria-describedby="addon-wrapping2"/>
                            </div>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping3">@</span>
                                <input type="text" className="form-control" placeholder="Phone" aria-label="Username" aria-describedby="addon-wrapping3"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss='modal'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )


}
export default Home
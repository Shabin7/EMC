import React, { useState } from 'react';
import axios from 'axios';
import SidebarAdmin from '../../Component/Admin/SidebarAdmin';
import NavbarAdmin from '../../Component/Admin/NavbarAdmin';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../../Utils/Validation';


const AddEmployees = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        employee_name: "",
        employee_id: "",
        date_of_birth: "",
        designation: "",
        profile_picture: null,
        date_of_joining: "",
        house_number: "",
        street_name: "",
        city: "",
        landmark: "",
        zip: "",
        district: "",
        state: "",
        country: "",
        primary_phone: "",
        secondary_phone: "",
        email: "",
        pan_no: "",
        aadhar_no: "",
        pf_no: "",
        bank: "",
        ifsc_code: "",
        account_no: "",
        course: "",
        passout_year: "",
        institute: "",
        course_1: "",
        passout_year_1: "",
        institute_1: "",
        course_2: "",
        passout_year_2: "",
        institute_2: "",
    })
    const [errors, setErrors] = useState({})
    const handlChange = (e) => {
        const { name, value, files } = e.target
        if (files) {
            setForm({ ...form, [name]: files[0] })
        }
        else {
            setForm({ ...form, [name]: value })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = ['employee_name', 'employee_id', 'date_of_birth', 'designation', 'profile_picture', 'date_of_joining', 'house_number',
            'street_name', 'city', 'landmark', 'zip', 'district', 'state', 'country', 'primary_phone', 'secondary_phone', 'email', 'pan_no',
            'aadhar_no', 'pf_no', 'bank', 'ifsc_code', 'account_no', 'course', 'passout_year', 'institute', 'course_1', 'passout_year_1',
            'institute_1', 'course_2', 'passout_year_2', 'institute_2'
        ];
        const errors = validateForm(form, requiredFields)
        setErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }
        const formData = new FormData()
        for (const key in form) {
            formData.append(key, form[key])
        }
        axios
            .post('http://localhost:3001/addemployee', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                alert("Employee added")
                navigate('/allemployees')
            })
            .catch((error) => {
                console.log(error);
                alert("Error in adding employee")
            })
    }

    return (
        <div className="d-flex  bg-secondary-subtle" id="wrapper">

            {/* Sidebar starts here */}
            <SidebarAdmin />
            {/* Sidebar ends here */}
            <div className='w-100' id="page-content-wrapper">

                {/* Navbar starts */}
                <NavbarAdmin />
                {/* Navbar ends */}

                {/* Form Body starts here  */}
                <div className='container me-2'>
                    <form className="row g-3" >
                        <div>
                            <h4 className="text-center p-4 ">Add Employee Details</h4>
                            <hr></hr>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="emploueename4" className="form-label">Employee Name:</label>
                            <input type="text" className="form-control" id="emploueename4" required
                                name='employee_name'
                                value={form.employee_name}
                                onChange={handlChange} />
                            {errors.employee_name && <small className="text-danger">{errors.employee_name}</small>}

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="employeeid4" className="form-label">Employee ID</label>
                            <input type="number" className="form-control" id="employeeid4" required
                                name='employee_id'
                                value={form.employee_id}
                                onChange={handlChange} />
                            {errors.employee_id && <small className="text-danger">{errors.employee_id}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="dateofbirth4" className="form-label">Date of birth</label>
                            <input type="date" className="form-control" id="dateofbirth4" required
                                name='date_of_birth'
                                value={form.date_of_birth}
                                onChange={handlChange} />
                            {errors.date_of_birth && <small className="text-danger">{errors.date_of_birth}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="designation4" className="form-label">Designation</label>
                            <select className="form-select" aria-label="Default select example" id='designation4' required
                                name='designation'
                                value={form.designation}
                                onChange={handlChange}>
                                <option value='' disabled>Choose</option>
                                <option>Frontend Developer</option>
                                <option>Backend Developer</option>
                                <option>Fullstack Developer</option>
                                <option>Tester</option>
                            </select>
                            {errors.designation && <small className="text-danger">{errors.designation}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="profile_picture" className="form-label">Upload Profile Picture</label>
                            <input className="form-control" type="file" id="profile_picture" required
                                name='profile_picture'
                                // value={form.profile_picture}
                                onChange={handlChange} />
                            {errors.profile_picture && <small className="text-danger">{errors.profile_picture}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="unknown4" className="form-label">Date of Joining</label>
                            <input type="date" className="form-control" id="unknown4" required
                                name='date_of_joining'
                                value={form.date_of_joining}
                                onChange={handlChange} />
                            {errors.date_of_joining && <small className="text-danger">{errors.date_of_joining}</small>}
                        </div>

                        <p className="fw-bolder mb-0 mt-5 ps-4">Permanent Adress</p>
                        <div className="col-md-3">
                            <label htmlFor="housenumber4" className="form-label">House Number</label>
                            <input type="text" className="form-control" id="housenumber4" required
                                name='house_number'
                                value={form.house_number}
                                onChange={handlChange} />
                            {errors.house_number && <small className="text-danger">{errors.house_number}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="streetname4" className="form-label">Street Name</label>
                            <input type="text" className="form-control" id="streetname4" required
                                name='street_name'
                                value={form.street_name}
                                onChange={handlChange} />
                            {errors.street_name && <small className="text-danger">{errors.street_name}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="city4" className="form-label">City</label>
                            <input type="text" className="form-control" id="city4" required
                                name='city'
                                value={form.city}
                                onChange={handlChange} />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="landmark4" className="form-label">Land Mark</label>
                            <input type="text" className="form-control" id="landmark4" required
                                name='landmark'
                                value={form.landmark}
                                onChange={handlChange} />
                            {errors.landmark && <small className="text-danger">{errors.landmark}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="zip4" className="form-label">ZIP</label>
                            <input type="text" className="form-control" id="zip4" required
                                name='zip'
                                value={form.zip}
                                onChange={handlChange} />
                            {errors.zip && <small className="text-danger">{errors.zip}</small>}

                        </div>
                        <div className="col-md-3">
                            <label htmlFor="district4" className="form-label">District</label>
                            <input type="text" className="form-control" id="district4" required
                                name='district'
                                value={form.district}
                                onChange={handlChange} />
                            {errors.district && <small className="text-danger">{errors.district}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="state4" className="form-label">State</label>
                            <input type="text" className="form-control" id="state4" required
                                name='state'
                                value={form.state}
                                onChange={handlChange} />
                            {errors.state && <small className="text-danger">{errors.state}</small>}

                        </div>
                        <div className="col-md-3">
                            <label htmlFor="country4" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country4" required
                                name='country'
                                value={form.country}
                                onChange={handlChange} />
                            {errors.country && <small className="text-danger">{errors.country}</small>}

                        </div>
                        <div className="col-md-3">
                            <label htmlFor="primaryphone4" className="form-label">Primary Phone</label>
                            <input type="number" className="form-control" id="primaryphone4" required
                                name='primary_phone'
                                value={form.primary_phone}
                                onChange={handlChange} />
                            {errors.primary_phone && <small className="text-danger">{errors.primary_phone}</small>}

                        </div>
                        <div className="col-md-3">
                            <label htmlFor="secondaryphone4" className="form-label">Secondary Phone</label>
                            <input type="number" className="form-control" id="secondaryphone4" required
                                name='secondary_phone'
                                value={form.secondary_phone}
                                onChange={handlChange} />
                            {errors.secondary_phone && <small className="text-danger">{errors.secondary_phone}</small>}

                        </div>
                        <div className="col-md-3">
                            <label htmlFor="secondaryemail4" className="form-label">Email ID</label>
                            <input type="email" className="form-control" id="secondaryemail4" required
                                name='email'
                                value={form.email}
                                onChange={handlChange} />
                            {errors.email && <small className="text-danger">{errors.email}</small>}

                        </div>

                        <p className="fw-bolder mb-0 mt-5 ps-4 ">Other Statutory information</p>
                        <div className="col-md-2">
                            <label htmlFor="panno4" className="form-label">PAN No</label>
                            <input type="text" className="form-control" id="panno4" required
                                name='pan_no'
                                value={form.pan_no}
                                onChange={handlChange} />
                            {errors.pan_no && <small className="text-danger">{errors.pan_no}</small>}

                        </div>
                        {/* problem */}
                        <div className="col-md-2">
                            <label htmlFor="aadharno4" className="form-label">Aadhar No</label>
                            <input type="number" className="form-control" id="aadharno4" required
                                name='aadhar_no'
                                value={form.aadhar_no}
                                onChange={handlChange} />
                            {errors.aadhar_no && <small className="text-danger">{errors.aadhar_no}</small>}

                        </div>
                        {/* problem */}
                        <div className="col-md-2">
                            <label htmlFor="pfno4" className="form-label">PF No</label>
                            <input type="text" className="form-control" id="pfno4" required
                                name='pf_no'
                                value={form.pf_no}
                                onChange={handlChange} />
                            {errors.pf_no && <small className="text-danger">{errors.pf_no}</small>}

                        </div>
                        <div className="col-md-2">
                            <label htmlFor="bank4" className="form-label">Bank</label>
                            <input type="text" className="form-control" id="bank4" required
                                name='bank'
                                value={form.bank}
                                onChange={handlChange} />
                            {errors.bank && <small className="text-danger">{errors.bank}</small>}

                        </div>
                        <div className="col-md-2">
                            <label htmlFor="ifsccode4" className="form-label">IFSC Code</label>
                            <input type="text" className="form-control" id="ifsccode4" required
                                name='ifsc_code'
                                value={form.ifsc_code}
                                onChange={handlChange} />
                            {errors.ifsc_code && <small className="text-danger">{errors.ifsc_code}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="accountno4" className="form-label">Account No</label>
                            <input type="number" className="form-control" id="accountno4" required
                                name='account_no'
                                value={form.account_no}
                                onChange={handlChange} />
                            {errors.account_no && <small className="text-danger">{errors.account_no}</small>}
                        </div>

                        <p className="fw-bolder mb-0 mt-5 ps-4 ">Educational Details</p>
                        <p className="ps-4">Higher Education</p>
                        <div className="col-md-4">
                            <label htmlFor="course4" className="form-label">Course</label>
                            <input type="text" className="form-control" id="course4" required
                                name='course'
                                value={form.course}
                                onChange={handlChange} />
                            {errors.course && <small className="text-danger">{errors.course}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="passout4" className="form-label">Passout Year</label>
                            <input type="text" className="form-control" id="passout4" required
                                name='passout_year'
                                value={form.passout_year}
                                onChange={handlChange} />
                            {errors.passout_year && <small className="text-danger">{errors.passout_year}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="institute4" className="form-label">Institute</label>
                            <input type="text" className="form-control" id="institute4" required
                                name='institute'
                                value={form.institute}
                                onChange={handlChange} />
                            {errors.institute && <small className="text-danger">{errors.institute}</small>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="course5" className="form-label">Course</label>
                            <input type="text" className="form-control" id="course5" required
                                name='course_1'
                                value={form.course_1}
                                onChange={handlChange} />
                            {errors.course_1 && <small className="text-danger">{errors.course_1}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="passout5" className="form-label">Passout Year</label>
                            <input type="text" className="form-control" id="passout5" required
                                name='passout_year_1'
                                value={form.passout_year_1}
                                onChange={handlChange} />
                            {errors.passout_year_1 && <small className="text-danger">{errors.passout_year_1}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="institute5" className="form-label">Institute</label>
                            <input type="text" className="form-control" id="institute5" required
                                name='institute_1'
                                value={form.institute_1}
                                onChange={handlChange} />
                            {errors.institute_1 && <small className="text-danger">{errors.institute_1}</small>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="course6" className="form-label">Course</label>
                            <input type="text" className="form-control" id="course6" required
                                name='course_2'
                                value={form.course_2}
                                onChange={handlChange} />
                            {errors.course_2 && <small className="text-danger">{errors.course_2}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="passout6" className="form-label">Passout Year</label>
                            <input type="text" className="form-control" id="passout6" required
                                name='passout_year_2'
                                value={form.passout_year_2}
                                onChange={handlChange} />
                            {errors.passout_year_2 && <small className="text-danger">{errors.passout_year_2}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="institute6" className="form-label">Institute</label>
                            <input type="text" className="form-control" id="institute6" required
                                name='institute_2'
                                value={form.institute_2}
                                onChange={handlChange} />
                            {errors.institute_2 && <small className="text-danger">{errors.institute_2}</small>}
                        </div>

                        <div className="col-6">
                            <button className="btn btn-primary bg-success" onClick={handleSubmit}><i className="bi bi-upload"></i> Update</button>
                        </div>
                        <div className="col-6">
                            <button type="reset" className="btn btn-primary bg-warning"><i className="bi bi-arrow-clockwise"></i> Reset</button>
                        </div>
                    </form>
                </div>

                {/* Form Body Ends here  */}

            </div>
        </div>
    )
}

export default AddEmployees
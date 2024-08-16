// src/utils/validation.js

export const validateSignupForm = (form) => {
    const errors = {};

    if (!form.fullname) {
        errors.fullname = "Full name is required";
    }
    if (!form.employeeid) {
        errors.employeeid = "Employee ID is required";
    }
    if (!form.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "Email address is invalid";
    }
    if (!form.newpassword) {
        errors.newpassword = "Password is required";
    } else if (form.newpassword.length < 6) {
        errors.newpassword = "Password must be at least 6 characters";
    }
    if (form.newpassword !== form.confirmpassword) {
        errors.confirmpassword = "Passwords must match";
    }

    return errors;
};

export const validateForm = (form, requiredFields) => {
    const errors = {};

    requiredFields.forEach(field => {
        if (!form[field]) {
            errors[field] = `${field.replace('_', ' ')} is required`;
        }
    });

    return errors;
};

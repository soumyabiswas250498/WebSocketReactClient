import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),
    password: Yup.string()
        .required("Please enter password")
});

export const registrationSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter username"),
    email: Yup.string().email("Invalid email address").required("Please enter email"),
    password: Yup.string().required("Please enter password").min(8, "Password must be at least 8 characters").matches(/^[a-zA-Z0-9]*$/, "Password must be alphanumeric"),
    conf_password: Yup.string().required('Please retype your password.').oneOf([Yup.ref('password')], 'Your passwords do not match.')
});
import { useState } from "react"
const useLogin = (onLogin) => {
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const validateForm = (email, password) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email) && password.length >= 8;
    };

    const handleChangeEmail = (e) => {
        const { value: email } = e.target;
        const { password } = formData;

        setFormData((prevFormData) => ({
            ...prevFormData,
            email,
        }));
        setEnableSubmit(validateForm(email, password));
    };

    const handleChangePassword = (e) => {
        const { value: password } = e.target;
        const { email } = formData;
        if (value.length >= 8) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                password,
            }));
            setEnableSubmit(validateForm(email, password));
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (props.logIn) {
            props.logIn(email, password);
        }
    };

    const { email, password } = formData

    return {
        formData,
        enableSubmit,
        handleChangeEmail,
        handleChangePassword,
        handleLoginSubmit
    }
}

export default useLogin
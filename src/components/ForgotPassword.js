import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {

    const initialValues = {
        email: "",
    }

    const [state, setState] = useState(initialValues);
    const [emailError, setEmailError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;
        
        setState({
            ...state,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        setEmailError("");
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);

        const data = { 
            email: state.email,
        };

        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        axios.post("http://localhost:8000/api/v1/forgotPassword", data, {headers: headers}
        ).then((response) => {
            console.log('Success',response);
            setLoading(false);
            setState(initialValues);
            setSuccessMessage(response.data.message);
        }).catch((error) => {
            console.log('Error',error.response.data);
            setLoading(false);
            if (error.response.status === 422) {
                setEmailError(error.response.data.errors.email);
            } else {
                setErrorMessage(error.response.data.message ?? "Something went wrong. Please try again later!");

                setTimeout(() => {
                    setErrorMessage("");
                }, [3000]);
            }
        });
    }

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="offset-3 col-6 offset-3 p-4 bg-white">
                        {successMessage !== "" && <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>}

                        {errorMessage !== "" && <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>}
                        
                        <h2>Forgot Password</h2>

                        <form onSubmit={handleSubmit} className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    value={state.email}
                                    onChange={handleInputChange}
                                />
                                {emailError !== "" && <span className="invalid-feedback" role="alert">
                                    <strong>{ emailError }</strong>
                                </span>}
                            </div>
                            
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Password Reset Link'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;

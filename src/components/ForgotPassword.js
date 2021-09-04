import React, { useState } from 'react';

const ForgotPassword = () => {

    const initialValues = {
        email: "",
    }

    const [state, setState] = useState(initialValues);
    const [emailError, setEmailError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
        setLoading(true);
    }

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="offset-3 col-6 offset-3 p-4 bg-white">
                        
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
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;

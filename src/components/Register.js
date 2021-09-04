import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from './../utils/Common';

const Register = (props) => {
    const history = useHistory();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const [state, setState] = useState(initialValues);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleInputChange(e) {
        const { name, value } = e.target;
        
        setState({
            ...state,
            [name]: value,
        });
    }

    function handleRegister(e) {
        e.preventDefault();

        setNameError("");
        setEmailError("");
        setPasswordError("");
        setErrorMessage("");
        setLoading(true);

        const data = { 
            name: state.name,
            email: state.email,
            password: state.password,
            password_confirmation: state.confirmPassword,
            device_name: "other",
            device_token: "1234",
        };

        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        axios.post("http://localhost:8000/api/v1/register", data, {headers: headers}
        ).then((response) => {
            console.log('Success',response);
            setLoading(false);
            setState(initialValues);
            setUserSession(response.data.data.token, response.data.data.user);
            props.setIsLoggedin(true);
            history.push('/');
        }).catch((error) => {
            console.log('Error',error.response.data);
            setLoading(false);
            if (error.response.status === 422) {
                setNameError(error.response.data.errors.name);
                setEmailError(error.response.data.errors.email);
                setPasswordError(error.response.data.errors.password);
            } else {
                setErrorMessage("Something went wrong. Please try again later!");

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

                        {errorMessage !== "" && <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>}

                        <h2>Register</h2>

                        <form onSubmit={handleRegister} className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="name" 
                                    className="form-control" 
                                    name="name" 
                                    value={state.name}
                                    onChange={handleInputChange}
                                />
                                {nameError !== "" && <span className="invalid-feedback" role="alert">
                                    <strong>{ nameError }</strong>
                                </span>}
                            </div>
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
                            <div className="col-md-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control"
                                    name="password" 
                                    value={state.password}
                                    onChange={handleInputChange}
                                />
                                {passwordError !== "" && <span className="invalid-feedback" role="alert">
                                    <strong>{ passwordError }</strong>
                                </span>}
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="confirmPassword" 
                                    value={state.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;

import React, {useState} from 'react';
import axios from 'axios';
//import { setUserSession } from './../utils/Common';

const Login = (props) => {

    const initialValues = {
        email: "",
        password: "",
    }

    const [state, setState] = useState(initialValues);
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

    function handleLogin(e) {
        e.preventDefault();
        
        setEmailError("");
        setPasswordError("");
        setErrorMessage("");
        setLoading(true);

        const data = { 
            email: state.email,
            password: state.password,
            device_name: "other",
            device_token: "1234",
        };

        const headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        axios.post("http://localhost:8000/api/v1/login", data, headers
        ).then((response) => {
            console.log('Success',response);
            setLoading(false);
            setState(initialValues);
            //setUserSession(response.data.data.token, response.data.data.user);
            //props.history.push('/');
        }).catch((error) => {
            console.log('Error',error.response.data);
            setLoading(false);
            if (error.response.status === 422) {
                setEmailError(error.response.data.errors.email);
                setPasswordError(error.response.data.errors.password);
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
                        
                        {errorMessage !== "" && <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>}
                        
                        <h2>Login</h2>

                        <form onSubmit={handleLogin} className="row g-3">
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
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="remember" />
                                    <label className="form-check-label" htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;

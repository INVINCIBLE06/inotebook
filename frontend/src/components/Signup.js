import React, { useState } from 'react'
import * as url from "../context/notes/urlhelper";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "", username: "", phone_no: "", date_of_birth: "" });
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    let navigate = useNavigate();

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        const {name, email, username, password, phone_no, date_of_birth, cpassword} = credentials;
        const response = await fetch(url.POST_SIGNUP_USER,{
            method: `POST`,
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({name, email, username, phone_no, date_of_birth, password})
        });
        if(password !== cpassword)
        {
            alert(`Please check Password and confirm password both are not same.`);
        }
        else
        {
            const json = await response.json();
            if(json.code === 200)
            {
                localStorage.setItem(`token`, json.authtoken);
                navigate("/");
                props.showAlert(json.message, 'success')
            }
            else
            {
                props.showAlert(json.message, 'danger')
            }
        }
    }
        const onChange = (e) => {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
        }

    return (
        <div className="container mt-2">
            <h2>Create a new account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="container mx-2">
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label font-weight-bold">Email</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="username" className="form-control" id="username" name="username" onChange={onChange} value={credentials.username} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
                            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility} >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <input type={showPassword  ? 'text' : 'password'} className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required />
                            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility} >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone_no" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="phone_no" name="phone_no" onChange={onChange} value={credentials.phone_no} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" onChange={onChange} value={credentials.date_of_birth}  required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;
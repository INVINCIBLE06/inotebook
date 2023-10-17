import React, { useState } from 'react'
import * as url from "../context/notes/urlhelper";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "", username: "", phone_no: "", date_of_birth: "" });
    let navigate = useNavigate();

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        const response = await fetch(url.POST_SIGNUP_USER,
        {
            method: `POST`,
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name : credentials.name, email: credentials.email, password : credentials.password, cpassword : credentials.cpassword, username: credentials.username, phone_no : credentials.phone_no, date_of_birth : credentials.date_of_birth})
        });
        const json = await response.json()
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }
        else
        {
            alert(`Invalid Credentials`);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="container">
            <form>
                <div className="container mx-2">
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label font-weight-bold">Email</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email}  />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="username" className="form-control" id="username" name="username" onChange={onChange} value={credentials.username}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="cpassword" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input type="phone" className="form-control" id="phone" name="phone" onChange={onChange} value={credentials.phone_no}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" name="dob" onChange={onChange} value={credentials.date_of_birth}  />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
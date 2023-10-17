import React, { useState } from 'react'
import * as url  from "../context/notes/urlhelper";
import { useNavigate } from 'react-router-dom';


const Login = () => 
{
    const [credentials, setCredentials] = useState({email : "", password : ""});
    let navigate = useNavigate();

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        const response = await fetch(url.POST_SIGNIN_USER,
        {
            method: `POST`,
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password : credentials.password})
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

    const onChange = (e) =>
    {
        setCredentials({ ...credentials, [e.target.name]: e.target.value})
    } 


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="container mx-2">
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange ={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange ={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </div>
            </form>
        </div>
    )
}

export default Login
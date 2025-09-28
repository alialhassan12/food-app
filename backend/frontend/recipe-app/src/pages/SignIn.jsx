import TextField from '@mui/material/TextField';
import axios from 'axios';
import {useState} from 'react';
import Alert from '@mui/material/Alert';

export default function SignIn(){
    const [authInp,setAuthInp]=useState({
        email:"",
        password:""
    });
    const [error,setError]=useState("");

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:5000/user/signin',authInp);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            setError("");
        }catch(err){
            setError(err.response?.data?.error || "Server Error");
        }
    }
    return(
        <div className="authContainer" >
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label >Email:</label>
                <TextField 
                    value={authInp.email}
                    onChange={e=>setAuthInp({...authInp,email:e.target.value})} 
                    label="Email" variant="outlined" 
                    />
                <label >Password:</label>
                <TextField
                    value={authInp.password}
                    onChange={e=>setAuthInp({...authInp,password:e.target.value})} 
                    label="Password" variant="outlined" type='password'
                    />
                <button>Login</button>
                {error &&<Alert severity="error">{error}</Alert>}
                <a href='/user/register'>dont have an account?</a>
            </form>
        </div>
    );
}
import TextField from '@mui/material/TextField';
import axios from 'axios';
import {useState} from 'react';
import Alert from '@mui/material/Alert';

export default function Register(){
    const [authInp,setAuthInp]=useState({
        email:"",
        password:""
    });
    const [success,setSuccess]=useState("");
    const[error,setError]=useState("");

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response= await axios.post("http://localhost:5000/user/register",authInp);
            setSuccess(response.data.message);
            setError("");
        }catch(err){
            setError(err.response?.data?.error || "Server Error");
        }
    }
    function showMsg(){
        if(success != ""){
            return <Alert severity="success">{success}</Alert>
        }else if(error !=""){
            return <Alert severity="error">{error}</Alert>
        }
    }
    return(
        <div className="authContainer" >
            <form onSubmit={handleSubmit}>
                <h2>Register new Account</h2>
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
                <button>Register</button>
                {showMsg()}
                <a href='/user/signin'>Already have an account?</a>
            </form>
        </div>
    );
}
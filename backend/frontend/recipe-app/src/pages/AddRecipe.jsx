import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import axios from 'axios';
import { useState } from 'react';

export default function AddRecipe(){
    const [form,setForm]=useState({
        title:"",
        ingredients:"",
        instructions:"",
    });
    const [image,setImage]=useState(null);
    const [previewImg,setPreviewImg]=useState(null);
    const [success,setSuccess]=useState("");
    const [error,setError]=useState("");
    
    //handlers
    function handleImage(e){
        const imageFile=e.target.files[0];
        setImage(imageFile);
        if(imageFile){
            setPreviewImg(URL.createObjectURL(imageFile));
        }else{
            setPreviewImg(null);
        }
    }

    function showMsg(){
        if(success != ""){
            return <Alert severity="success">{success}</Alert>
        }else if(error !=""){
            return <Alert severity="error">{error}</Alert>
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        const formData=new FormData();
        formData.append('title',form.title);
        formData.append('ingredients',form.ingredients);
        formData.append('instructions',form.instructions);
        if(image){
            formData.append('image',image);
        }
        try{
            const response=await axios.post('http://localhost:5000/recipe/add',formData,{
                headers:{'Content-Type': 'multipart/form-data'}
            });
            setSuccess(response.data.message);
            setError("");
        }catch(err){
            console.log(err);
            setError(err.response?.data?.error || "Server Error");
        }
    }

    return(
        <>
        <Container maxWidth="md" style={{background:"white",borderRadius:"6px",padding:"20px",color:"black"}}>
            <form style={{display:"flex", flexDirection:"column",gap:"10px"}} onSubmit={handleSubmit}>
                <h2>Add New Recipe</h2>
                <label>Title:</label>
                <TextField
                    label="Title" variant="outlined" 
                    value={form.title} 
                    onChange={(e)=>setForm({...form,title:e.target.value})}
                    />
                <label>ingredients:</label>
                <TextField 
                    label="ingredients" variant="outlined" 
                    value={form.ingredients} 
                    onChange={(e)=>setForm({...form,ingredients:e.target.value})}
                    />
                <label>instructions:</label>
                <TextField 
                    label="instructions" variant="outlined" 
                    value={form.instructions} 
                    onChange={(e)=>setForm({...form,instructions:e.target.value})}
                    />
                <label >Upload Image</label>
                <input type="file" accept='image/*'  onChange={handleImage} />
                <div className='imageContainer'>
                    {previewImg && <img src={previewImg} style={{marginTop:"10px",maxHeight:"300px",maxWidth:"300px"}}></img>}
                </div>
                {showMsg()}
                <button>Submit</button>
            </form> 
        </Container>
        </>
    );
}
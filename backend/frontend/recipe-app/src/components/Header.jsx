import logo from '../assets/logo.png';
import { useEffect,useState } from 'react';

export default function Header(){
    const [profileEndPoint,setProfileEndPoint]=useState("");
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setProfileEndPoint("/profile");
        }else{
            setProfileEndPoint("/user/signin");
        }
    },[]);
    
    return (
        <>
        <div className="navbar">
            <img className="logo" src={logo} />
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="">recipes</a></li>
                <li><a href="">add recipe</a></li>
                <li><a href="">cheffs</a></li>
                <li><a href={profileEndPoint}>profile</a></li>
            </ul>
        </div>
        </>
    );
}
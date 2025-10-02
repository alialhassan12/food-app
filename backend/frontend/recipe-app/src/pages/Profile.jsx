import { useEffect,useState } from "react";
import axios from "axios";
// card imports
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function Profile(){
    const [user,setUser]=useState(null);
    const [ownedRecipes,setOwnedRecipes]=useState([]);

    useEffect(()=>{
        const localUser= JSON.parse(localStorage.getItem('user')) || [];
        setUser(localUser);
        axios.get(`http://localhost:5000/recipe/ownedRecipes/${localUser?._id}`)
            .then(response=>{
                setOwnedRecipes(response.data.ownedRecipes);
            })
            .catch(err=>{
                console.log(err);
            });
    },[]);
    return(
        <>
        <div className="profileContainer">
            <div className="top">
                <div className="imgConatiner">
                    
                </div>
                <div className="personalInfo">
                    <h3>Username:</h3>
                    <p>{user?.username}</p>
                    <h3>Email:</h3>
                    <p>{user?.email}</p>
                    <h3>Phone Number:</h3>
                    <p>{user?.phoneNumber}</p>
                </div>
            </div>
            <div className="bottom" style={{marginTop:"50px"}}>
                <h2>My Recipes</h2>
                <div className="recipes" style={{display:"flex",gap:"10px",flexWrap:"wrap",padding:"10px"}}>
                    {ownedRecipes.map((recipe)=>{
                        return (
                            <Card sx={{ maxWidth: 345 }} key={recipe._id}>
                                <CardHeader
                                    avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        R
                                    </Avatar>
                                    }
                                    action={
                                    <IconButton aria-label="settings" style={{outline:"none"}}  >
                                        <MoreVertIcon />
                                    </IconButton>
                                    }
                                    title={recipe.title}
                                    subheader={(()=>{
                                        const date=new Date(recipe.createdAt);
                                        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                                    })()}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={`http://localhost:5000/${recipe.image}`}
                                    
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {recipe.instructions}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites" style={{outline:"none"}}>
                                    <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share" style={{outline:"none"}}>
                                    <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
        </>
    );
}
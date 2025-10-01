import Button from '@mui/material/Button';
import img from '../assets/ramen-removebg-preview.png';
import AllRecipes from '../components/AllRecipes';
export default function Home(){
    return(
        <>
        <div className="container">
            <div className="left">
                <h1>Welcome to our platform</h1>
                <p>Start sharing your delicious Recipes and interact with cheffs </p>
                <Button variant="contained" style={{border:"none",outline:"none"}}>Start sharing</Button>
            </div>
            <div className="right">
                <img src={img} style={{width:"408px", height:"300px"}}/>
            </div>
        </div>
        <h2>Some Featured Recipes:</h2>
        <AllRecipes/>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff"  d="M0,128L24,117.3C48,107,96,85,144,106.7C192,128,240,192,288,229.3C336,267,384,277,432,256C480,235,528,181,576,144C624,107,672,85,720,90.7C768,96,816,128,864,122.7C912,117,960,75,1008,85.3C1056,96,1104,160,1152,186.7C1200,213,1248,203,1296,186.7C1344,171,1392,149,1416,138.7L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
        </>
    );
}
import logo from '../assets/logo.png';
export default function Header(){
    return (
        <>
        <div className="navbar">
            <img className="logo" src={logo} />
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="">recipes</a></li>
                <li><a href="">add recipe</a></li>
                <li><a href="">cheffs</a></li>
                <li><a href="">profile</a></li>
            </ul>
        </div>
        </>
    );
}
import './styles.css';

import icons from "../../assets";
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar--options">
                <Link to="/">
                    <img src={icons.logo} alt="logo"/>
                    <img src={icons.logoRoam} alt="logo"/>
                </Link>
            </div>
            <div className="navbar--options">
                <NavLink end className={({ isActive }) => isActive ? 'active' : ''} to="/">
                    <h1>Where to charge</h1>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/roamer">
                    <h1>Become a roamer</h1>
                </NavLink>
            </div>
        </nav>
    )

}; 

export default Navbar; 
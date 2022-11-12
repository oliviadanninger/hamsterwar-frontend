import { useNavigate, useLocation } from "react-router-dom";
import '../STYLES/Nav.css';
import arrow from "../ASSETS/icons/arrow.svg";
import menu from "../ASSETS/icons/menu.svg";

function Nav() {

    const navigate = useNavigate();
    const location = useLocation()

    if (location.pathname === '/') {
      
        return null
    
    } else {
        return ( 
            <nav>
                <img onClick={() => navigate(-1)} src={arrow} />
                <img onClick={() => navigate('/')} src={menu}/>
            </nav> );
        }
}

export default Nav;
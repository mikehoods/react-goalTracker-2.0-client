import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from '../Auth0/LoginButton';
import Logout from '../Auth0/LogoutButton';

const Navbar = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <nav className="navbar">
            <h1>
                <span className="app-title-span">M</span>uch
                <span className="app-title-span">T</span>o
                <span className="app-title-span">D</span>o
            </h1>
            <div className="links">
                { isAuthenticated && <NavLink to="/" exact activeClassName="current">
                    <i className="material-icons">home</i>
                </NavLink> }
                { isAuthenticated && <NavLink to="/create" exact activeClassName="current">
                    <i className="material-icons">post_add</i>
                </NavLink> }
                { isAuthenticated && <NavLink to="/help" exact activeClassName="current">
                    <i className="material-icons">help</i>    
                </NavLink>}
                { isAuthenticated && <Logout /> }
            </div>
        </nav>
    );
}
 
export default Navbar;
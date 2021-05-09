import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from './Auth0/LoginButton';
import Logout from './Auth0/LogoutButton';

const Navbar = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <nav className="navbar">
            <h1>Much To Do</h1>
            <div className="links">
                <NavLink to="/" exact activeClassName="current"><i className="material-icons">home</i></NavLink>
                { isAuthenticated && <NavLink to="/create" exact activeClassName="current"><i className="material-icons">post_add</i></NavLink> }
                { isAuthenticated && <Logout /> }
                { !isAuthenticated && <LoginButton /> }               
            </div>

        </nav>
    );
}
 
export default Navbar;
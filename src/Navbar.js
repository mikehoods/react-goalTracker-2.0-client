import { NavLink } from 'react-router-dom';
import LoginButton from './Auth0/LoginButton';
import Logout from './Auth0/LogoutButton';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Much To Do</h1>
            <div className="links">
                <div className="login-div">
                    <LoginButton />
                </div>
                <div className="logged-in-div">
                    <NavLink to="/" exact activeClassName="current">Home</NavLink>
                    <NavLink to="/create" exact activeClassName="current">+ New Goal</NavLink>
                    <Logout />
                </div>
                
            </div>

        </nav>
    );
}
 
export default Navbar;
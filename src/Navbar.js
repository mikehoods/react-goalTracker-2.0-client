import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Much To Do</h1>
            <div className="links">
                <div className="login-div">
                    <p>Login</p>
                    <p>Signup</p>
                </div>
                <div className="logged-in-div">
                    <NavLink to="/" exact activeClassName="current">Home</NavLink>
                    <NavLink to="/create" exact activeClassName="current">+ New Goal</NavLink>
                    <p>Logout</p>
                </div>
                
            </div>

        </nav>
    );
}
 
export default Navbar;
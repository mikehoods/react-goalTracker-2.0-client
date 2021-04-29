import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Much To Do</h1>
            <div className="links">
                <NavLink to="/" exact activeClassName="current">Home</NavLink>
                <NavLink to="/create" exact activeClassName="current">Add New Goal</NavLink>
            </div>

        </nav>
    );
}
 
export default Navbar;
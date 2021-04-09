import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Goal Tracker</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">Add New Goal</Link>
            </div>

        </nav>
    );
}
 
export default Navbar;
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { isAuthenticated, logout } = useAuth0();

    return (
        <div className="logoutButton-div">
            { isAuthenticated && 
            <button 
                onClick={() => logout({ returnTo: window.location.origin })}>
                <i className="material-icons">logout</i>
            </button>}
        </div>
    );
}
 
export default LogoutButton;
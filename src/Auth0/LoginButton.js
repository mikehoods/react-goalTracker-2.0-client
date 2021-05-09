import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return (
        <div className="loginButton-div">
            { !isAuthenticated && <button onClick={loginWithRedirect}><i className="material-icons">login</i></button>}
        </div>
    );
}
 
export default LoginButton;
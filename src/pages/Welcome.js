import { useAuth0 } from '@auth0/auth0-react';

const Welcome = () => {
    const { loginWithRedirect } = useAuth0();
    return ( 
        <div className="welcome-div">
            <h1>We've all got so 
                <span className="app-title-uppercase"> M</span>
                <span className="app-title-lowercase">uch</span>
                <span className="app-title-uppercase">T</span>
                <span className="app-title-lowercase">o</span>
                <span className="app-title-uppercase">D</span>
                <span className="app-title-lowercase">o </span>
                these days
            </h1>
            <h3>Now you can keep track of all your to do lists in one place</h3>
            <h2>Please <span className="welcome-login" onClick={loginWithRedirect}>login</span> to continue</h2>
        </div> 
    );
}
 
export default Welcome;
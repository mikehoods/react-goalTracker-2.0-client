import { useAuth0 } from '@auth0/auth0-react';

const Welcome = () => {
    const { loginWithRedirect } = useAuth0();
    return ( 
        <div className="welcome-div">
            <h1>We've all got so <span className="welcome-title">Much To Do</span> these days</h1>
            <h3>Now you can keep track of all your to do lists in one place</h3>
            <h2>Please <span className="welcome-login" onClick={loginWithRedirect}>log in</span> to continue</h2>
        </div>
        
     );
}
 
export default Welcome;
import { useAuth0 } from '@auth0/auth0-react';

const Wrapper = ({ children }) => {
    const { isLoading, error } = useAuth0();
    return (
        <div>
            { isLoading && <div>Loading...</div> }
            { error && <div>Oops... {error.message}</div> }
            { children }
        </div> 
    );
}
 
export default Wrapper;
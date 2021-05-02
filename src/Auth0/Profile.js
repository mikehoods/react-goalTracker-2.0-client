import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user } = useAuth0();

    return ( 
        <div>Hello {user.name} </div>
     );
}
 
export default Profile;

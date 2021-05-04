import Welcome from './Welcome';
import GoalList from './GoalList';
import TagCloud from './TagCloud';
import useFetch from './useFetch';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
    const { data: goals, isLoading, error } = useFetch('https://much-to-do.herokuapp.com/todos')
    const { user, isAuthenticated } = useAuth0();

    return (
        <div className='home'>
                {/* Welcome page prior to log in */}
                { !isAuthenticated && <Welcome /> }

                {/* GoalList loads when logged in */}
                { isAuthenticated && <div>
                    {/* Conditionally render error message */}
                    { error && <div>{ error }</div> }

                    {/* Conditionally render isLoading or GoalList */}
                    { user && <h2>Welcome {user.name}</h2> }
                    { isLoading && <div>"Loading..."</div> }
                    { goals && <TagCloud goals={goals} />}
                    { goals && <GoalList goals={goals} />}
                </div>}
                
        </div>
    );
}
 
export default Home;
import Welcome from './Welcome';
import GoalList from './GoalList';
import TagCloud from './TagCloud';
import useFetch from './useFetch';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react'

const Home = () => {
    const { data, isLoading, error } = useFetch('https://much-to-do.herokuapp.com/todos')
    const { user, isAuthenticated } = useAuth0();
    const [goals, setGoals] = useState(null);

    useEffect(() => {
        console.log(user)
        if (data && user) {
            setGoals(data.filter(item => item.username === user.email))
        }
    }, [data, user])

    return (
        <div className='home'>
                {/* Welcome page prior to log in */}
                { !isAuthenticated && <Welcome /> }

                {/* GoalList loads when logged in */}
                { isAuthenticated && <div>
                    {/* Conditionally render error message */}
                    { error && <div>{ error }</div> }

                    {/* Conditionally render isLoading or GoalList */}
                    {/* { user && <h2 className="user-greeting">Greetings {user.given_name}</h2> } */}
                    { isLoading && <div>"Loading..."</div> }
                    { goals && <GoalList goals={goals} />}
                    { goals && <TagCloud goals={goals} />}
                    
                </div>}
                
        </div>
    );
}
 
export default Home;
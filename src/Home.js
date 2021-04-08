import { useState, useEffect } from 'react';
import GoalList from './GoalList';

const Home = () => {

    const [goals, setGoals] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/goals')
            .then(res => {
                if(!res.ok) {
                    throw Error("Could not fetch data for that resource")
                }
                return res.json();
            })
            .then(data => {
                setGoals(data)
                setIsLoading(false)
                setError(null)
            })
            .catch(err => {
                setIsLoading(false)
                setError(err.message)
            })
    }, []);

    return (
        <div className='home'>
            <div className='content'>
                {/* Conditionally render error message */}
                { error && <div>{ error }</div> }

                {/* Conditionally render isLoading or GoalList */}
                { isLoading && <div>"Loading..."</div> }
                { goals && <GoalList goals={goals} title="All Goals" /> } 
                { goals && <GoalList goals={goals.filter((goal) => goal.category === 'happiness')} title="Filtered Goals"/> }
            </div> 
        </div>
    );
}
 
export default Home;
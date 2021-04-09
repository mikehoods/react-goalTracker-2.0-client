import GoalList from './GoalList';
import useFetch from './useFetch';

const Home = () => {
    const { data: goals, isLoading, error } = useFetch('http://localhost:8000/goals')

    return (
        <div className='home'>
                {/* Conditionally render error message */}
                { error && <div>{ error }</div> }

                {/* Conditionally render isLoading or GoalList */}
                { isLoading && <div>"Loading..."</div> }
                { goals && <GoalList goals={goals} title="All Goals" /> } 
                { goals && <GoalList goals={goals.filter((goal) => goal.category === 'happiness')} title="Filtered Goals"/> } 
        </div>
    );
}
 
export default Home;
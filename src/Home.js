import GoalList from './GoalList';
import useFetch from './useFetch';

const Home = () => {
    const { data: goals, isLoading, error } = useFetch('https://much-to-do.herokuapp.com/todos')

    return (
        <div className='home'>
                {/* Conditionally render error message */}
                { error && <div>{ error }</div> }

                {/* Conditionally render isLoading or GoalList */}
                { isLoading && <div>"Loading..."</div> }
                { goals && <GoalList goals={goals} />} 
        </div>
    );
}
 
export default Home;
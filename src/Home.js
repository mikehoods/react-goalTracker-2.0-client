import Welcome from './Welcome';
import GoalList from './GoalList';
import TagCloud from './TagCloud';
import Loading from './Loading';
import useFetch from './useFetch';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react'

const Home = () => {
    const { data, isLoading, error } = useFetch('https://much-to-do.herokuapp.com/todos')
    const { user, isAuthenticated } = useAuth0();
    const [goals, setGoals] = useState(null);
    const [filteredGoals, setFilteredGoals] = useState(null)
    const [listHeader, setListHeader] = useState('All Goals')
    const [filterType, setFilterType] = useState("tag")
    const [filterInput, setFilterInput] = useState("")

    // Conditional rendering for filter goals buttons (all, current, achieved)
    const allActive = listHeader === 'All Goals' ?
        <button disabled className="active-button">all</button>
        : <button onClick={() => {handleFilter(goals, 'All Goals')}}>all</button>

    const currentActive = listHeader === 'Current Goals' ?
        <button disabled className="active-button">current</button>
        : <button onClick={() => {handleFilter(goals.filter(goal => !goal.achieved), 'Current Goals')}}>current</button>

    const achievedActive = listHeader === 'Achieved Goals' ?
        <button disabled className="active-button">achieved</button>
        : <button onClick={() => {handleFilter(goals.filter(goal => goal.achieved), 'Achieved Goals')}}>achieved</button>

    // Conditional rendering for filterType input
    const renderInput = (filterType) => {
        switch(filterType) {
            case "tag":
                return <input value={filterInput} type="text" onChange={(e) => setFilterInput(e.target.value)}/>;
            case "date":
                return <input type="date" onChange={(e) => setFilterInput(e.target.value)}/>;
            case "priority":
                return <select value={filterInput} onChange={(e) => setFilterInput(e.target.value)}>
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                </select>;
            case "difficulty":
                return <select value={filterInput} onChange={(e) => setFilterInput(e.target.value)}>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                    <option value="impossible">impossible</option>
                </select>;
            default:
                return "";
        }
    }

    useEffect(() => {
        if (goals) {
            if (filterType === "priority" || filterType === "difficulty") {
                setFilteredGoals(goals.filter(item => item[filterType] === filterInput))
            } else if (filterType === "tag") {
                setFilteredGoals(goals.filter(item => item.tags.indexOf(filterInput) !== -1))
            } else if (filterType === "date") {
                setFilteredGoals(goals.filter(item => item.createdAt.includes(filterInput)))
            }
            
            setListHeader(`Filtered by ${filterType}: ${filterInput}`)
        }
    }, [filterInput])

    useEffect(() => {
        if (filterType === "tag" || filterType === "date") {
            setFilterInput("")
        } else if (filterType === "priority") {
            setFilterInput("low")
        } else if (filterType === "difficulty") {
            setFilterInput('easy')
        }
    }, [filterType])

    useEffect(() => {
        console.log(user)
        if (data && user) {
            setGoals(data.filter(item => item.username === user.email))
            setFilteredGoals(data.filter(item => item.username === user.email))
        }
    }, [data, user])

    const handleFilter = (filterBy, headerText) => {
        setFilteredGoals(filterBy)
        setListHeader(headerText)
        setFilterType("tag")
        setFilterInput("")
    }

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
                    { isLoading && <Loading /> }
                    { filteredGoals && <div className="goal-list-header">
                        <h2>{listHeader}</h2>
                        <div>
                            {allActive}
                            {currentActive}
                            {achievedActive}
                        </div>
                        <div>
                            <p>filter todos by</p>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="tag">tag</option>
                                <option value="date">date</option>
                                <option value="priority">priority</option>
                                <option value="difficulty">difficulty</option>
                            </select>
                            {renderInput(filterType)}   
                        </div>                        
                    </div>}
                    { filteredGoals 
                        && <GoalList 
                            goals={filteredGoals} 
                            handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)} 
                    />}
                    { goals 
                        && <TagCloud 
                            goals={goals} 
                            handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)} 
                    />}
                </div>}
                
        </div>
    );
}
 
export default Home;
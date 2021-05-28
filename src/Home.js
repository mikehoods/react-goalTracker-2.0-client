import Welcome from './Welcome';
import Filters from './Filters';
import GoalList from './GoalList';
import TagCloud from './TagCloud';
import Loading from './Loading';
import Footer from './Footer';
import useFetch from './useFetch';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react'

const Home = () => {
    const { data, isLoading, error } = useFetch('https://much-to-do.herokuapp.com/todos')
    const { user, isAuthenticated } = useAuth0();
    const [goals, setGoals] = useState(null);
    const [filteredGoals, setFilteredGoals] = useState(null)
    const [listHeader, setListHeader] = useState('All Todos')
    const [filterType, setFilterType] = useState("tag")
    const [filterInput, setFilterInput] = useState("")

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
    const handleDynamicFilter = (filterBy, headerText) => {
        setFilteredGoals(filterBy)
        setListHeader(headerText)
    }
    const handleFilterType = (type) => {
        setFilterType(type)
    }

    const handleFilterInput = (input) => {
        setFilterInput(input)
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
                    { filteredGoals && <Filters
                            goals={goals} 
                            handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)}
                            handleDynamicFilter={(filterBy, headerText) => handleDynamicFilter(filterBy, headerText)}
                            handleFilterType={(type) => handleFilterType(type)}
                            handleFilterInput={(input) => handleFilterInput(input)}
                            filterType={filterType}
                            filterInput={filterInput}
                            listHeader={listHeader}
                    />}
                    { filteredGoals 
                        && <GoalList 
                            goals={goals}
                            filteredGoals={filteredGoals}
                            handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)} 
                    />}
                    { filteredGoals 
                        && <TagCloud 
                            goals={goals} 
                            handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)} 
                    />}
                    
                </div>}
                <Footer />
        </div>
    );
}
 
export default Home;
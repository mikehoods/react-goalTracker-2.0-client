import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

import Filters from '../components/Filters';
import Footer from '../layouts/Footer';
import GoalList from '../components/GoalList';
import Loading from '../components/Loading';
import TagCloud from '../components/TagCloud';
import useFetch from '../hooks/useFetch';
import Welcome from './Welcome';

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
    const handleFilterType = (type) => {setFilterType(type)}
    const handleFilterInput = (input) => {setFilterInput(input)}

    return (
        <div className='home'>
            { !isAuthenticated && <Welcome /> }

            {/* GoalList loads when logged in */}
            { isAuthenticated && <div>

                { error && <div>{ error }</div> }
                { isLoading && <Loading /> }

                { filteredGoals && <div>
                    <Filters
                        goals={goals} 
                        handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)}
                        handleDynamicFilter={(filterBy, headerText) => handleDynamicFilter(filterBy, headerText)}
                        handleFilterType={(type) => handleFilterType(type)}
                        handleFilterInput={(input) => handleFilterInput(input)}
                        filterType={filterType}
                        filterInput={filterInput}
                        listHeader={listHeader}
                    />
                    <GoalList 
                        goals={goals}
                        filteredGoals={filteredGoals}
                        handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)} 
                    />
                    <TagCloud 
                        goals={goals} 
                        handleFilter={(filterBy, headerText) => handleFilter(filterBy, headerText)} 
                    />
                </div>}   
            </div>}
            <Footer />
        </div>
    );
}
 
export default Home;
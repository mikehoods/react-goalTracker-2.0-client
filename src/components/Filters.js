import { useEffect } from 'react'

import formatDate from '../utils/formatDate';

const Filters = ({goals, handleFilter, handleDynamicFilter, handleFilterType, handleFilterInput, filterType, filterInput, listHeader}) => {

    // Conditional rendering for filter goals buttons (all, current, achieved)
    const allActive = listHeader === 'All Todos' ?
        <button disabled className="active-button">all</button>
        : <button className="inactive-button" onClick={() => {handleFilter(goals, 'All Todos')}}>all</button>

    const pendingActive = listHeader === 'Pending Todos' ?
        <button disabled className="active-button">pending</button>
        : <button className="inactive-button" onClick={() => {handleFilter(goals.filter(goal => !goal.achieved), 'Pending Todos')}}>pending</button>

    const completedActive = listHeader === 'Completed Todos' ?
        <button disabled className="active-button">completed</button>
        : <button className="inactive-button" onClick={() => {handleFilter(goals.filter(goal => goal.achieved), 'Completed Todos')}}>completed</button>

    // Conditional rendering for filterType input
    const renderInput = (filterType) => {
        switch(filterType) {
            case "tag":
                return <input 
                        value={filterInput}
                        type="text" 
                        onChange={(e) => handleFilterInput(e.target.value)}
                        />;
            case "date":
                return <input 
                        type="date" 
                        onChange={(e) => handleFilterInput(e.target.value)}
                        />;
            case "priority":
                return <select 
                        value={filterInput} 
                        onChange={(e) => handleFilterInput(e.target.value)}
                        >
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                </select>;
            case "difficulty":
                return <select 
                        value={filterInput} 
                        onChange={(e) => handleFilterInput(e.target.value)}
                        >
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                    <option value="impossible">impossible</option>
                </select>;
            default:
                return "";
        }
    }

    //Conditionally render correct listHeader and filteredGoals when filtering by tag, date, priority or difficulty
    useEffect(() => {
        if (goals) {
            if (filterInput === "") {
                return;
            }
            if (filterType === "priority" || filterType === "difficulty") {
                handleDynamicFilter(
                    goals.filter(item => item[filterType] === filterInput),
                    `Filtered by ${filterType}: ${filterInput}`
                )
            } else if (filterType === "tag") {
                handleDynamicFilter(
                    goals.filter(item => item.tags.indexOf(filterInput) !== -1),
                    `Filtered by: #${filterInput}`
                )
            } else if (filterType === "date") {
                handleDynamicFilter(
                    goals.filter(item => item.createdAt.includes(filterInput)),
                    `Filtered by ${filterType}: ${formatDate(filterInput)}`
                )
            }
            if (filterType === "date") {
                
            }
        }
    }, [filterInput])
    
    //Set filterInput field appropriately as filterType changes
    useEffect(() => {
        if (filterType === "tag" || filterType === "date") {
            handleFilterInput("")
        } else if (filterType === "priority") {
            handleFilterInput("low")
        } else if (filterType === "difficulty") {
            handleFilterInput('easy')
        }
    }, [filterType])

    return ( 
        <div className="goal-list-header">
            <h2>{listHeader}</h2>
            <div>
                {pendingActive}
                {completedActive}
                {allActive}
            </div>
            <div className="dynamic-filter">                            
                <p>Filter by </p>
                <select 
                    className="filterType-select"
                    value={filterType}
                    onChange={(e) => handleFilterType(e.target.value)}
                >
                    <option value="tag">tag</option>
                    <option value="date">date</option>
                    <option value="priority">priority</option>
                    <option value="difficulty">difficulty</option>
                </select>
                {renderInput(filterType)}   
            </div>                        
        </div>
     );
}
 
export default Filters;
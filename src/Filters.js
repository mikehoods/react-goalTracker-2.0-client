import { useEffect } from 'react'

const Filters = ({goals, handleFilter, handleDynamicFilter, handleFilterType, handleFilterInput, filterType, filterInput, listHeader}) => {

    //Format display date shown when filtering by date
    const formatDate = (date) => {
        date = new Date(date);
        const day = date.getDate() + 1;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`
    }

    // Conditional rendering for filter goals buttons (all, current, achieved)
    const allActive = listHeader === 'All Goals' ?
        <button disabled className="active-button">all</button>
        : <button className="inactive-button" onClick={() => {handleFilter(goals, 'All Goals')}}>all</button>

    const currentActive = listHeader === 'Current Goals' ?
        <button disabled className="active-button">current</button>
        : <button className="inactive-button" onClick={() => {handleFilter(goals.filter(goal => !goal.achieved), 'Current Goals')}}>current</button>

    const achievedActive = listHeader === 'Achieved Goals' ?
        <button disabled className="active-button">achieved</button>
        : <button className="inactive-button" onClick={() => {handleFilter(goals.filter(goal => goal.achieved), 'Achieved Goals')}}>achieved</button>

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
                            {currentActive}
                            {achievedActive}
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
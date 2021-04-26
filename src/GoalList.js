import { Link } from 'react-router-dom';
import { useState } from 'react';

const GoalList = ({goals, title}) => {

    const [filteredGoals, setFilteredGoals] = useState(goals)
    const [listHeader, setListHeader] = useState('All Your Current Goals')

    const goalComplete = (goal) => goal.achieved === true ?
    <i className="material-icons goal-achieved">done</i>
    : ""

    return (
        <div className="goal-list">
            <div className="goal-list-header">
                <h2>{listHeader}</h2>
                {filteredGoals !== goals && 
                    <button
                        className="clear-button" 
                        onClick={() => {
                            setFilteredGoals(goals)
                            setListHeader('All Your Current Goals')
                        }}
                    >Clear filters</button>}
                </div>
            {/* List of all or filtered goals */}
            {goals && filteredGoals.map((goal, index) => (
                <div className="goal-preview" key={index}>
                    <div className="goal-header">
                        <div className="goal-title">
                            <Link to={`/goals/${goal.id}`} className="goal-link">
                                <h2>{goal.title}</h2>
                            </Link>
                            {goalComplete(goal)}
                        </div>
                            <h3 className="goal-date">{goal.date}</h3>
                        </div>
                        {goal.tags.length > 0 && <div className="tag-cloud goal-tags">
                        {goal.tags.map((tag, index) => (
                            <p className="tag" 
                                key={index} 
                                onClick={() => {
                                    setFilteredGoals(goals.filter(goal => goal.tags.includes(tag)))
                                    setListHeader(`Filtered goals (#${tag})`)
                                }
                                }>#{tag}</p>
                        ))}
                    </div>}
                    <div className="goal-steps">
                        {goal.steps.map((step, i) => (
                            step.complete ?
                            <div className="goal-step goal-step-complete" key={i}>
                                <p className="goal-step-number">{i + 1}</p>
                                <p className="goal-step-text">{step.step}</p>
                                <i className="material-icons goal-step-check">check</i> 
                            </div>
                            :
                            <div className="goal-step goal-step-incomplete" key={i}>
                                <p className="goal-step-number">{i + 1}</p>
                                <p className="goal-step-text">{step.step}</p> 
                            </div>
                            
                        ))}
                    </div>
                        <div className="goal-footer">
                            <p>Priority: 
                                <span className="footer-span" 
                                    onClick={() => {
                                    setFilteredGoals(goals.filter(g => g.priority === goal.priority))
                                    setListHeader(`Filtered goals (Priority: ${goal.priority})`)
                                }}>
                                    {goal.priority}
                                </span>
                            </p>
                            <p>Difficulty:
                                <span className="footer-span"
                                    onClick={() => {
                                        setFilteredGoals(goals.filter(g => g.difficulty === goal.difficulty))
                                        setListHeader(`Filtered goals (Difficulty: ${goal.difficulty})`)
                                    }}>
                                    {goal.difficulty}
                                </span>
                            </p>
                        </div>
                    </div>
                ))} 
        </div>
    );
}
 
export default GoalList;
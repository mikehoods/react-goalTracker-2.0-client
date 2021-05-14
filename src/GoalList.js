import { Link } from 'react-router-dom';

const GoalList = ({goals, handleFilter}) => {
    const goalComplete = (goal) => goal.achieved ?
    <i className="material-icons goal-achieved">check_circle</i>
    : ""

    const formatDate = (date) => {
        date = new Date(date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`
    }

    return (
        <div className="goal-list">
            {/* Lists all or filtered goals */}
            {goals && goals.map((goal, index) => (
                <div className="goal-preview" key={index}>
                    <div className="goal-header">
                        <div className="goal-title">
                            <Link to={`/goals/${goal._id}`} className="goal-link">
                                <h2>{goal.title}</h2>
                            </Link>
                            {goalComplete(goal)}
                        </div>
                        <h3 className="goal-date"
                            onClick={() => {handleFilter(goals.filter(
                                g => formatDate(g.createdAt) === formatDate(goal.createdAt)), 
                                `Filtered by date: ${formatDate(goal.createdAt)}`
                                )
                            }}>{formatDate(goal.createdAt)}</h3>
                    </div>
                    {goal.tags.length > 0 && <div className="tag-cloud goal-tags">
                        {goal.tags.map((tag, index) => (
                            <p className="tag" 
                                key={index} 
                                onClick={() => {handleFilter(
                                    goals.filter(goal => goal.tags.includes(tag)),
                                    `Filtered by: #${tag}`
                                    )
                                }}>#{tag}
                            </p>
                        ))}
                    </div>}
                    <div className="goal-steps">
                        {goal.steps.map((step, i) => (
                            step.complete ?
                            <div className="goal-step goal-step-complete" key={i}>
                                <p className="goal-step-number">{i + 1}</p>
                                <p className="goal-step-text">{step.step}
                                    <i className="material-icons goal-step-check">check</i> 
                                </p>
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
                                    onClick={() => {handleFilter(
                                        goals.filter(g => g.priority === goal.priority), 
                                        `Filtered by priority: ${goal.priority}`
                                        )
                                }}>{goal.priority}
                                </span>
                            </p>
                            <p>Difficulty:
                                <span className="footer-span"
                                    onClick={() => {handleFilter(
                                        goals.filter(g => g.difficulty === goal.difficulty), 
                                        `Filtered by difficulty: ${goal.difficulty}`
                                        )
                                    }}>{goal.difficulty}
                                </span>
                            </p>
                        </div>
                    </div>
                ))} 
        </div>
    );
}
 
export default GoalList;
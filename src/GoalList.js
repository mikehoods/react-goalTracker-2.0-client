import { Link } from 'react-router-dom';

const GoalList = ({goals, title}) => {
    return (
        <div className="goal-list">
            <h2 className="home-h2">{title}</h2>
            {goals.map((goal, index) => (
                <Link to={`/goals/${goal.id}`} className="goal-link" key={index}>
                    <div className="goal-preview">
                        <div className="goal-header">
                            <h2>{goal.title}</h2>
                            <h3 className="goal-date">{goal.date}</h3>
                        </div>
                        {goal.tags.length > 0 && <div className="tag-cloud goal-tags">
                        {goal.tags.map((tag, index) => (
                            <p className="tag" key={index}>#{tag}</p>
                        ))}
                    </div>}
                    <div className="goal-steps">
                        {goal.steps.map((step, i) => (
                            <div className="goal-step" key={i}>
                                <p className="goal-step-number">{i + 1}</p>
                                <p>{step.step}</p>
                            </div>
                            
                        ))}
                    </div>
                        <div className="goal-footer">
                            <p>Priority: 
                                <span className="footer-span">
                                    {goal.priority}
                                </span>
                            </p>
                            <p>Difficulty:
                                <span className="footer-span">
                                    {goal.difficulty}
                                </span>
                            </p>
                        </div>
                    </div>
                </Link>
                ))} 
        </div>
    );
}
 
export default GoalList;
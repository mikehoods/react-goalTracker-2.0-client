import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "./useFetch";

const GoalDetails = () => {
    const { id } = useParams();
    const { data: goal, error, isLoading } = useFetch('http://localhost:8000/goals/' + id );
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/goals/' + goal.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return (
        <div className="goal-details">
            { isLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { goal && (
                <div className="goal-preview">
                    <div className="goal-header">
                        <div>
                            <h2>{goal.title}</h2>
                            <h3 className="goal-date">{goal.date}</h3>
                        </div>
                        <div className="goal-icons">
                            <Link to={`/edit/${goal.id}`}>
                                <i className = "material-icons">edit</i>
                            </Link>
                            <i className="material-icons" onClick={handleClick}>delete</i>
                            <i className="material-icons">done</i>
                        </div> 
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
                        <p>Priority: {goal.priority}</p>
                        <p>Difficulty: {goal.difficulty}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default GoalDetails;
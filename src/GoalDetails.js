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
                <div className="goal-container">
                    <div className="goal-header">
                        <div>
                            <h2>{goal.title}</h2>
                            <h3 className="goal-date">{goal.date}</h3>
                        </div>
                        <div className="goal-icons">
                            <Link to={`/edit/${goal.id}`}>
                                <i className = "material-icons">edit</i>
                            </Link>
                            <i className = "material-icons" onClick={handleClick}>delete</i>
                            <i className = "material-icons">done</i>
                        </div> 
                    </div>
                        <div className="goal-steps">
                            {goal.steps.map((step, i) => (
                                <p key={i}>{i + 1}. {step.step}</p>
                            ))}
                        </div>
                        <div className="tag-cloud">
                            {goal.tags.map((tag, index) => (
                                <p className="tag" key={index}>#{tag}</p>
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
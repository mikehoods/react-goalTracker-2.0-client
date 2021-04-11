import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const GoalDetails = () => {
    const { id } = useParams();
    const { data: goal, error, isLoading } = useFetch('http://localhost:8000/goals/' + id );

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
                            <i class = "material-icons">edit</i>
                            <i class = "material-icons">delete</i>
                            <i class = "material-icons">done</i>
                        </div> 
                    </div>
                        <div className="goal-steps">
                            {goal.steps.map((step, i) => (
                                <p key={i}>{i + 1}. {step.step}</p>
                            ))}
                        </div>
                        <div className="goal-footer">
                            <p>Category: {goal.category}</p>
                            <p>Priority: {goal.priority}</p>
                            <p>Difficulty: {goal.difficulty}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default GoalDetails;
import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import formatDate from "../utils/formatDate";
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";

const GoalDetails = () => {
    const { id } = useParams();
    const { data: goal, error, isLoading } = useFetch('https://much-to-do.herokuapp.com/todos/' + id );
    const history = useHistory();

    const [achieved, setAchieved] = useState(null);
    const [difficulty, setDifficulty] = useState("");
    const [priority, setPriority] = useState("");
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (goal) {
            setAchieved(goal.achieved)
            setDifficulty(goal.difficulty)
            setPriority(goal.priority)
            setSteps(goal.steps)
            setTags(goal.tags)
            setTitle(goal.title)
        }
    }, [goal])

    useEffect(() => {
        if (achieved !== null) updateGoal() 
    }, [achieved])

    const handleDelete = () => {
        fetch('https://much-to-do.herokuapp.com/todos/' + goal._id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    const handleCompleteStep = (e, index) => {
        setSteps([...steps], steps[index].complete = !steps[index].complete)
        const checkAchievement = steps.filter(step => step.complete === false)
        checkAchievement.length > 0 ? setAchieved(false) : setAchieved(true)
        updateGoal()
    }

    const handleAchieved = (e) => {
        if (achieved) {
            setAchieved(false);
            setSteps([...steps], 
                steps.forEach(step => { 
                    step.complete = false
                })
            )
        } else {
            setAchieved(true)
            setSteps([...steps],
                steps.forEach(step => {
                    step.complete = true
                })
            )
        }        
    }
    const updateGoal = () => {
        const updatedGoal = { title, difficulty, priority, steps, achieved, tags }
        fetch('https://much-to-do.herokuapp.com/todos/' + goal._id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        }).then(() => {
            console.log('goal updated');
        })
    }

    const isAchieved = achieved ? "check_circle" : "done"

    return (
        <div className="goal-details">
            { isLoading && <Loading /> }
            { error && <div>{ error }</div> }

            { goal && (
                <div className="goal-preview">
                    <div className="goal-header">
                        <div>
                            <h2>{goal.title}</h2>
                            <h3 className="goal-date">{formatDate(goal.createdAt)}</h3>
                        </div>
                        <div className="goal-icons">
                            <Link to={`/edit/${goal._id}`}>
                                <i className = "material-icons">edit_note</i>
                            </Link>
                            <i className="material-icons" onClick={handleDelete}>delete</i>
                            <i className="material-icons goal-achieved" onClick={handleAchieved}>{isAchieved}</i>
                        </div> 
                    </div>
                    {goal.tags.length > 0 && <div className="tag-cloud goal-tags">
                        {goal.tags.map((tag, index) => (
                            <p className="tag" key={index}>#{tag}</p>
                        ))}
                    </div>}
                    <div className="goal-steps">
                        {goal.steps.map((step, i) => (
                            step.complete ?
                            <div className="goal-step goal-step-complete" key={i}>
                                <p className="goal-step-number">{i + 1}</p>
                                <p className="goal-step-text" onClick={(e) => handleCompleteStep(e, i)}>{step.step}
                                    <i className="material-icons goal-step-check">check</i>
                                </p>
                                
                            </div>
                            :
                            <div className="goal-step goal-step-incomplete" key={i}>
                                <p className="goal-step-number">{i + 1}</p>
                                <p className="goal-step-text" onClick={(e) => handleCompleteStep(e, i)}>{step.step}</p> 
                            </div>
                        ))}
                    </div>   
                    <div className="goal-footer">
                        <p>Priority: 
                            <span className="footer-span">{goal.priority}</span>
                        </p>
                        <p>Difficulty: 
                            <span className="footer-span">{goal.difficulty}</span>
                        </p>
                    </div>
                </div>
            )}
        </div> 
    );
}
 
export default withAuthenticationRequired(GoalDetails, {
    onRedirecting: () => (<div className="redirecting">Redirecting to the login page...</div>)
});
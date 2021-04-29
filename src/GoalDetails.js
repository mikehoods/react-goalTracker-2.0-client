import { useParams, useHistory, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import useFetch from "./useFetch";

const GoalDetails = () => {
    const { id } = useParams();
    const { data: goal, error, isLoading } = useFetch('http://localhost:8000/goals/' + id );
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [priority, setPriority] = useState("");
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);
    const [achieved, setAchieved] = useState(null);
    const [date, setDate] = useState("")

    useEffect(() => {
        if (goal) {
            setTitle(goal.title)
            setDifficulty(goal.difficulty)
            setPriority(goal.priority)
            setSteps(goal.steps)
            setTags(goal.tags)
            setAchieved(goal.achieved)
            setDate(goal.date)
        }
        
    }, [goal])

    useEffect(() => {
        if (achieved !== null) 
        updateGoal()
    }, [achieved])

    const handleDelete = () => {
        fetch('http://localhost:8000/goals/' + goal.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    const handleCompleteStep = (e, index) => {
        setSteps([...steps], steps[index].complete = !steps[index].complete)
        const checkAchievement = steps.filter(step => step.complete === false)
        if (checkAchievement.length > 0) {
            setAchieved(false)
        } else {
            setAchieved(true)
        }
        updateGoal()
    }

    const handleAchieved = (e) => {
        if (achieved) {
            setAchieved(false);
            setSteps([...steps], 
                steps.map(step => { 
                    step.complete = false
                })
            )
        } else {
            setAchieved(true)
            setSteps([...steps],
                steps.map(step => {
                    step.complete = true
                })
            )
        }        
    }
    const updateGoal = () => {
        const updatedGoal = { title, difficulty, priority, steps, achieved, tags, date }

        fetch('http://localhost:8000/goals/' + goal.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        }).then(() => {
            console.log('goal updated');
        })
    }

    const isAchieved = achieved ?
    <i className="material-icons goal-achieved" onClick={handleAchieved}>done</i>
    :
    <i className="material-icons goal-unachieved" onClick={handleAchieved}>done</i>

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
                            <i className="material-icons" onClick={handleDelete}>delete</i>
                            {isAchieved}
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
                                <p className="goal-step-text" onClick={(e) => handleCompleteStep(e, i)}>{step.step}</p>
                                <i className="material-icons goal-step-check">check</i>
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
            )}
        </div>
    );
}
 
export default GoalDetails;
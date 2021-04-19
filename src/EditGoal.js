import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const EditGoal = () => {
    const { id } = useParams();
    const { data: goal, error, isLoading } = useFetch('http://localhost:8000/goals/' + id );
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [priority, setPriority] = useState("");
    const [tempStep, setTempStep] = useState("");
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);

    const [isPending, setIsPending] = useState(false);

    const stepList = steps.map((step, index) => (
        <div key={index}>
            <label>Step {index + 1}:</label>
            <div className="form-step">
                <input
                    type="text"
                    value={step.step}
                    onChange={(e) => handleStepChange(e, index)}
                />
                <i className="material-icons" onClick={(e) => handleDeleteStep(e, index)}>delete</i>
            </div> 
        </div>  
    ))

    useEffect(() => {
        if (goal) {
            setTitle(goal.title)
            setDifficulty(goal.difficulty)
            setPriority(goal.priority)
            setSteps(goal.steps)
            setTags(goal.tags)
        }
    }, [goal])

    const handleClick = () => {
        fetch('http://localhost:8000/goals/' + goal.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    const handleAddTag = (e) => {
        const currentTag = e.target.value.replace(/[, ]+/g, "").trim()
        if (e.key === ',' && currentTag) {
            if (!tags.includes(currentTag)) {
                setTags([...tags, currentTag])
                console.log(tags)
            }
            e.target.value = ""
        }
        if (!currentTag) {
            e.target.value = ""
        } 
    }

    const handleAddStep = (e) => {
        const step = { "step": tempStep, "complete": false }
        setSteps([...steps, step])
        setTempStep("")
        console.log(steps)
    }

    const handleDeleteStep = (e, index) => {
        setSteps(steps => steps.filter((step, i) => i !== index))
        console.log(steps)
    }

    const handleStepChange = (e, index) => {
        setSteps([...steps], steps[index].step = e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const updatedGoal = { title, difficulty, priority, steps, tags }
        
        setIsPending(true);

        fetch('http://localhost:8000/goals/' + goal.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        }).then(() => {
            console.log('goal updated');
            setIsPending(false);
            history.push('/goals/' + goal.id);
        })
    }

    return (
        goal && <div className="create-goal">
        <h2>Edit Goal</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-main">
                <label>Goal name:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="form-selectors">
                    <div className="selector">
                        <p>Difficulty: </p>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                            <option value="impossible">impossible</option>
                        </select>
                    </div>
                    <div className="selector">
                        <p>Priority: </p>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                </div>
                {stepList}                
                <p className="add-step" onClick={handleAddStep}>+ Add Step</p>
                <label>Tags:</label>
            <input
                type="text"
                id="add-tag"
                onKeyUp={handleAddTag}
            />
            <p className="input-help">Press "," (comma) to add tag</p>
            <div className="tag-cloud">
                {tags.map((tag, index) => (
                    <p className="tag" key={index}>#{tag}</p>
                ))}
            </div>
            </div>
            
            <div className="create-goal-footer">
                {!isPending && <button>Edit Goal</button>}
                {isPending && <button disabled>Editing goal...</button>}
            </div>
        </form>
    </div>
    )
}
 
export default EditGoal;
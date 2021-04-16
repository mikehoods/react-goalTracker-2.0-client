import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const EditGoal = () => {
    const { id } = useParams();
    const { data: goal, error, isLoading } = useFetch('http://localhost:8000/goals/' + id );
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [priority, setPriority] = useState("low");
    const [tempStep, setTempStep] = useState("");
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);

    const [isPending, setIsPending] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault()
        
        
        const achieved = false
        const goal = { title, difficulty, priority, steps, achieved, tags }
        
        setIsPending(true);

        fetch('http://localhost:8000/goals', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(goal)
        }).then(() => {
            console.log('new goal added');
            setIsPending(false);
            history.push('/');
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
                    value={goal.title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="form-selectors">
                    <div className="selector">
                        <p>Difficulty: </p>
                        <select
                            value={goal.difficulty}
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
                            value={goal.priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                </div>
                {goal.steps.map((step, index) => (
                    <div>
                        <label>Step {index + 1}:</label>
                        <input
                        type="text"
                        value={step.step}
                        onChange={(e) => setTempStep(e.target.value)}
                        />
                    </div>
                    
                    
                ))}
                
                <p className="add-step" onClick={handleAddStep}>+ Add Step</p>
                {steps.length > 0 && <div className="created-steps">
                    {steps.map((step, index) => (
                        <p className="created-step" key={index}>{index + 1}. {step.step}</p>
                    ))}
                </div>}
                <label>Tags:</label>
            <input
                type="text"
                id="add-tag"
                onKeyUp={handleAddTag}
            />
            <p className="input-help">Press "," (comma) to add tag</p>
            <div className="tag-cloud">
                {goal.tags.map((tag, index) => (
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
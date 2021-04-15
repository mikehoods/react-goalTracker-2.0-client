import { useState } from 'react';
import { useHistory } from 'react-router-dom'

const CreateGoal = () => {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [priority, setPriority] = useState("low");
    const [step, setStep] = useState("");
    const [tags, setTags] = useState([]);

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleAddTag = (e) => {
        console.log("key:" + e.key)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const steps = [{ "step": step, "complete": false }]
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
        <div className="create-goal">
            <h2>Create a New Goal</h2>
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
                    <label>Step 1:</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setStep(e.target.value)}
                    />
                    <p className="add-step">+ Add Step</p>
                </div>
                <label>Tags:</label>
                <input
                    type="text"
                    id="add-tag"
                    // value={tempTag}
                    // onChange={(e) => setTempTag(e.target.value)}
                    onKeyUp={handleAddTag}
                />
                <div className="tags">
                    {tags.map((tag, index) => (
                        <p key={index}>#{tag}</p>
                    ))}
                </div>
                <div className="create-goal-footer">
                    {!isPending && <button>Create Goal</button>}
                    {isPending && <button disabled>Adding goal...</button>}
                </div>
            </form>
        </div>
    );
}
 
export default CreateGoal;
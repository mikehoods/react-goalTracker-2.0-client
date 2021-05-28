import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from './Loading';

const EditGoal = () => {
    const { id } = useParams();
    const { data: goal, error, isLoading } = useFetch('https://much-to-do.herokuapp.com/todos/' + id );
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [priority, setPriority] = useState("");
    const [tempStep, setTempStep] = useState("");
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsInput, setTagsInput] = useState([]);
    const [achieved, setAchieved] = useState(null);

    const [isPending, setIsPending] = useState(false);

    const stepList = steps.map((step, index) => (
        <div key={index}>
            <label>Step {index + 1}</label>
            <div className="form-step">
                <input
                    type="text"
                    required
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
            setAchieved(goal.achieved)
        }
    }, [goal])

    useEffect(() => {
        if (goal) {
            setTagsInput("#" + goal.tags.join("#").replace(/[#]+/g, " #"))
        }
    }, [goal])

    const handleTags = (e) => {
        setTagsInput(e.target.value)
        const tempTags = new Set(e.target.value.replace(/[ ]+/g, "").trim().split("#"))
        tempTags.delete("")
        setTags([...tempTags])
    }

    const handleAddStep = (e) => {
        const step = { "step": tempStep, "complete": false }
        setSteps([...steps, step])
        setTempStep("")
    }

    const handleDeleteStep = (e, index) => {
        setSteps(steps => steps.filter((step, i) => i !== index))
    }
    const handleDeleteTag = (e, index) => {
        setTags(tags => tags.filter((tag, i) => i !== index))
        const newTagsInput = tagsInput.replace("#" + tags[index], "")
        setTagsInput(newTagsInput.replace("  ", " "))
    }
    const handleStepChange = (e, index) => {
        setSteps([...steps], steps[index].step = e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedGoal = { title, difficulty, priority, steps, tags, achieved }
        setIsPending(true);

        fetch('https://much-to-do.herokuapp.com/todos/' + goal._id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        }).then(() => {
            console.log('goal updated');
            setIsPending(false);
            history.push('/goals/' + goal._id);
        })
    }

    return (
        goal && <div className="create-goal">
        <h2>Edit Todo</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-main">
                <label>Todo Name</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="form-selectors">
                    <div className="selector">
                        <p>Difficulty</p>
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
                        <p>Priority</p>
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
                <div className="add-step">
                    <i className=" material-icons" onClick={handleAddStep}>add_to_photos</i>
                </div>
                <label>Tags</label>
            <input
                type="text"
                value={tagsInput}
                id="add-tag"
                onChange={handleTags}
            />
            <p className="input-help">Separate tags with #</p>
            {tags.length > 0 && <div className="tag-cloud">
                    {tags.map((tag, index) => (
                        <div className="tag-div" key={index}>
                            <p className="tag">#{tag}</p>
                            <i className="material-icons tag-icon" onClick={(e) => handleDeleteTag(e, index)}>delete</i>
                        </div>               
                    ))}
                </div>}
            </div>
            
            <div className="create-goal-footer">
                {!isPending && <button>Edit Todo</button>}
                {isPending && <Loading />}
            </div>
        </form>
    </div>
    )
}
 
export default withAuthenticationRequired(EditGoal, {
    onRedirecting: () => (<div className="redirecting">Redirecting to the login page...</div>)
});
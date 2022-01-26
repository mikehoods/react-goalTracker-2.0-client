import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Difficulty from '../components/forms/selectors/Difficulty';
import Loading from '../components/Loading';
import Priority from '../components/forms/selectors/Priority';
import TagList from '../components/forms/TagList';
import TextInput from '../components/forms/TextInput';
import StepList from '../components/forms/StepList';
import useFetch from "../hooks/useFetch";

const EditGoal = () => {
    const { id } = useParams();
    const { data: goal } = useFetch('https://much-to-do.herokuapp.com/todos/' + id );
    const history = useHistory();

    const [achieved, setAchieved] = useState(null);
    const [difficulty, setDifficulty] = useState("");
    const [priority, setPriority] = useState("");
    const [steps, setSteps] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsInput, setTagsInput] = useState([]);
    const [tempStep, setTempStep] = useState("");
    const [title, setTitle] = useState("");

    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (goal) {
            setAchieved(goal.achieved)
            setDifficulty(goal.difficulty)
            setPriority(goal.priority)
            setSteps(goal.steps)
            setTags(goal.tags)
            setTagsInput("#" + goal.tags.join("#").replace(/[#]+/g, " #"))
            setTitle(goal.title)
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
    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedGoal = { title, difficulty, priority, steps, tags, achieved }
        setIsPending(true);

        fetch('https://much-to-do.herokuapp.com/todos/' + goal._id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGoal)
        }).then(() => {
            setIsPending(false);
            history.push('/goals/' + goal._id);
        })
    }

    return (
        goal && <div className="create-goal">
        <h2>Edit Todo</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-main">
                <TextInput
                    label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    value={title}
                />
                <div className="form-selectors">
                    <Difficulty
                        onChange={(e) => setDifficulty(e.target.value)}
                        value={difficulty}
                    />
                    <Priority
                        onChange={(e) => setPriority(e.target.value)}
                        value={priority}
                    />
                </div>
                <StepList
                    setSteps={setSteps}
                    steps={steps}
                />                
                <div className="add-step">
                    <i className=" material-icons" onClick={handleAddStep}>add_to_photos</i>
                </div>
                <TextInput
                    id="add-tag"
                    label="Tags"
                    onChange={handleTags}
                    value={tagsInput}
                />
                <p className="input-help">Separate tags with #</p>
                {tags.length > 0 && <TagList 
                    setTagsInput={setTagsInput}
                    setTags={setTags}
                    tagsInput={tagsInput}
                    tags={tags}
                />}
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
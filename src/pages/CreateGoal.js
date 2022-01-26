import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import Difficulty from '../components/forms/selectors/Difficulty';
import Loading from '../components/Loading';
import Priority from '../components/forms/selectors/Priority';
import StepList from '../components/forms/StepList';
import TextInput from '../components/forms/TextInput';
import TagList from '../components/forms/TagList';

const CreateGoal = () => {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [priority, setPriority] = useState("low");
    const [tempStep, setTempStep] = useState("");
    const [steps, setSteps] = useState([{"step": "", "complete": false}]);
    const [tags, setTags] = useState([]);
    const [tagsInput, setTagsInput] = useState("");

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const { user } = useAuth0();

    const handleTags = (e) => {
        setTagsInput(e.target.value)
        const tempTags = new Set(e.target.value.replace(/[ ]+/g, "").trim().split("#"))
        tempTags.delete("")
        setTags([...tempTags])
    }
    const handleAddStep = (e) => {
        setTempStep("")
        const step = { "step": tempStep, "complete": false }
        setSteps([...steps, step])
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const achieved = false
        const username = await user.email
        const goal = { title, difficulty, priority, steps, achieved, tags, username }
        
        setIsPending(true);

        fetch('https://much-to-do.herokuapp.com/todos/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(goal)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        })
    }

    return (
        <div className="create-goal">
            <h2>Create A New Todo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-main">
                    <TextInput
                        label="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        value={title}
                    />
                    <div className="form-selectors">
                        <Difficulty value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                        <Priority value={priority} onChange={(e) => setPriority(e.target.value)} />
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
                    {!isPending && <button>Create Todo</button>}
                    {isPending && <Loading />}
                </div>
            </form>
        </div>
    );
}
 
export default withAuthenticationRequired(CreateGoal, {
    onRedirecting: () => (<div className="redirecting">Redirecting to the login page...</div>)
});
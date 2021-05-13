import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';

const CreateGoal = () => {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [priority, setPriority] = useState("low");
    const [tempStep, setTempStep] = useState("");
    const [steps, setSteps] = useState([{"step": "", "complete": false}]);
    const [tags, setTags] = useState([]);
    // const [username, setUsername] = useState("");

    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const { user } = useAuth0();

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

    const stepList = steps.map((step, index) => (
        <div key={index}>
            <label>Step {index + 1}:</label>
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

    const handleStepChange = (e, index) => {
        setSteps([...steps], steps[index].step = e.target.value)
    }

    const handleAddStep = (e) => {
        setTempStep("")
        const step = { "step": tempStep, "complete": false }
        setSteps([...steps, step])
    }

    const handleDeleteStep = (e, index) => {
        setSteps(steps => steps.filter((step, i) => i !== index))
        console.log(steps)
    }

    const handleDeleteTag = (e, index) => {
        setTags(tags => tags.filter((tag, i) => i !== index))
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
            console.log('new goal added');
            setIsPending(false);
            history.push('/');
        })
    }

    return (
        <div className="create-goal">
            <h2>Create A New Goal</h2>
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
                    <i className="add-step material-icons" onClick={handleAddStep}>add_to_photos</i>
                    <label>Tags:</label>
                <input
                    type="text"
                    id="add-tag"
                    onKeyUp={handleAddTag}
                />
                <p className="input-help">Press "," (comma) to add new tag</p>
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
                    {!isPending && <button>Create Goal</button>}
                    {isPending && <Loading />}
                </div>
            </form>
        </div>
    );
}
 
export default withAuthenticationRequired(CreateGoal, {
    onRedirecting: () => (<div>Redirecting to the login page...</div>)
});
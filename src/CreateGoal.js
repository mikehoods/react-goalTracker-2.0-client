const CreateGoal = () => {
    return (
        <div className="create-goal">
            <h2>Create a New Goal</h2>
            <form>
                <div className="form-main">
                <label>Goal name:</label>
                <input
                    type="text"
                    required
                />
                <label>Step 1:</label>
                <input
                    type="text"
                    required
                />
                <p className="add-step">+ Add Step</p>
                <p>Difficulty: </p>
                <select>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                    <option value="impossible">impossible</option>
                </select>
                <p>Priority: </p>
                <select>
                    <option value="easy">low</option>
                    <option value="medium">medium</option>
                    <option value="hard">high</option>
                </select>
                </div>
                
                <div className="create-goal-footer">
                    <button>Create Goal</button>
                </div>
            </form>
        </div>
    );
}
 
export default CreateGoal;
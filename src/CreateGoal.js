import { useState } from 'react';
import { useForm, useFieldArray} from 'react-hook-form';

const CreateGoal = () => {
    const [title, setTitle] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [priority, setPriority] = useState("")
    // const [steps, setSteps] = useState(["", "", ""])

    const StepList = () => {
        const { control, register } = useForm();
        const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
          control, // control props comes from useForm (optional: if you are using FormContext)
          name: "steps", // unique name for your Field Array
          // keyName: "id", default to "id", you can change the key name
        });
      
        return (
            <form>
            <p>All steps</p>
          {fields.map((field, index) => (
            <input
              key={field.id} // important to include key with field's id
              {...register(`steps.${index}.value`)} 
              defaultValue={field.value} // make sure to include defaultValue
            />
          ))}
          
          </form>
        );
      }

        // const stepList =
        // steps.map((step, index) => {
        //     return (
        //         <div key={index} className="input-field">
        //             <label htmlFor="steps">Step {index+1}</label>
        //             <div className="input-step">
        //                 <input 
        //                     id="steps"
        //                     type="text"
        //                     value={step} 
        //                     onChange={(e) => {
        //                         console.log(steps)
        //                         setSteps(...steps, steps[index] = e.target.value)
        //                         console.log(steps)
        //                     }}
        //                 />
        //             </div>
        //         </div>
        //     )
        // })

    return (
        <div className="create-goal">
            <h2>Create a New Goal</h2>
            <form>
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
                    />
                    <p className="add-step">+ Add Step</p>
                </div>
                {/* {stepList}             */}
                <StepList />
                <div className="create-goal-footer">
                    <button>Create Goal</button>
                </div>
            </form>
        </div>
    );
}
 
export default CreateGoal;
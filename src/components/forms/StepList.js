import StepInput from './StepInput';

function StepList({ setSteps, steps }) {
    const handleStepChange = (e, index) => {
        setSteps([...steps], steps[index].step = e.target.value)
    }

    return (
        steps.map((step, index) => (
            <div key={index}>
                <StepInput
                    index={index}
                    label={`Step ${index + 1}`}
                    onChange={(e) => handleStepChange(e, index)}
                    required
                    setSteps={setSteps}
                    value={step.step}                 
                />    
            </div>
        ))
    )
}

export default StepList
import React from 'react'

function StepInput({index, label, onChange, setSteps, value, ...otherprops}) {
    const handleDeleteStep = (e, index) => {
        setSteps(steps => steps.filter((step, i) => i !== index))
    }

    return (
        <div>
            <label>{label}</label>
            <div className="form-step">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    {...otherprops}
                />
                <i className="material-icons" onClick={(e) => handleDeleteStep(e, index)}>delete</i>
            </div>
            
        </div>
    )
}

export default StepInput
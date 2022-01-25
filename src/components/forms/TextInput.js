import React from 'react'

function TextInput({label, onChange, value, ...otherprops}) {
    return (
        <div>
            <label>{label}</label>
            <input
            type="text"
            value={value}
            onChange={onChange}
            {...otherprops}
            />
        </div>
    )
}

export default TextInput

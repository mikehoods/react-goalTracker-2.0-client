import React from 'react'

function Difficulty({ value, onChange }) {
    return (
        <div className="selector">
            <p>Difficulty</p>
            <select
                value={value}
                onChange={onChange}
            >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
                <option value="impossible">impossible</option>
            </select>
        </div>
    )
}

export default Difficulty

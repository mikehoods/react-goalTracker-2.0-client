import React from 'react'

function Priority({ value, onChange }) {
    return (
        <div className="selector">
        <p>Priority</p>
            <select
                value={value}
                onChange={onChange}
            >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
    </div>
    )
}

export default Priority

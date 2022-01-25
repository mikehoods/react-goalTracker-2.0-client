import React from 'react'

function TagList({ setTags, tags, tagsInput, setTagsInput }) {
    const handleDeleteTag = (e, index) => {
        setTags(tags => tags.filter((tag, i) => i !== index))
        const newTagsInput = tagsInput.replace("#" + tags[index], "")
        setTagsInput(newTagsInput.replace("  ", " "))
    }

    return (
        <div className="tag-cloud">
            {tags.map((tag, index) => (
                <div className="tag-div" key={index}>
                    <p className="tag">#{tag}</p>
                    <i className="material-icons tag-icon" onClick={(e) => handleDeleteTag(e, index)}>delete</i>
                </div> 
            ))}
        </div>
    )
}

export default TagList

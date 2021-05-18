import { useState, useEffect } from 'react'

const TagCloud = ({ goals, handleFilter }) => {
    const [userGoals, setUserGoals] = useState([])
    const [userTags, setUserTags] = useState([])
    
    useEffect(() => {
        setUserGoals(goals.filter(g => g.username === "mhood82@gmail.com"))
    }, [goals])
    
    useEffect(() => {
        const tagSet = new Set()
    
        userGoals.forEach(item => {
            item.tags.forEach(tag => tagSet.add(tag))
        })
    
        setUserTags([...tagSet])
    }, [userGoals])

    return (
        <div className="tag-container">
            { userTags.length > 0 && <div className="tag-cloud">
                {userTags.map((tag, index) => (
                    <p key={index}
                        className="allTags-tag"
                        onClick={() => handleFilter(
                            goals.filter(goal => goal.tags.includes(tag)), 
                            `Filtered by: #${tag}`)}
                    >#{tag}
                    </p>
                ))}
            </div>}
        </div>  
     );
}
 
export default TagCloud;
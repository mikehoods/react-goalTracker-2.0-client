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
            <div className="tag-cloud">
                {goals.length > 0 && userTags.map((tag, index) => (
                    <p key={index}
                        className="allTags-tag"
                        onClick={() => handleFilter(
                            goals.filter(goal => goal.tags.includes(tag)), 
                            `Filtered goals (#${tag})`)}>#{tag}
                    </p>
                ))}
            </div>
        </div>   
     );
}
 
export default TagCloud;
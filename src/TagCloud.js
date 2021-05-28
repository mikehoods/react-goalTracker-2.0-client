import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const TagCloud = ({ goals, handleFilter }) => {
    const [userGoals, setUserGoals] = useState([])
    const [userTags, setUserTags] = useState([])
    const { user } = useAuth0();

    useEffect(() => {
        setUserGoals(goals.filter(g => g.username === user.email))
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
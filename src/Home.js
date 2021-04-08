import { useState } from 'react';

const Home = () => {

    const [goals, setGoals] = useState([
        {
            title: "Make a new app", 
            date: "4/7/2021", 
            steps: [ 
                { step: "Design front end", complete: false },
                { step: "Set up backend", complete: false },
                { step: "Troubleshoot and fix bugs", complete: false },
                { step: "Deploy", complete: false}
            ],
            achieved: false,
            difficulty: 'hard',
            priority: 'high',
            category: 'work'
        },
        {
            title: "Clean out greenhouse", 
            date: "4/7/2021", 
            steps: [ 
                { step: "Give plants away", complete: false },
                { step: "Get rid of junk", complete: false },
                { step: "Organize remaining plants", complete: false },
                { step: "Pull weeds", complete: false}
            ],
            achieved: false,
            difficulty: 'moderate',
            priority: 'medium',
            category: 'home'
        },
        {
            title: "Get back into writing", 
            date: "4/7/2021", 
            steps: [ 
                { step: "Brainstorm blog", complete: false },
                { step: "Start keeping journal", complete: false },
                { step: "Stop making excuses", complete: false }
            ],
            achieved: false,
            difficulty: 'easy',
            priority: 'moderate',
            category: 'happiness'
        }
    ])

    return (
        <div className='home'>
            <div className='content'>
                <h2 className="home-h2">Current Goals</h2>
                {goals.map((goal, index) => (
                    <div key={index} className="goal-preview">
                        <div className="goal-header">
                            <h2>{goal.title}</h2>
                            <h3 className="goal-date">{goal.date}</h3>
                        </div>
                        <div className="goal-steps">
                            {goal.steps.map((step, i) => (
                                <p key={i}>{i + 1}. {step.step}</p>
                            ))}
                        </div>
                        <div className="goal-footer">
                            <p>Category: {goal.category}</p>
                            <p>Priority: {goal.priority}</p>
                            <p>Difficulty: {goal.difficulty}</p>
                        </div>
                    </div>
                ))}   
            </div> 
        </div>
    );
}
 
export default Home;
const GoalList = ({goals, title}) => {
    return (
        <div className="goal-list">
            <h2 className="home-h2">{title}</h2>
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
    );
}
 
export default GoalList;
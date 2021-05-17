const Help = () => {
    return ( 
        <div className="help">
            <h1>How Do You Todo?</h1>
            <p>MuchToDo offers a way to keep track of all your todo lists in one place.</p>
            <h3>Filtering</h3>
            <p>From the home screen you can filter your list of todos in a variety of ways. Use the filter buttons to switch between all, current, or completed todos. Below that is a dynamic filter input where you can choose to filter your todos by tag, date, priority or difficulty.</p>
            <p>While on the home page, you can also click on any of those elements within a specific todo to filter the entire list (i.e. Click on the date of a todo and you will get a list of all todos created on that date.</p>
            <p>Use the main filter buttons (all, current, or completed) to get back to the rest of your todos.</p>
            <h3>Updating</h3>
            <p>To update your todos, click on the title of the todo you would like to update from the home page. From there, you can click on a specific step to mark it complete or revert it to incomplete. You can also click on the checkmark next to the title to mark the entire todo as complete or no longer complete. </p>
            <p>Use the notepad icon to edit more specific details of your todo list. You can add or delete steps and tags as needed, or update any other elements of that todo.</p>
            <p>If you like, you can also delete your entire todo here by clicking on the trashcan icon.</p>

            <h3>Contact</h3>
            <p className="help-contact">If you have any other questions or feedback, please reach out:
                <a href="mailto:mhood82@gmail.com" target="_blank">
                    <i className="material-icons">mail_outline</i>
                </a>
            </p>
        </div>
     );
}
 
export default Help;
const Help = () => {
    return ( 
        <div className="help">
            <h1>How Do You Todo?</h1>
            <p>MuchToDo offers a way to keep track of all your todo lists in one place.</p>
            <h3>Filtering</h3>
            <p>From the home screen you can filter your todo lists in a variety of ways. Use the filter buttons to switch between all, pending, or completed lists. Below that is a dynamic filter input to filter your lists by tag, date, priority or difficulty.</p>
            <p>While on the home page, you can also click on any of those elements within a specific todo list to filter all your todo lists by that value (i.e. Click on the date of any todo list and you will get a list of all todos created on that date.</p>
            <p>Use the main filter buttons (all, pending, or completed) to get back to the rest of your todo lists.</p>
            <h3>Updating</h3>
            <p>To update a todo list, click on the title of that list from the home page. From there you can click on a specific step to mark it complete or incomplete. You can also click on the checkmark to the right of the title to mark the entire list as complete or incomplete. </p>
            <p>Click the notepad icon to edit more specific details of your todo list. You can add or delete steps and tags as needed, or update any other elements.</p>
            <p>If you like, you can also delete your entire todo list by clicking on the trashcan icon.</p>

            <h3>Contact</h3>
            <p className="help-contact">If you have any questions or feedback, please reach out:
                <a href="mailto:mhood82@gmail.com" target="_blank">
                    <i className="material-icons">mail_outline</i>
                </a>
            </p>
        </div>
     );
}
 
export default Help;
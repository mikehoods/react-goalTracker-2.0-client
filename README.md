# MuchToDo

MuchToDo is a web application to keep track of your todo lists. It offers dynamic filtering options for various parameters, including: date, tag, priority level and difficulty. Users can also track the completion of their lists by marking off specific steps or the entire list as complete, as there are easy filtering options for viewing all, pending, or completed todo lists.

## Usage

MuchToDo is live at https://much-todo.netlify.app

## Login

Users can login or signup quickly with Auth0 login. You can signup using your email address or Google account. Additional social login options may be added in future versions.

## Creating a Todo List

Once you signup and login, you can start creating your first todo lists.

New todo lists can be added from the navbar icons at the top of the page. Clicking on the second icon from the left will take you to the Create page.

### ToDo Name

This will serve as the title of your todo list. We recommend keeping it concise and utilizing steps for laying out all the details of your todo list.

### Difficulty

You can set the difficulty level for your todo list as: 'easy', 'medium', 'hard', or 'impossible'. If you have multiple pending todo lists that you are working on, you can view them by a difficulty level that matches your current amount of time or energy to complete tasks.

### Priority

Similar to difficulty. You can set a priority level of: 'low', 'medium', or 'high' for your todo list. You can view your todo lists by priority level so that you can be sure to take care of the most urgent tasks first.

### Adding Steps

The form will allow you to create as many steps or add as many tags to your todo list as you desire. To add new steps, click on the green '+' icon to the bottom right of the step list. Each step added is a required field. If you create too many, simply delete them.

### Deleting Steps

To the right of each step on the create form is a grey trashcan icon. Click the icon to delete the respective step.

### Adding Tags

Tags are optional, but we recommend using them for greater organization of your todo lists. You can add as many tags as you desire for a todo list, all in the same input field. Just start each new tag with a '#'. You can freely edit the tags inside the input field. A tag cloud will populate below the input field for improved clarity.

### Deleting Tags

Tags can either be deleted manually inside the input field by removing the corresponding tag and '#', or you can click the trashcan icon in the tag cloud that appears next to the tag you hover on.

### Submitting New ToDo List

It's as simple as clicking on the 'Create ToDo' button. Todo Name, Difficulty, Priority, and any existing Steps are all required fields and must contain a value for the form to submit. Upon successful submission, you will be redirect to the home page.

## Updating Todos

To update your todos, just click on the title of that todo list from the home page. This will take you to that list's details page. You will notice some new icons to the right of the todo list title. They respectively allow you to edit, delete, or mark your list as complete. You can also click on specific steps to toggle their status as complete or incomplete.
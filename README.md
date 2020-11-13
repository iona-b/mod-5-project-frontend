![always balanced logo](src/images/always-balanced-readme.png)

## About

Always Balanced is a React and Redux Application, with a Rails backend which allows users to create a personalised schedule with the aim of helping them to better balance their work and home life. Always Balanced was created by Iona Brabender for her Mod 5 Project as part of Flatiron School's immersive Software Engineering Program.

**To see the live demo, click [here](https://always-balanced-frontend.herokuapp.com/).**

**To see the video demo, click [here](https://www.youtube.com/watch?v=qA_5IIvbeGw).**


## Installation

Please find the repositories here: https://github.com/iona-b/always-balanced-frontend and https://github.com/iona-b/always-balanced-backend.

To run Always Balanced, first clone both the front and back end repositories into a single directory. 

cd into the always-balanced-backend directory and run the following commands in your terminal:

```
bundle install          # to track and install the exact versions of ruby gems needed for Always Balanced
rails db:create         # to create PostgreSQL database
rails db:migrate        # to run table migrations
rails db:seed           # to seed your database
rails server            # to start up your rails server
```

You should now cd into the always-balanced-frontend directory and run the following commands in your terminal:

```
npm install             # to download the necessary React packages and dependencies
npm start               # to open the app in your browser
```

## Using Always Balanced

### Sign Up or Log In
<ul>
    <li>Visit the Always Balanced homepage to get started.</li>
    <li>If this is your first time using the app, you'll need to create a profile.</li>
    <ul>
        <li>Select the sign up option.</li>
        <li>You'll be asked to choose the time you'd like to start work, how many hours you want to work per day, and what types of activities you like to do to relax.</li>
        <li>This information is used to allow you to create a schedule which completely suits you and can be updated at any time.</li>
        <li>You'll also have the chance to enter any tasks that you do on a regular basis, for instance a certain project that you work on every day.</li>
    </ul>
    <li>Otherwise, just sign in with your user name and password.</li>
</ul>

<br>

![Always Balanced Demo Gif Part 1](https://media.giphy.com/media/ftZfUNGMJkF49L5uA5/giphy.gif)

<br>

### Create Your Schedule
<ul>
    <li>Add new tasks or use existing tasks to create your schedule.</li>
    <li>You can also select 2 relaxation categories from the choices you made when you signed up.</li>
    <li>Based on how many hours you indicated that you'd like to work per day, there will be a recommended number of tasks to add to your schedule, however you're free to add fewer depending on how you feel that day.</li>
</ul>

<br>

![Always Balanced Demo Gif Part 2](https://media.giphy.com/media/SANhGIKcw3WB43l2LD/giphy.gif)

<br>

### View Your Schedule
<ul>
    <li>Once you've created your schedule, you have the option to view it.</li>
    <li>The task or break you're currently on will be highlighted in blue.</li>
    <li>You can see your schedule in full, or you can use the focus mode for a clearer view.</li>
    <li>You'll be notified at the beginning of every break and there will be a timer counting down until the next task begins.</li>
    <li>You can also use the quick break timer if you want to catch your breath for five minutes.</li>
    <li>Five minute or fifteen minute breaks are scheduled every hour. Activities will be suggested for the longer breaks based on your relaxation choices.</li>
    <li>A forty-five minute lunch break is scheduled between 11:45 and 13:00 depending on when your day begins.</li>
</ul>

### Update Your Schedule
<ul>
    <li>Use the edit button to update your schedule at any time of the day.
    <li>You can remove tasks, or add new ones, as well as update your relaxation choices for that day.
</ul>

### Update Your Profile
<ul>
    <li>Update your profile including your username, password, start work time, and number of hours per day.
    <li>Change your relaxation preferences.
    <li>Add or remove tasks from your task list.
    <li>Delete your profile.
</ul>

<br>

![Always Balanced Demo Gif Part 3](https://media.giphy.com/media/iGG0xQuGvRmQ6mF99O/giphy.gif)

<br>

### Additional Features
<ul>
    <li>A clock with the current date and time appears in the top-right-hand corner.
    <li>You have the option to play calming white noise by using the player in the top-left-hand corner.
</ul>


## Developer

**Iona Brabender**<br>
https://github.com/iona-b<br>
https://www.linkedin.com/in/iona-brabender/
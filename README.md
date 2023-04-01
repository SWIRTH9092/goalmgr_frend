### Capstone Goal Manager - Front End

##### Description

The purpose of this project is to manage goals set and the progress towards achiving the goals.


##### Front End
- Live Site Link: https://sw-goalmgr-frend.onrender.com
- Github Link:  https://sw-goalmgr-client.onrender.com

##### Back End
- Live Site Link: https://sw-goalmgr-bkend.onrender.com
- Github Link:  https://github.com/SWIRTH9092/goalmgr_bkend_mongo

##### Features
- Userid Signup, Login and Logout
- This application features a full crud app to be able to:
    1. Show all Goals
    2. To be able to add an Goal
    3. To be able to show the information for one Goal
    4. To be able to update the information for a Goal
    5. To be able to delete a goal
- Responsive Design
- Calls to MongoDb to get the Data


##### Wireframes
<img src="https://i.imgur.com/elhR8nz.jpg" alt="Wireframes for Goal Management " title="activity Tracker" width="100%"/>

##### Goal Manager Screen Shots

- Screen shots of completed website

##### Dependencies Used
- Vue3
- Axios
- Vue Router
- Bable
- Node

##### Routes

- user routes

| Routes | Method | EndPoints | Expected Result |
|--------|--------|-----------|-----------------|
| Logout | POST | /auth/logout| Logs out of app |
| Create | POST | /auth/create | Creates a user |
| Login  | POST | /auth/login | Logs into app
| Update** | PUT  | /auth/update/id | Updates Existing User |
| Show** | GET | /auth/show/id | get user info for editing  |
| Delete** | DELETE | /auth/delete/id | Deletes User and their goals. |

** future router enchancements

- goal list routes

| Routes | Method | EndPoints | Expected Result |
|--------|--------|-----------|-----------------|
|Create | POST | /goallist/create | Creates a New Goal |
| Index | GET| /goallist/index/id | Gets all goals for a user  |
| Delete | DELETE | /goallist/delete/id | Deletes a goal and its children |
| Show | GET | /goallist/show/id | Gets 1 goal to update
| Update | PUT | /goallist/update/id | Updates Existing Entry |


##### Component Tree
 - App.vue
    - website Header (composables/global/GlobalHeader.vue)
    - Router (router/index.js)
        - Main Web page (views/HomeView.vue)
        - User Signup (views/auth/SignupView.vue)
        - User Login (views/auth/LoginView.vue)
            - Goals List, Create and Delete (views/goallistGoalListUpdate.vue)
                - Goals Update (views/goallistGoalListUpdate.vue)

##### Component List
- App.vue - main Vue page 
- Router.js - router/index.js - application router
- views/HomeView.vue - the home page
- views/auth/LoginView.vue - login page
- views/auth/SignupView.vue - signup page
- views/goallist/GoalListUpdate.vue - list of goals, includes create and delete functions
- views/goallistGoalListUpdate.vue - updates the goals
- composables/auth/AuthNavBar.vue - Nav bar for the login/signup process
- composables/goallist/GoallistNavBar.vue - Nav bar for the login/signup process
- composables/global/GlobalHeader.vue - Website Header
- asets/global.css - global css file 

##### -  Future feature Additions
- Goal Steps for a goal
- Goal Tracking for a step
- Feature on one webpage to be able to update tracking for incomplete steps
- add dialog box before deletes
- update user's information
- delete a user
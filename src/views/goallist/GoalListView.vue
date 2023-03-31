<template >
    <div>
        <GoallistNavBar/>
        <div>
            <div v-if="viewCreate">
                <form @submit.prevent="handleCreateGoal">

                    <label>Name:</label>
                    <input type="text" 
                        v-model="createGoalList.gl_Name" 
                        placeholder="goal name" 
                        required 
                    >

                    <label for="status">Choose a Status:</label>
                        <select name="status" id="status" v-model="createGoalList.gl_Stat">
                            <option value="Not Started">Not started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    <br>

                    <label>Description:</label>
                    <input type="text" 
                        v-model="createGoalList.gl_Description" 
                        placeholder="description" 
                        >

                    <label>Start Date:</label>        
                    <input type="date" 
                        v-model="createGoalList.gl_StartDate" 
                    >

                    <label>End Date:</label>        
                    <input type="date" 
                        v-model="createGoalList.gl_EndDate" 
                    >
                        
                    <div class="submit">
                        <button>Create Goal</button>
                    </div>
                </form>
                <button @click="closeCreateForm">Close Create Goal</button>
            </div>
            <div v-if="!viewCreate">
                <button @click="openCreateForm">Create New Goal</button>            
            </div>  
            <div>
                <h2>Goals</h2>
                <div class="goaldata-container">
                    <div v-for="(goallist, i) in goallists" :key="goallist._id">
                        <div class="goalitems">
                            <div class="goalname">
                                <p>Goal</p>
                            </div>
                            <p class="goallist-name">{{ goallist.gl_Name }}</p>
                            <span class="goal-data">Status: {{ goallist.gl_Stat }}</span>
                            <span class="goal-data"> StartDate: {{ goallist.gl_StartDate }}</span>
                            <span class="goal-data">EndDate: {{ goallist.gl_EndDate }}</span>                                

                            <br>
                            <div goal-button-container>
                                <button class="goal-buttons">
                                    Update</button>                            
                                <button class="goal-buttons" 
                                @click="removegoallist(goallist, i)">Delete</button>
                            </div>
                            <br>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
 


</template>
<script>

import axios from "axios";
import GoallistNavBar from "../../composables/goallist/GoallistNavBar.vue"
export default {
    name: "GoalView",
    data() {
        return {
            u_RootKey: '',
            isLoggedIn: '',
            createError: '',
            currentDate: '',
            viewCreate: '',
            goallists: [],
            createGoalList: {
                gl_URootKey: '',
                gl_Rootkey: '',
                gl_Name: '',
                gl_Stat: '',
                gl_Description: '',
                gl_StartDate: '',
                gl_EndDate: '',
                gl_SortOrder: 99,
            },
         }
    },
    components: {
        GoallistNavBar
    },
  
    async mounted() {
        // get data from Local Storage
        this.u_RootKey = localStorage.getItem('u_RootKey')
        this.isLoggedIn = localStorage.getItem('isLoggedIn')

        //get current date for 
        const currentDate = new Date();
            let currentDay = ''
            let currentMonth = ''
            if (currentDate.getDate() < 10) {
                currentDay = '0' + currentDate.getDate()
            } else {
                currentDay = currentDate.getDate()
            } 
            if ((currentDate.getMonth()+1) < 10) {
                currentMonth = '0' + (currentDate.getMonth()+1)
            } else {
                currentMonth = (currentDate.getMonth()+1)
            } 

            const currentDateFormatted = 
            currentDate.getFullYear() + '-' +
            currentMonth + '-' +
            currentDay

            this.currentDate = currentDateFormatted
            this.createGoalList.gl_StartDate = currentDateFormatted
            this.createGoalList.gl_EndDate = currentDateFormatted

                    //get data for list
            const url = process.env.VUE_APP_ROOT_API + '/goallist/index/' +     this.u_RootKey

            await axios
                .get(url)
                .then((response) => (
                    this.goallists = response.data))
                .catch((error) => {
                    this.loginError = `Getting Data Unsuccessful - ${error}`;
            });
    },
    methods: {

        async handleCreateGoal(e) { 
            e.preventDefault();

            //  update create record with the userid root key: u_rootkey 
            //     from local storage
            this.createGoalList.gl_URootKey = localStorage.getItem('u_RootKey')
            console.log(this.createGoalList)

            const url = process.env.VUE_APP_ROOT_API + '/goallist/create'
            await axios
                .post(url, this.createGoalList)
                .then((response) => {
                    // blank out create fields
                    this.createGoalList.gl_URootKey = ''
                    this.createGoalList.gl_Name = ''
                    this.createGoalList.gl_Stat = ''
                    this.createGoalList.gl_Description = ''
                    this.createGoalList.gl_StartDate = this.currentDate
                    this.createGoalList.gl_EndDate = this.currentDate
                    // add the goal to the list
                    this.goallists.push(response.data)
            })
                .catch((error) => {
                    console.log(error);
                    this.createError = "create Goal Unsuccessful";
            });
        },
        async removegoallist(item, i) {
            const url = process.env.VUE_APP_ROOT_API + '/goallist/delete/'
            await axios.delete(url+ item._id);
            this.goallists.splice(i, 1);       
        },  
        closeCreateForm() {this.viewCreate= ''},
        openCreateForm() {this.viewCreate = true}
    } 
}
</script>
<style>

</style>
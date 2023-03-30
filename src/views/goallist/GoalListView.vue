<template >
    <div>
        <h1>Goal List Page</h1>

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
    </div>

</template>
<script>

import axios from "axios";
export default {
    name: "GoalView",
    data() {
        return {
            u_RootKey: '',
            isLoggedIn: '',
            createError: '',
            currentDate: '',
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
            goallist: []
         }
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
            .then((response) => {
                this.goallist = response;
                console.log(this.goallist)
                console.log(response);
            })
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
                    console.log("created Goal", response)
                    // router.push({ name: "GoalView" });
            })
                .catch((error) => {
                    console.log(error);
                    this.createError = "create Goal Unsuccessful";
            });
        }       
    }
}
</script>
<style>
    
</style>
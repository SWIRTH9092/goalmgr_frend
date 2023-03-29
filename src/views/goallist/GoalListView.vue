<template >
    <div>
        <h1>Goal Index Page</h1>
        <form @submit.prevent="handleCreateGoal">

            <label>Name:</label>
            <input type="text" 
                v-model="createGoal.g_Name" 
                placeholder="goal name" 
                required 
            >
            <label>Status:</label>
            <input type="text" 
                v-model="createGoal.g_Status" 
                placeholder="status" 
                required 
            >   
            <!-- <label for="status">Choose a Status:</label>
                <select name="status" id="status" v-model="createGoal.g_Status">
                    <option value="Not Started">Not started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            <br> -->

            <label>Description:</label>
            <input type="text" 
                v-model="createGoal.g_Description" 
                placeholder="description" 
                >

            <label>Start Date:</label>        
            <input type="date" 
                v-model="createGoal.g_StartDate" 
            >

            <label>End Date:</label>        
            <input type="date" 
                v-model="createGoal.g_EndDate" 
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
            createGoal: {
                g_U_RootKey: '',
                g_Name: '',
                g_Status: '',
                g_Description: '',
                g_SortOrder: '',
                g_StartDate: '',
                g_EndDate: '',
            },
         }
    },
  
    mounted() {
        // get data from Local Storage
        this.u_RootKey = localStorage.getItem('u_RootKey')
        this.isLoggedIn = localStorage.getItem('isLoggedIn')


        // call the function to read the data
        // this.getGoalData(this.u_RootKey)
    },
    methods: {
        // async getGoalData(u_RootKey) {
        //     console.log("root key", u_RootKey)
        //     console.log("process.env",process.env.VUE_APP_ROOT_API)
        //     const url = process.env.VUE_APP_ROOT_API + '/goal'
        //     console.log(url)
        //     await axios
        //     .get(url)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //         .catch((error) => {
        //             this.loginError = `Getting Data Unsuccessful - ${error}`;
        //     });
        // },
        async handleCreateGoal(e) { 
            e.preventDefault();
            await axios
                .post("https://sw-goalmgr-bkend.onrender.com/goal/create",
                {
                    g_U_RootKey: "DT2023325183944-$2a$10$nEwYPyPJC1QNTq3qh.E11uaD.lHb7hzqdafs0hx60pLw35UH8ETlO",
                    g_name: "shine shoes",
                    g_status: "completed"
                })
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
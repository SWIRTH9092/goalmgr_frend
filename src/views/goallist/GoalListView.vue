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
                    <div v-if="dateError" class="error" > {{ dateError }}</div>    
                    <div class="submit">
                        <button class="button-normal">Create Goal</button>
                    </div>
                </form>
                <button class="button-normal"
                @click="closeCreateForm">Close Create Goal</button>
            </div>
            <div v-if="!viewCreate">
                <button class="button-normal"
                @click="openCreateForm">Create New Goal</button>            
            </div>  
            <div>
                <br>
                <br>
                <h2>Goals</h2>
                <br>
                <div class="goaldata-container">
                    <div v-for="(goallist, i) in goallists" :key="goallist._id">
                        <div class="goalitems">
                            <div class="goalname">
                                <p>Goal</p>
                            </div>
                            <p class="goallist-name">{{ goallist.gl_Name }}</p>
                            <span class="goal-data">Status: {{ goallist.gl_Stat }}</span>
                            <span class="goal-data"> Start Date: {{ goallist.displayStartDate }}</span>
                            <span class="goal-data">End Date: {{ goallist.displayEndDate }}</span>                                

                            <br>
                            <div goal-button-container>
                                <button class="goal-buttons" 
                                    @click="updategoallist(goallist)" >Update</button>                            
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

import router from "@/router";
import GoallistNavBar from "../../composables/goallist/GoallistNavBar.vue"
import { displayDateFormat } from "../../assets/global.js"
export default {
    name: "GoalListView",
    data() {
        return {
            u_RootKey: '',
            isLoggedIn: '',
            createError: '',
            deleteError: '',
            dateError: '',
            currentDate: '',
            viewCreate: '',
            goallists: [],
            createGoalList: {
                gl_URootKey: '',
                gl_RootKey: '',
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

            await fetch (url)
                .then(response => response.json())
                .then(data => {
                    this.goallists = data;
                    this.goallists.forEach((goallist) => {
                        const startDate = displayDateFormat(goallist.gl_StartDate)
                        const endDate = displayDateFormat(goallist.gl_EndDate)
                        goallist.displayStartDate = startDate
                        goallist.displayEndDate = endDate
                    })
                })
                .catch((error) => {
                    this.loginError = `Getting Data Unsuccessful - ${error}`;
            });
    },
    methods: {

        async handleCreateGoal(e) { 
            e.preventDefault();
            this.dateError = this.createGoalList.gl_StartDate > this.createGoalList.gl_EndDate ?
            'start date can not be greater than end date' : ''

                if (!this.dateError) {
                //  update create record with the userid root key: u_rootkey 
                //     from local storage
                this.createGoalList.gl_URootKey = localStorage.getItem('u_RootKey')
                const createData = this.createGoalList
                const url = process.env.VUE_APP_ROOT_API + '/goallist/create'
                await fetch (url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(createData)
                    ,
                })
                    .then(response => response.json())
                    .then (data => {
                        // blank out create fields

                        this.createGoalList.gl_URootKey = ''
                        this.createGoalList.gl_Name = ''
                        this.createGoalList.gl_Stat = ''
                        this.createGoalList.gl_Description = ''
                        this.createGoalList.gl_StartDate = this.currentDate
                        this.createGoalList.gl_EndDate = this.currentDate
                        data.displayStartDate = displayDateFormat(data.gl_StartDate) 
                        data.displayEndDate = displayDateFormat(data.gl_EndDate)  
                        this.goallists.push(data)                    
                    })
                    .catch((error) => {
                        this.createError = error
                });
            }
        },

        async removegoallist(item, i) {
            const url = process.env.VUE_APP_ROOT_API + '/goallist/delete/'+ item._id
            if (confirm("Are you sure you want to delete this goal from your list?")) {
                await fetch (url, {
                    method: "DELETE"
                })
                .then (response => {
                    if (response.ok) {
                        this.goallists.splice(i, 1); 
                    } else {
                        throw new Error("Error in delte")
                    }   
                })
                .catch((error) => {
                    this.deleteError = error
                })   
            } 
        }, 
        async updategoallist(item) {
            localStorage.setItem('updateGLData', JSON.stringify(item))
            router.push( {name: "GoalListUpdate"} )  
        },   
        closeCreateForm() {this.viewCreate= ''},
        openCreateForm() {this.viewCreate = true}
    } 
}
</script>
<style>

</style>
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
                        maxlength="25"
                        required 
                    >

                    <label for="status">Choose a Status:</label>
                        <select name="status" id="status" v-model="createGoalList.gl_Stat">
                            <option value="Not Started">Not started</option>
                            <option value="In Process">In Process</option>
                            <option value="Completed">Completed</option>
                        </select>
                    <br>

                    <label>Description:</label>
                    <input type="text" 
                        v-model="createGoalList.gl_Description" 
                        placeholder="description" 
                        >
                        
                    <label>Priority:</label>        
                    <input type="number" 
                        v-model="createGoalList.gl_SortOrder" 
                        maxlength="4"
                        required
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
                <h2>In Process Goals</h2>
                <button @click="handleSort('In Process', 'priority')">Priority</button>
                <button @click="handleSort('In Process', 'name')">Name</button>
                <button @click="handleSort('In Process', 'start date')">Start Date</button>
                <button @click="handleSort('In Process', 'end date')">End Date</button>
                <br>
                <div class="goaldata-container">
                    <div v-for="(goallist, i) in goallists_InProcess" :key="goallist._id">
                        <div class="goalitems">
                            <div class="goallist-name">
                                <p >{{ goallist.gl_Name }}</p>
                            </div>
                            <br>
                            <span class="goal-data">Start Date: {{ goallist.displayStartDate }}</span>
                            <span class="goal-data">End Date: {{ goallist.displayEndDate }}</span>                                
                            <span class="goal-data">Priority: {{ goallist.gl_SortOrder }}</span>
                            <span class="goal-data">Status: {{ goallist.gl_Stat }}</span>                           
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
                <br>
                <h2>Not Started Goals</h2>
                <button @click="handleSort('Not Started', 'priority')">Priority</button>
                <button @click="handleSort('Not Started', 'name')">Name</button>
                <button @click="handleSort('Not Started', 'start date')">Start Date</button>
                <button @click="handleSort('Not Started', 'end date')">End Date</button>
                <br>
                <div class="goaldata-container">
                    <div v-for="(goallist, i) in goallists_NotStarted" :key="goallist._id">
                        <div class="goalitems">
                            <div class="goallist-name">
                                <p >{{ goallist.gl_Name }}</p>
                            </div>
                            <br>
                            <span class="goal-data"> Start Date: {{ goallist.displayStartDate }}</span>
                            <span class="goal-data">End Date: {{ goallist.displayEndDate }}</span> 
                            <span class="goal-data">Priority: {{ goallist.gl_SortOrder }}</span>
                            <span class="goal-data">Status: {{ goallist.gl_Stat }}</span>                                 

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
                <br>
                <h2>Completed</h2>
                <button @click="handleSort('Completed', 'priority')">Priority</button>
                <button @click="handleSort('Completed', 'name')">Name</button>
                <button @click="handleSort('Completed', 'start date')">Start Date</button>
                <button @click="handleSort('Completed', 'end date')">End Date</button>
                <br>
                <div class="goaldata-container">
                    <div v-for="(goallist, i) in goallists_Completed" :key="goallist._id">
                        <div class="goalitems">
                            <div class="goallist-name">
                                <p >{{ goallist.gl_Name }}</p>
                            </div>
                            <br>
                            <span class="goal-data"> Start Date: {{ goallist.displayStartDate }}</span>
                            <span class="goal-data">End Date: {{ goallist.displayEndDate }}</span> 
                            <span class="goal-data">Priority: {{ goallist.gl_SortOrder }}</span>
                            <span class="goal-data">Status: {{ goallist.gl_Stat }}</span>                                 

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
import { displayDateFormat, determineSortBy, getItemStorage, setItemStorage } from "../../assets/global.js"
export default {
    name: "GoalListView",
    data() {
        return {
            u_RootKey: '',
            isLoggedIn: '',
            glInProcessSort: '',
            glNotStartedSort: '',
            glCompletedSort: '',
            createError: '',
            deleteError: '',
            dateError: '',
            currentDate: '',
            viewCreate: '',
            goallists: [],
            goallists_NotStarted: [],
            goallists_InProcess: [],
            goallists_Completed:  [],
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
                        // create 3 separate status data objects
                        if (goallist.gl_Stat === 'In Process') {
                            this.goallists_InProcess.push(goallist)  
                        } else {
                            if (goallist.gl_Stat === 'Not Started') {
                                this.goallists_NotStarted.push(goallist) 

                            } else {
                                this.goallists_Completed.push(goallist)                                  
                            }
                        }
                    })
                    // process Session storage - for status - sort criteria
                    //   if no Session storage then use defaults

                    this.glInProcessSort = getItemStorage("glInProcessSort")
                    //  "in process" status
                    if (!this.glInProcessSort) {
                        // no session storage - default to priority]
                        this.glInProcessSort = "priority"
                        setItemStorage("glInProcessSort", this.glInProcessSort)
                    }                  
                    this.handleSort("In Process", this.glInProcessSort)

                    //  "not started" status
                    this.glNotStartedSort = getItemStorage("glNotStartedSort")
                    if (!this.glNotStartedSort) {
                        // no session storage - default to start date
                        setItemStorage("glNotStartedSort", "start date")
                        this.glNotStartedSort = "start date";
                    }                        
                    this.handleSort("Not Started", this.glNotStartedSort)

                    //  "completed" status  - default to end date
                    this.glCompletedSort = getItemStorage("glCompletedSort")
                    if (!this.glCompletedSort) {
                        // no session storage - default to end date
                        setItemStorage("glCompletedSort", "end date")
                        this.glCompletedSort = "end date";
                    }
                    this.handleSort("Completed", this.glCompletedSort)
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
                        this.createGoalList.gl_SortOrder = '99'
                        this.createGoalList.gl_StartDate = this.currentDate
                        this.createGoalList.gl_EndDate = this.currentDate
                        data.displayStartDate = displayDateFormat(data.gl_StartDate) 
                        data.displayEndDate = displayDateFormat(data.gl_EndDate)  

                        // push data to main data list
                        this.goallists.push(data) 

                        //Update sorted goallist by status and then resort into order
                        if (data.gl_Stat === 'In Process') {
                            this.goallists_InProcess.push(data) 
                            this.handleSort("In Process", this.glInProcessSort) 
                        } else if (data.gl_Stat === 'Not Started') {
                            this.goallists_NotStarted.push(data) 
                            this.handleSort("Not Started", this.glNotStartedSort)
                        } else {
                            this.goallists_Completed.push(data) 
                            this.handleSort("Completed", this.glCompleted)                               
                        }                  
                    })
                    .catch((error) => {
                        this.createError = error
                });
            }
        },

        //   Sorts the goallist into order for display
        //   Input status - "In Process", "Not Started" or "Completed"
        //         item   - Type of sort:  "Priority" (glSortorder), 
        //                                 "name" (glName)
        //                                 "start date" (glStartDate)
        //                                 "end date" (glEndDate)
        handleSort (status, sortBy) {
            if (status === "In Process") {
                let work_InProcess = determineSortBy(this.goallists_InProcess, sortBy)
                this.goallists_InProcess = []
                this.goallists_InProcess = work_InProcess
                setItemStorage("glInProcessSort", sortBy)  

            } else if (status === "Not Started") {
                let work_NotStarted = determineSortBy(this.goallists_NotStarted, sortBy)
                this.goallists_NotStarted = []
                this.goallists_NotStarted = work_NotStarted
                setItemStorage("glNotStartedSort", sortBy)

            } else if (status === "Completed") {
                let work_Completed = determineSortBy(this.goallists_Completed, sortBy)
                this.goallists_Completed = []
                this.goallists_Completed = work_Completed
                setItemStorage("glCompletedSort", sortBy)
            }  else {console.log("status not found", status, sortBy)}  
        },
        async removegoallist(item, i) {
            const url = process.env.VUE_APP_ROOT_API + '/goallist/delete/'+ item._id
            if (confirm("Are you sure you want to delete this goal from your list?")) {
                await fetch (url, {
                    method: "DELETE"
                })
                .then (response => {
                    if (response.ok) {
                        if (response.gl_Stat === 'In Process') {
                            this.goallists_InProcess.splice(i, 1); 
                        } else if (response.gl_Stat === 'Not Started') {
                            this.goallists_NotStarted.splice(i, 1); 
                        } else {
                            this.goallists_Completed.splice(i, 1);                                        
                        }
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
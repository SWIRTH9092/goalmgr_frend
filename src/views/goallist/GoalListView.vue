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
                <button @click="displayChange('In Process')">In Process Goals</button>
                <button @click="displayChange('Not Started')">Not Started Goals</button>
                <button @click="displayChange('Completed')">Completed Goals</button>
                <br>

                <h2> {{ this.glDisplayStatus }} Goals</h2>
                <button @click="handleDisplaySort('priority')">Priority</button>
                <button @click="handleDisplaySort('name')">Name</button>
                <button @click="handleDisplaySort('start date')">Start Date</button>
                <button @click="handleDisplaySort('end date')">End Date</button>
                <br>
                <div class="goaldata-container">
                    <div v-for="(goallist, i) in goallists_Display" :key="goallist._id">
                        <div class="goalitems">

                            <GoallistCard :cardName="goallist.gl_Name" 
                                          :cardEndDate="goallist.displayEndDate" 
                                          :cardStartDate="goallist.displayStartDate"                   
                                          :cardPriority="goallist.gl_SortOrder"
                                          :cardStat="goallist.gl_Stat"
                                          />

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
import GoallistCard from "../../composables/goallist/GoallistCard.vue"
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
            glDisplayStatus: '',
            glDisplaySort: '',
            createError: '',
            deleteError: '',
            dateError: '',
            currentDate: '',
            viewCreate: '',
            goallists: [],
            goallists_NotStarted: [],
            goallists_InProcess: [],
            goallists_Completed:  [],
            goallists_Display: [],
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
        GoallistNavBar,
        GoallistCard
    },
  
    async mounted() {
        // get data from Local Storage
        this.u_RootKey = localStorage.getItem('u_RootKey')
        this.isLoggedIn = localStorage.getItem('isLoggedIn')

        //get current date for default date
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
                        // create 3 separate status data objects:
                        //   in process, not started, and completed
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
                    //  Note: data is sorted and ready for display

                    this.glInProcessSort = getItemStorage("glInProcessSort")
                    //  "in process" status
                    if (!this.glInProcessSort) {
                        // no session storage - default to priority]
                        this.glInProcessSort = "priority"
                        setItemStorage("glInProcessSort", this.glInProcessSort)
                    }     

                    // Process Data into correct sort Order from last session         
                    this.handleSort("In Process", this.glInProcessSort)

                    // default - display In Process
                    this.goallists_Display  = this.goallists_InProcess
                    this.glDisplaySort = this.glInProcessSort
                    this.glDisplayStatus = "In Process";

                    //  "not started" status
                    this.glNotStartedSort = getItemStorage("glNotStartedSort")
                    if (!this.glNotStartedSort) {
                        // no session storage - default to start date
                        setItemStorage("glNotStartedSort", "start date")
                        this.glNotStartedSort = "start date";
                    }                
                    // Process Data into correct sort Order from last session         
                    this.handleSort("Not Started", this.glNotStartedSort)

                    //  "completed" status  - default to end date
                    this.glCompletedSort = getItemStorage("glCompletedSort")
                    if (!this.glCompletedSort) {
                        // no session storage - default to end date
                        setItemStorage("glCompletedSort", "end date")
                        this.glCompletedSort = "end date";
                    }
                    // Process Data into correct sort Order from last session      
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
                            this.goallists_Display = this.goallists_InProcess
                        } else if (data.gl_Stat === 'Not Started') {
                            this.goallists_NotStarted.push(data) 
                            this.handleSort("Not Started", this.glNotStartedSort)
                            this.goallists_Display = this.goallists_NotStarted
                        } else {
                            this.goallists_Completed.push(data) 
                            this.handleSort("Completed", this.glCompleted)
                            this.goallists_Display = this.goallists_Completed                   
                        }                  
                    })
                    .catch((error) => {
                        this.createError = error
                });
            }
        },

        //   Sorts the goallist into order for display
        //   Input item   - Type of sort:  "Priority" (glSortorder), 
        //                                 "name" (glName)
        //                                 "start date" (glStartDate)
        //                                 "end date" (glEndDate)
        handleDisplaySort (sortBy) {
            //  Sort the display data
            this.goallists_Display = this.handleSort(this.glDisplayStatus, sortBy)
        },


        //   Sorts the goallist into order 
        //   Input status - "In Process", "Not Started" or "Completed"
        //         item   - Type of sort:  "Priority" (glSortorder), 
        //                                 "name" (glName)
        //                                 "start date" (glStartDate)
        //                                 "end date" (glEndDate)
        handleSort (status, sortBy) {
            if (status === "In Process") {
                let work_InProcess = determineSortBy(this.goallists_InProcess, sortBy)
                this.goallists_InProcess = work_InProcess
                setItemStorage("glInProcessSort", sortBy) 
                this.glInProcessSort = this.glDisplaySort 
                return work_InProcess
            } else if (status === "Not Started") {
                let work_NotStarted = determineSortBy(this.goallists_NotStarted, sortBy)
                this.goallists_NotStarted = work_NotStarted
                setItemStorage("glNotStartedSort", sortBy)
                this.glNotStartedSort = this.glDisplaySort 
                return work_NotStarted
            } else if (status === "Completed") {
                let work_Completed = determineSortBy(this.goallists_Completed, sortBy)
                this.goallists_Completed = work_Completed
                setItemStorage("glCompletedSort", sortBy)
                this.glCompletedSort = this.glDisplaySort 
                return work_Completed
            }  else {console.log("status not found", status, sortBy)}  
        },
        displayChange(status) {
            //*** verify that there is a change
            if (this.glDisplayStatus !== status) {
                this.glDisplayStatus = status;
                console.log("status:", status)
                switch (status) {
                    case "In Process":
                        this.goallists_Display  = this.goallists_InProcess
                        this.glDisplaySort = this.glInProcessSort 
                        break;
                    case "Not Started":
                        console.log("in Not Started")
                        this.goallists_Display  = this.goallists_NotStarted
                        this.glDisplaySort = this.glInNotStarted 
                        break;
                    case "Completed":
                        this.goallists_Display  = this.goallists_Completed 
                        this.glDisplaySort = this.glCompletedSort
                        break;
                }
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
                        if (response.gl_Stat === 'In Process') {
                            this.goallists_InProcess.splice(i, 1); 
                            this.goallists_Display = this.goallists_InProcess
                        } else if (response.gl_Stat === 'Not Started') {
                            this.goallists_NotStarted.splice(i, 1); 
                            this.goallists_Display = this.goallists_NotStarted
                        } else {
                            this.goallists_Completed.splice(i, 1);   
                            this.goallists_Display = this.goallists_Completed           
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
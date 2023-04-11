<template >
    <div>
        <GoallistNavBar/>

        <h2> Update Goal </h2>
        <div>
                <form @submit.prevent="handleUpdateGoal">

                    <label>Name:</label>
                    <input type="text" 
                        v-model="updateGoalList.gl_Name" 
                        placeholder="goal name" 
                        maxlength="25"
                        required 
                    >

                    <label for="status">Choose a Status:</label>
                        <select name="status" id="status" 
                        v-model="updateGoalList.gl_Stat">
                            <option value="Not Started">Not started</option>
                            <option value="In Process">In Process</option>
                            <option value="Completed">Completed</option>
                        </select>
                    <br>

                    <label>Description:</label>
                    <input type="text" 
                        v-model="updateGoalList.gl_Description" 
                        placeholder="description" 
                        >

                    <label>Start Date:</label>        
                    <input type="date" 
                        v-model="updateGoalList.gl_StartDate" 
                    >

                    <label>End Date:</label>        
                    <input type="date" 
                        v-model="updateGoalList.gl_EndDate" 
                    >
                        
                    <div class="submit">
                        <button class="button-normal">Update Goal</button>
                    </div>
                </form>
        </div>
    </div>
 


</template>
<script>

import router from "@/router";
import GoallistNavBar from "../../composables/goallist/GoallistNavBar.vue"
export default {
    name: "GoalListUpdate",
    data() {
        return {
            u_RootKey: '',
            isLoggedIn: '',
            updateResponse: '',
            updateError: '',
            currentDate: '',
            goallist: [],
            updateGoalList: {
                _id: '',
                gl_URootKey: '',
                gl_Name: '',
                gl_Stat: '',
                gl_Description: '',
                gl_StartDate: '',
                gl_EndDate: '',
                gl_SortOrder: '',
            },
         }
    },
    components: {
        GoallistNavBar
    },
  
    async mounted() {
        // get data from Local Storage
        this.goallist = JSON.parse(localStorage.getItem("updateGLData"))
        this.updateGoalList._id = this.goallist._id
        this.updateGoalList.gl_URootKey = this.goallist.gl_URootKey
        this.updateGoalList.gl_Name = this.goallist.gl_Name
        this.updateGoalList.gl_Stat = this.goallist.gl_Stat
        this.updateGoalList.gl_Description= this.goallist.gl_Description
        this.updateGoalList.gl_StartDate = this.goallist.gl_StartDate
        this.updateGoalList.gl_EndDate = this.goallist.gl_EndDate
        this.updateGoalList.gl_SortOrder = this.goallist.gl_SortOrder
    },
    methods: {

        async handleUpdateGoal(e) { 
            e.preventDefault();

            //  update create record with the userid root key: u_rootkey 
            //     from local storage
            const docToUpate = this.updateGoalList._id
            const bodyToUpdate = this.updateGoalList
            const url = process.env.VUE_APP_ROOT_API + '/goallist/update/' + docToUpate
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify (bodyToUpdate),
            })
            .then(() => {
                localStorage.removeItem("updateGLData")
                router.push( {name: "GoalListView"} )  
             })
            .catch((error) => {
                this.updateError = error;
            })
        },
    } 
}
</script>
<style>

</style>
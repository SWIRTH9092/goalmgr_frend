<template>
    <div>
        <AuthNavBar />
        <form @submit.prevent="handleSubmit">

            <h2 >Sign up </h2>

            <label>Userid:</label>
            <input type="text" 
                v-model="createUserid.u_Userid" 
                placeholder="username" 
                required 
                maxlength="12"
                autocomplete="off"
                >
            <div v-if="useridError" class="error" > {{ useridError }}</div>

            <label>Password:</label>
            <input type="password" 
                v-model="createUserid.u_Password" 
                placeholder="password" 
                required 
                autocomplete="off"
                >
            <div v-if="passwordError" class="error" > {{ passwordError }}</div>
            
            <label>Email:</label>
            <input type="email" 
                v-model="createUserid.u_Email" 
                placeholder="email" 
                required maxlength="50"
                autocomplete="off"
                >

            <label>First Name:</label>
            <input type="text" 
                v-model="createUserid.u_FirstName"  
                placeholder="first name" 
                required 
                maxlenth="50"
                >
    
            <label>Last Name:</label>        
            <input type="text" 
                v-model="createUserid.u_LastName" 
                placeholder="last name" 
                required 
                maxlenth="50"
                >

            <label>Cell Phone:</label>
            <input type="tel" 
                v-model="createUserid.u_CellPhoneNumber" 
                required 
                placeholder="1234567890" 
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                >
            <small>Format: 123-456-7890</small>
            
            <div class="submit">
                <button class="button-normal">Create Signon</button>
            </div>
        </form>
    </div>
</template>
<script>

import AuthNavBar from "../../composables/auth/AuthNavBar.vue"
import router from "@/router";

export default {
    data() {
        return {
            createUserid: {
                u_Userid: '',
                u_Password: '',
                u_FirstName: '',
                u_LastName: '',
                u_Email: '',
                u_CellPhoneNumber: '',
            },
            useridError: null,
            passwordError: null,
        }
    },
    setup() {

    },
    components: {
        AuthNavBar
    },
    methods: {
        async handleSubmit  (e) {   
            e.preventDefault();  
            //validate userid
            this.useridError = this.createUserid.u_Userid.length> 7 ?
                    '' : 'userid must be at least 8 characters long'
            // validate password
                this.passwordError = this.createUserid.u_Password.length > 7 ?
                    '' : 'password must be at least 8 characters long'
            
            // print to console log signup info
            if(!this.useridError ) {
                if(!this.passwordError) {
                    const url = process.env.VUE_APP_ROOT_API + '/auth/signup'
                    await fetch (url, {  
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(this.createUserid),
                        })
                        .then(() => {
                        router.push({ name: "LoginView" });    
                    })
                        .catch((error) => {
                        this.loginError = `create Unsuccessful - ${error}`;
                    });

                }
            }         
        }
    }
}
</script>
<style>
  .submit {
    text-align: center;
  }

</style>
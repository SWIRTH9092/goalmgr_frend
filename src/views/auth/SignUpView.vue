<template>
    <div>
        <AuthNavBar />
        <form @submit.prevent="handleSubmit">

            <h2>Sign up </h2>

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
                pattern="[0-9]{10}"
                >

            <div class="submit">
                <button>Create Signon</button>
            </div>
        </form>
    </div>
</template>
<script>

import AuthNavBar from "../../composables/auth/AuthNavBar.vue"
import axios from "axios";
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
                    console.log('createUserid', this.createUserid) 
                    const url = process.env.VUE_APP_ROOT_API + '/auth/signup'
                    console.log(url)    
                    await axios
                        .post(url, this.createUserid)
                        .then((response) => {
                        console.log(response);
                        router.push({ name: "LoginView" });    

                    })
                        .catch((error) => {
                        console.log(error);
                        this.loginError = `create Unsuccessful - ${error}`;
                    });

                }
            }         
        }
    }
}
</script>
<style>
h2 {
    text-align:center;
    color: #0b6dff;
    
}
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  } 

  button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
  }
  .submit {
    text-align: center;
  }
  .error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
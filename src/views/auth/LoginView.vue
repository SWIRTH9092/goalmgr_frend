<template>
    <div>
        <AuthNavBar/>
        <form @submit="submitLogin">

        <h2>Login to Goal Manager</h2>

        <label>Username:</label>
        <input type="text" 
            v-model="u_Userid" 
            placeholder="username" 
            autocomplete="on" 
            required 
            maxlength="12"
            >
        <div v-if="useridError" class="error" > {{ useridError }}</div>

        <label>Password:</label>
        <input type="password" 
            v-model="u_Password" 
            autocomplete="on" 
            placeholder="password" 
            required 
            >
        <div v-if="passwordError" class="error" > {{ passwordError }}</div>

        <br>
        <div class="error" > {{ loginError }}</div>

        <div class="submit">
            <button>Login</button>
        </div>
    </form>
    </div>

</template>
<script>
// 

import AuthNavBar from "@/composables/auth/AuthNavBar.vue";
import router from "@/router";
import axios from "axios";
export default {
    name: "LoginView",
    data() {
        return {
            isLoggedIn: false,
            u_Userid: "",
            u_Password: "",
            u_RootKey: "",
            useridError: "",
            passwordError: "",
            loginError: ""
        };
    },
    setup() {
    },
    mounted() {
    },
    methods: {
        async submitLogin(e) {
            e.preventDefault();
            //validate userid
            this.useridError = this.u_Userid.length > 7 ?
                "" : "userid must be at least 8 characters long";
            // validate password
            this.passwordError = this.u_Password.length > 7 ?
                "" : "password must be at least 8 characters long";
            // if no error
            if (!this.useridError) {
                if (!this.passwordError) {
                    const url = process.env.VUE_APP_ROOT_API + '/auth/login'
                    await axios
                        .post(url, {
                        u_Userid: this.u_Userid,
                        u_Password: this.u_Password
                    })
                        .then((response) => {
                            console.log(response);
                            this.isLoggedIn = true;
                            localStorage.setItem("isLoggedIn", "true");
                            this.u_RootKey = response.data.u_RootKey;
                            localStorage.setItem("u_RootKey", this.u_RootKey);                  
                            router.push({ name: "GoalListView" });
                    })
                        .catch((error) => {
                            console.log(error);
                            this.isLoggedIn = false;
                            localStorage.setItem("isLoggedIn", "false");
                            this.loginError = "login Unsuccessful";
                    });
                }
            }
        }
    },
    components: { AuthNavBar }
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
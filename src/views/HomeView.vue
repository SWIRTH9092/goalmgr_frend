<template>
  <div class="home">
    <div>
        <h5 class="pagecolor">Dream Big!  Set Your Goals, Follow through and hit your Target!</h5>
        <br>
        <div class="imagecontainer">
            <img src="https://i.imgur.com/P9U0I0c.jpg" alt="arrows hitting target" >
        </div>
        <br>
        <h3 class="pagecolor">Please Sign or Login</h3>
        <router-link class="homelink" 
            :to="{ name: 'LoginView'}">
            <button class="button-normal">Login</button>
        </router-link>   
        <router-link  class="homelink" 
            :to="{ name: 'SignUpView'}">
            <button class="button-normal">Signup</button>
        </router-link>       
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {

  },

data () {
        return {
            isLoggedIn: false,
        }
    },
}
</script>

<style>

    .imagecontainer {
        display:block;
        margin-left: auto;
        margin-right: auto;
        width: 350px;
        text-align: center;
    
    }
    img {
        width:350px;
        border-radius: 15px;
    } 
    
    .homelink {
        font-weight: bold;
        padding: 10px;
        color: var(--color8);
    }
    .homebutton {
        background: var(--color8);
        font-size: 1.5rem;
    }
    .pagecolor {
        color: var(--color8);
        font-size: 2.5rem;
        font-weight: 900;
    }

    @media only screen and (max-width: 500px) {
    
        .pagecolor {
            padding: 0 10px 0 10px;
            font-size: 1.1rem;
        }

        .imagecontainer {
            width: 300px;
  
        }
        img {
            width:300px;
        } 
    }
</style>
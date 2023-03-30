<template>
  <div class="home">
    <div>
        <br>
        <br>
        <h2 class="pagecolor">Dream Big!  Take your Vision and hit your Target!</h2>
        <br>
        <div class="imagecontainer">
            <img src="https://i.imgur.com/P9U0I0c.jpg" alt="arrows hitting target" >
        </div>
        <br>
        <h2 class="pagecolor">Please Sign or Login</h2>
        <router-link class="homelink" 
            :to="{ name: 'LoginView'}">
            <button class="homebutton">Login</button>
        </router-link>   
        <router-link  class="homelink" 
            :to="{ name: 'SignUpView'}">
            <button class="homebutton">Signup</button>
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

    imagecontainer {
        width: 350px;

    }
    img {
        object-fit: contain;
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
    }
</style>
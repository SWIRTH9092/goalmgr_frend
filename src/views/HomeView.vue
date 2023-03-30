<template>
  <div class="home">
    <div>
        <br>
        <br>
        <h2>Dream Big!  Take your Vision and hit your Target!</h2>
        <br>
        <div class="imagecontainer">
            <img src="https://i.imgur.com/P9U0I0c.jpg" alt="arrows hitting target" >
        </div>
        <h2>Please Sign or Login</h2>
        <br>
        <router-link :to="{ name: 'LoginView'}"><button>Login</button></router-link>   
        <router-link :to="{ name: 'SignUpView'}"><button>Signup</button></router-link>       
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
</style>
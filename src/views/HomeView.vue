<template>
  <div class="home">
    <div>
        <h2>Dream Big!  Take your Vision and hit your Target!</h2>
        <div class="imagecontainer">
            <img src="https://i.imgur.com/P9U0I0c.jpg" alt="arrows hitting target" >
        </div>
        <h2>Please Sign or Login</h2>
        <router-link :to="{ name: 'LoginView'}"><button>Login</button></router-link>       
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
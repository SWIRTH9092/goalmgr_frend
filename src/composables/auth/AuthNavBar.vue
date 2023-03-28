<template>
    <nav>
      <router-link :to="{ name: 'home'}">Home</router-link> 
      <router-link :to="{ name: 'LoginView'}">Login</router-link> 
      <router-link :to="{ name: 'SignUpView'}">Signup</router-link> 
    <!-- <router-link :to="{ name: 'SignUpView', params: { id: job.id}}"></router-link> -->
    </nav>
</template>
<script>


export default {
    
}
</script>
<style>
   
</style>
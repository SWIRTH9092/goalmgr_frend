<template>
    <nav>
      <router-link :to="{ name: 'GoalListView'}">
        <button class="button-link">Goal List View</button></router-link> 
      <button class="button-link" @click="logout">Logout</button>

      <!-- <router-link :to="{ name: 'home'}">Logout</router-link>  -->

    </nav>
</template>
<script>

import router from "@/router";
import { removeItemStorage } from "@/assets/global";

export default {
    methods: {

      logout() {
        removeItemStorage ('isLoggedIn')
        removeItemStorage ('u_RootKey')
        removeItemStorage ("updateGLData")
        router.push({ name: "Home" });
        }      

    }
}
</script>
<style>
  
</style>
<template>
<GlobalHeader/>
<router-view/>
</template>

<script>
import GlobalHeader from './composables/global/GlobalHeader.vue';

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    GlobalHeader,
  }
}

</script>
<style>

</style>

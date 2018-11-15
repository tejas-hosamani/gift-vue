<template>
  <div id="app" class="">
    <head-el></head-el>
    <router-view></router-view>
    <foot-el></foot-el>
  </div>
</template>




<script>


export default {
  name: 'app'
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.router-link-active {
  background: #00897b ;
}
</style>

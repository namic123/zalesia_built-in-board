<template>
  <div class="container h-screen w-screen">
    <nav class="navigator" >
      <router-link to="/">
      <h1 class="text-white">
        Zalesia
      </h1>
      </router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    setup(){

      return{

      }
    }
  }
</script>

<style>
@import "assets/styles/default.css";
</style>

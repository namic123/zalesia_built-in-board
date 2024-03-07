<template>
  <div class="container h-screen">
    <nav class="navigator">
      <h1 class="text-white">
        Zalesia
      </h1>
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
body{
  background-color: #1e293b;
}
.container{
  width: 100%;
  color:white;
}
.default-style-container{
  width:100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
.navigator{
  display:flex;
  width:100%;
  padding:1rem 2rem;
}
.navigator h1{
  font-size: 2rem;
  font-weight: bold;
  color: white;
}


</style>

<script setup>
import { onMounted } from 'vue';
import ScrollReveal from 'scrollreveal';

onMounted(() => {
  const config = {
    distance: "80px",
    duration: 2000,
    delay: 100,
  };


  ScrollReveal().reveal(".home-headline-container", {
    ...config,
    origin: "left",
  });

  ScrollReveal().reveal(".home-headline-second", {
    ...config,
    origin: "right",
  });
});
</script>

<template>
  <div class="home-container">
    <div class="home-headline-container">
      <h1 >Building Bridges to Success,</h1>
      <h1 >Zalesia's Innovative Solutions Connect You to the Future.</h1>
      <h1 >This is our solutions:</h1>
    </div>
    <div class="logo-container">
      <div>
        <img class="default-logo-style" src="../assets/images/knime.png">
      </div>
      <div>
        <img class="default-logo-style" src="../assets/images/longview.png">
      </div>
      <div>
        <img class="default-logo-style" src="../assets/images/yellowbrick.png">
      </div>
      <div>
        <img class="default-logo-style" src="../assets/images/microstrategy.png">
      </div>
      <div>
        <img class="default-logo-style datastage" src="../assets/images/datastage.png">
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  margin: auto 0rem;
  display: flex;
  justify-content: center;
}

.home-container > div {
  margin: 0rem 1rem;
}
/*--------------- headline -----------------*/
.home-headline-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
  font-family: "Zen Old Mincho", serif;
  background-image: var(--second-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}
.home-headline-container> h1{
  margin: 0.5rem 0rem;
}
.home-headline-container> h1:first-child{
  font-size: 2rem;
}
.home-headline-container> h1:last-child{
  font-size: 2.5rem;
}
/* ------------------ logo styles------------------- */
.logo-container {
  width: 23rem;
  height: 23rem;
  background-image: linear-gradient(109.6deg, #fafafa, #c4c4c4, #8d8d8d, #5d5d5d);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 0 3rem white;
  animation: floatImage 4s ease-in-out infinite;
}
.logo-container > div {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
img {
  margin: 0.7rem 1rem;
}

.default-logo-style {
  height: 2.3rem;
}
.datastage{
  height: 2.5rem;
}

@keyframes floatImage {
  0%{
    transform:translateY(0);
  }
  50%{
    transform:translateY(-2.4rem);
  }
  100%{
    transform:translateY(0);
  }
}
</style>
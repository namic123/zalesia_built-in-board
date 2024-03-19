<script setup>
import {onMounted, ref} from 'vue';
import ScrollReveal from 'scrollreveal';
import Typed from "typed.js";
import {useRouter} from "vue-router";

const typedText = ref(null);

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

  ScrollReveal().reveal(".home-headline-btn", {
    ...config,
    origin: "right",
  });
  const options = {
    strings: [
      "Knime",
      "Longview",
      "Yellowbrick",
      "Microstrategy",
      "Datastage",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  };

  new Typed(typedText.value, options);
});

const router = useRouter();

function moveToList() {
  router.push({
    name: "BoardList"
  })
}
</script>

<template>
  <div class="home-container">
    <div>
      <div class="home-headline-container">
        <h1>Crafting the Future at Zalesia Community,</h1>
        <h1> We Pave the Way for Revolutionary Solutions.</h1>
        <h1>This is our solutions: <span class="typed-text" ref="typedText"></span></h1>
      </div>
      <div class="home-headline-btn">
        <button @click="moveToList">Get Started</button>
      </div>
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
  display: flex;
  justify-content: center;
  margin-top: 10rem;
}

.home-container > div {
  margin: 0rem 1rem;
}

.home-container > div:first-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.home-container > div:first-child > div:nth-child(2) > button {
  background-image: linear-gradient(109.6deg, black, #838383);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 0 0.5rem white;
  margin-top: 1rem;
}
.home-container a {
  font-size: 1.3rem;
  padding: 0.3rem;
  border-radius: 50%;
  background-color: #7c7c7c;
  box-shadow: 0 0 0.5rem white;
}
/*--------------- headline -----------------*/
.home-headline-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  font-family: "Zen Old Mincho", serif;
  background-image: linear-gradient(109.6deg, #ffffff, #646464);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  margin-top: 5rem;
}

.home-headline-container > h1 {
  margin: 0.1rem 0rem;
}

.home-headline-container > h1:first-child {
  font-size: 1.7rem;
}

.home-headline-container > h1:last-child {
  font-size: 2.3rem;
  background-image: var(--second-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.typed-text {
  font-size: 2.6rem;
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

.datastage {
  height: 2.5rem;
}

@keyframes floatImage {
  0% {
    transform: translateY(0);
  }
  33% {
    transform: translateY(-2.4rem);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
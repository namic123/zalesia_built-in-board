<template>
  <div class="board-container home-container pt-10">
    <section>
      <div class="home-header-section">
        <button class="mt-5" @click="moveToCreate">Add new board</button>
        <button class="mt-5" @click="moveToLogin">Login</button>
      </div>

      <div>
        <div></div>
      </div>
      <div>

      </div>
    </section>
  </div>
</template>
<script>
import {useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const moveToCreate = () => {
      router.push({
        name: 'BoardCreate',
      });
    }
    const moveToLogin = () => {
      router.push({
        name: 'MemberLogin',
      });
    }
    return {
      moveToCreate,
      moveToLogin,
    }
  }
}
</script>
<style scoped>
.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

section {
  width: 80%;
  display: flex;
  flex-direction: column;
}

.home-header-section {
  width: 100%;
  display: flex;
  justify-content: flex-end;

}

section button {
  background-color: white;
  color: black;
  padding: 0.8rem;
  border-radius: 0.5rem;
}
</style>
<template>
  <div class="board-container home-container pt-10">
    <section>
      <div class="home-header-section mb-3">
        <button  class="mt-5" @click="moveToCreate">글 작성</button>
        <button  class="mt-5" @click="moveToLogin">로그인</button>
      </div>

      <div>
        <div>
          <BoardList/>
        </div>
      </div>
      <div>

      </div>
    </section>
  </div>
</template>
<script setup>
import {onMounted} from "vue";

onMounted(()=>{
})

import {useRouter} from "vue-router";
import BoardList from "@/components/BoardList.vue";
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
  background-color: var(--main-color);
  color: white;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 0.9rem;
}
</style>
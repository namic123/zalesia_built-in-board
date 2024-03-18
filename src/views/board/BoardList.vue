<template>
  <div class="board-container board-list-container pt-10">
    <section>
      <div class="board-list-header-section mb-3">
        <button v-if="memberStore.isLoggedIn" class="mt-5" @click="moveToCreate">글 작성</button>
        <button v-if="!memberStore.isLoggedIn" class="mt-5" @click="moveToLogin">로그인</button>
      </div>

      <div>
        <div>
          <ListComponent/>
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
import {useMemberStore} from "@/store";
import ListComponent from "@/components/ListComponent.vue";
    const router = useRouter();

    const memberStore = useMemberStore();
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
.board-list-container {
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

.board-list-header-section {
  width: 100%;
  display: flex;
  justify-content: flex-end;

}

section button {
  background-image: var(--main-gradient);
  color: white;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 0.9rem;
}
</style>
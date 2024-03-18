<template>
  <div class="container h-screen w-screen">
    <nav class="navigator mb-8">
      <router-link to="/">
      <h1 class="logo">
        Zalesia
      </h1>
      </router-link>
      <div class="memberInfo" v-if="memberStore.isLoggedIn">
        <div>환영합니다</div>
        <div class="memberInfo-nickname"><span>{{nickname}}</span>님</div>
        <button class="logout-btn" @click="handleLogout">로그아웃</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script setup>
import {useMemberStore} from "@/store";
import {computed} from "vue";

const  memberStore = useMemberStore();
const nickname = computed(() => memberStore.member?.nickname);

function handleLogout(){
    memberStore.$patch({
      member: null,
      accessToken: null,
    })
  localStorage.clear();
}
</script>

<style>
@import "assets/styles/default.css";
.navigator{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.memberInfo{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
}
.memberInfo-nickname{
  font-size: 1.5rem;
  margin-left: 1rem;
}
.memberInfo-nickname > span {
  background-image: var(--second-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}


.logout-btn{
  margin-left: 1rem;
  padding: 0.5rem 0.6rem;
  border-radius: 0.8rem;
  background-image: var(--main-gradient);
}
</style>

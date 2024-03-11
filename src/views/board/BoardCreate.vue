<template>
  <div class="board-container board-create-container pt-10">
    <header>
      <h1 class="text-white">게시글 쓰기</h1>
    </header>
    <section>
      <form class="board-create-form" @submit.prevent="onCreateBoard">
        <div class="board-create-content">
          <input
              type="text"
              placeholder="제목을 입력해주세요."
              v-model="title"
          >
        </div>
        <div class="board-create-content">
          <textarea placeholder="내용을 입력해주세요." v-model="content"/>
        </div>
        <div class="board-create-content justify-end">
          <button type="submit" class="bg-blue-600">저장</button>
          <button type="button" class="bg-red-600" @click="moveToHome">취소</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";
export default {
  setup(){
    // 필드
    const router = useRouter();
    const title = ref("");
    const content = ref("");

    // 메소드
    // 홈으로 이동
    function moveToHome(){
      router.push({
        name:"Home"
      })
    }
    async function onCreateBoard(){
      await axios.post('/api/board/create',{
        title:title.value,
        content:content.value,
      })
    }
    return{
      title,
      content,
      moveToHome,
      onCreateBoard,
    }
  }
}
</script>
<style scoped>
.board-create-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.board-create-container h1 {
  font-size: 2rem;
}

.board-create-container section {
  width: 100%;
}

.board-create-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.board-create-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-create-content button {
  padding:0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;
  margin:0.5rem;
}

.board-create-container input, textarea {
  width: 50%;
  height: 2.2rem;
  border-radius: 1.5rem;
  padding-left: 1.5rem;
  margin-top: 1.5rem;
  color:black;
}

.board-create-container textarea {
  padding-top: 1rem;
  height: 20rem;
}

.board-create-container label {
  font-size: 2rem;
  color: white;
}
</style>
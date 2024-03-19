<script setup>
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {onMounted, reactive} from "vue";
import Swal from "sweetalert2";
import {useMemberStore} from "@/store";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const boardInfo = reactive({});
const memberStore = useMemberStore();
const memberId = memberStore.member.memberId;


onMounted(() => {
  axios.get(`/api/boards/${id}`)
      .then(response => {
        Object.assign(boardInfo, response.data);
        console.log(boardInfo);
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "이런...",
          text: error.response.data.message || error.message,
        });
        router.push({
          name: "BoardList",
        })
      })
})

function onBoardDelete(){
  axios.delete(`/api/boards/${id}`)
      .then(()=>{

      }).catch(()=>{

  })
}

function moveToBoardUpdate(){
  router.push({
    name: "BoardUpdate",
    params:id,
  })
}

</script>

<template>
  <div class="default-style-container">
    <div v-if="boardInfo" class="board-info-container">
      <header class="board-header mb-5">
        <h1>{{ boardInfo.title }}</h1>
      </header>
      <section class="board-body">
        <header class="board-body-header">
          <div>작성자 : {{ boardInfo.writer }}</div>
          <div>작성일자 : {{ boardInfo.inserted }}</div>
        </header>
        <section class="board-body-content">
          <p>{{ boardInfo.content }}</p>
        </section>
        <footer class="board-body-footer" v-if="memberId === boardInfo.writer">
          <button class="text-blue-300" @click="moveToBoardUpdate">수정</button>
          <button class="text-red-400" @click="onBoardDelete">삭제</button>
        </footer>
      </section>
      <footer class="board-footer">
        <textarea placeholder="댓글을 입력해주세요"/>
        <button class="bg-blue-500">추가</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.board-info-container {
  width: 70%;
}

.board-header {
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
}

/* content 영역 시작 ---------------------------------------------------------------*/
.board-body {
  width: 100%;
  border-top: 1px solid white;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board-body-header,
.board-body-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.3rem 1rem;
}

.board-body-header > div:first-child {
  border-right: 1px solid white;
}

.board-body-header > div,
.board-body-footer > button {
  padding: 0rem 0.5rem;
}


.board-body-header > div {
  margin: 1rem 0rem;
  background-image: var(--second-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}

.board-body-content {
  width: 100%;
  border: 1px solid white;
  border-radius: 0.8rem;
  padding: 1rem;
}

.board-body-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

/* content 영역 끝 ---------------------------------------------------------------*/
.board-footer{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}
.board-footer textarea{
  width:60%;
  height:5rem;
  border-radius: 1rem;
  padding:0.6rem;
  margin-right: 1rem;
}
.board-footer button{
  border-radius: 1rem;
  padding:0rem 1.5rem;
}
</style>
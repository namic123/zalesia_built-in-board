<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, onUpdated, reactive} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useMemberStore} from "@/store";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const boardInfo = reactive({});
const memberStore = useMemberStore();
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
onUpdated(()=>{
  if(memberStore.member.memberId !== boardInfo.writer){
    Swal.fire({
      icon: "error",
      title: "잘못된 접근",
      text: "잘못된 접근입니다. 경로를 다시 확인해주세요.",
    });
    router.push({
      name: "BoardList",
    })
  }
});
function onUpdateBoard(){
  axios.putForm(`/api/boards/${id}`,{
    title:boardInfo.title,
    content:boardInfo.content,
  })
      .then(() =>{
        Swal.fire({
          icon: "success",
          title: "수정완료",
          text: "수정이 완료되었습니다.",
        });
        router.push({
          name: "BoardList",
          params: id,
        })
      })
      .catch(()=>{
        Swal.fire({
          icon: "error",
          title: "수정실패",
          text: "오류가 발생했습니다. 잠시 후 시도해주세요.",
        });
        router.push({
          name: "BoardList",
          params: id,
        })
      });
}
function moveToBoardView(boardId){
  router.push({
    name:"BoardView",
    params:{id: boardId}
  })
}
</script>

<template>
  <div class="board-container board-create-container pt-10">
    <header>
      <h1 class="text-white">게시글 수정</h1>
    </header>
    <section>
      <form class="board-create-form">
        <div class="board-create-content">
          <input
              type="text"
              placeholder="제목을 입력해주세요.(최대 70자)"
              v-model="boardInfo.title"
              maxlength=70
          >
        </div>
        <div class="board-create-content">
          <textarea class="custom-scroll-bar" placeholder="내용을 입력해주세요(700자 이내)" maxlength=700 v-model="boardInfo.content"/>
        </div>
<!--        <div class="board-create-file">-->
<!--          <span>{{ displayFileName }}</span>-->
<!--          <button type="button" @click="triggerFileInput">파일 업로드</button>-->
<!--          <input-->
<!--              type="file"-->
<!--              ref="fileInput"-->
<!--              @change="setUploadFiles"-->
<!--              accept="image/*"-->
<!--              multiple-->
<!--              style="display: none;"-->
<!--          />-->
<!--        </div>-->
        <div class="board-create-content justify-end">
          <button type="button"  @click="onUpdateBoard">수정</button>
          <button type="button" @click="moveToBoardView(boardInfo.id)">취소</button>
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {useMemberStore} from "@/store";
import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const props = defineProps({
  boardId: Number
});


const memberStore = useMemberStore();
const router = useRouter();
let commentInputValue = ref("");

function onCreateComment() {
  console.log(commentInputValue.value);
  axios.post(`/api/comments/${props.boardId}`, {
    content: commentInputValue.value,
    writer: memberStore.member?.memberId,
  }, {
    headers: {
      "Authorization": memberStore.accessToken
    }
  }).then(() => {
    Swal.fire("댓글이 생성되었습니다!");
  }).catch((error) => {
    if (error.response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "로그인 시간 만료",
        text: "로그인 시간이 만료됐습니다. 로그인 후 이용바랍니다.",
      });
      memberStore.logout();
      router.push({
        name: "MemberLogin",
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "서버 장애",
        text: "서버에 문제가 발생했습니다. 잠시 후 이용바랍니다.",
      });
    }
  })
}

function moveToLogin() {
  router.push({
    name: "MemberLogin"
  });
}

</script>

<template>
  <div class="board-comment-container">
    <div v-if="memberStore.member">
      <textarea placeholder="댓글을 입력해주세요" v-model="commentInputValue"/>
      <button class="bg-blue-500" @click="onCreateComment">추가</button>
    </div>
    <div v-else>
      <textarea placeholder="로그인 후 이용바랍니다." disabled/>
      <button class="bg-blue-500" @click="moveToLogin">로그인</button>
    </div>
    <div class="comment-list">
      <div v-for="comment in commentList" :key="comment.id">
        {{comment.content}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-comment-container,
.board-comment-container > div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.board-comment-container textarea {
  width: 60%;
  height: 5rem;
  border-radius: 1rem;
  padding: 0.6rem;
  margin-right: 1rem;
  margin-top: 0rem;
}

.board-comment-container button {
  border-radius: 1rem;
  padding: 0.5rem 1rem;
}
</style>
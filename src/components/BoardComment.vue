<script setup>
import {useMemberStore} from "@/store";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import Swal from "sweetalert2";
import api, {defaultAxios} from "@/service/axios";

const props = defineProps({
  boardId: Number
});
onMounted(() => {
  fetchCommentList(currentPage.value);
})

const memberStore = useMemberStore();
const router = useRouter();
// 댓글 state
let commentList = ref([]);
let commentInputValue = ref("");

// 댓글 편집 state
let editingCommentId = ref(null); // 현재 편집 중인 댓글 ID
let editingCommentContent = ref(""); // 편집 중인 댓글 내용


// 페이징 state
const currentPage = ref(0);   // 현재 페이지 번호 (0부터 시작)
const totalPages = ref(0);    // 총 페이지 수
const pageSize = ref(5);     // 페이지당 게시글 항목 수
// 페이징 그룹 처리
const pageGroupSize = ref(5); // 그룹당 표시할 페이지 수
const startPage = ref(1);  // 페이지 그룹의 시작 페이지 번호

// Comment List 요청
function fetchCommentList(page) {
  defaultAxios.get(`/api/comments/${props.boardId}?page=${page}&size=${pageSize.value}`)
      .then((response) => {
        commentList.value = response.data.content;
        totalPages.value = response.data.totalPages;
        currentPage.value = response.data.number;
        console.log(commentList.value);
      })
      .catch((error) => {
        console.error(error);
      })
}

// 댓글 생성 요청
function onCreateComment() {
  console.log(commentInputValue.value);
  api.post(`/api/comments/${props.boardId}`, {
    content: commentInputValue.value,
    writer: memberStore.member?.memberId,
  }, {
    headers: {
      "Authorization": memberStore.accessToken
    }
  }).then(() => {
    Swal.fire("댓글이 생성되었습니다!");
    commentInputValue.value = "";
    fetchCommentList(currentPage.value);
  }).catch((error) => {
    loginHandler(error);
  })
}

// 댓글 편집 상태 메서드
function toggleComment(commentId, content) {
  if (editingCommentId.value === commentId) {
    // 편집 모드인 경우, 편집 모드 종료
    editingCommentId.value = null;
    editingCommentContent.value = "";
  } else {
    // 편집 모드 전환
    editingCommentId.value = commentId;
    editingCommentContent = content;
  }
}

function onUpdateComment(commentId, content) {
  api.putForm(`/api/comments/${commentId}`, {
    content: content
  }, {
    headers: {
      "Authorization": memberStore.accessToken
    }
  }).then(() => {
    Swal.fire("댓글이 수정되었습니다!");
    toggleComment();
    fetchCommentList(currentPage.value);
  }).catch((error) => {
    loginHandler(error);
  });
}

function onDeleteComment(commentId){
  api.delete(`/api/comments/${commentId}`,{
    headers: {
      "Authorization": memberStore.accessToken
    }
  }).then(()=>{
    Swal.fire("댓글이 삭제되었습니다!");
    fetchCommentList(currentPage.value);
  }).catch((error) => {
    loginHandler(error);
  });
}

function loginHandler(error){
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
}
function moveToLogin() {
  router.push({
    name: "MemberLogin"
  });
}

</script>

<template>
  <div class="board-comment-container">
    <div class="comment-input">
      <div v-if="memberStore.member">
        <textarea placeholder="댓글을 입력해주세요(최대 100자)" maxlength="100" v-model="commentInputValue"/>
        <button class="bg-blue-500" @click="onCreateComment">추가</button>
      </div>
      <div v-else>
        <textarea placeholder="로그인 후 이용바랍니다." disabled/>
        <button class="bg-blue-500" @click="moveToLogin">로그인</button>
      </div>
    </div>
    <div class="comment-list">
      <div class="comment" v-for="comment in commentList" :key="comment.id">
        <header>
          <div class="comment-writer">
            {{ comment.writer }}
          </div>
          <div class="comment-inserted">
            {{ comment.ago }}
          </div>
        </header>
        <section>
          <div v-if="editingCommentId !== comment.id" class="comment-content">
            {{ comment.content }}
          </div>
          <div v-else class="comment-content">
            <textarea v-model="editingCommentContent" maxlength="100">
            </textarea>
          </div>
        </section>
        <footer v-if="memberStore.member?.memberId === comment.writer">
          <div v-if="editingCommentId !== comment.id">
            <button class="text-blue-300" @click="toggleComment(comment.id, comment.content)">수정</button>
            <button class="text-red-400" @click="onDeleteComment(comment.id)">삭제</button>
          </div>
          <div v-else>
            <button class="text-blue-300" @click="onUpdateComment(editingCommentId, editingCommentContent)">저장</button>
            <button class="text-red-400" @click="toggleComment()">취소</button>
          </div>
        </footer>
      </div>
      <div class="pagination">
        <ul>
          <li>
            <button @click="fetchCommentList(currentPage -1)" :disabled="currentPage === 0">이전</button>
          </li>
          <li
              v-for="page in [...Array(Math.max(0, Math.min(pageGroupSize, totalPages - startPage + 1))).keys()].map(i => i + startPage)"
              :key="page">
            <button @click="fetchCommentList(page -1)" :class="{ currentPage: currentPage === page-1 }">
              {{ page }}
            </button>
          </li>
          <li>
            <button @click="fetchCommentList(currentPage +1)" :disabled="currentPage >= totalPages -1">다음</button>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/styles/pagination.css";

.board-comment-container,
.board-comment-container > .comment-input,
.board-comment-container > .comment-input > div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.board-comment-container {
  flex-direction: column;
}

/* -- 댓글 입력*/
.comment-input {
  width: 100%;
  margin-bottom: 1rem;
}

.board-comment-container textarea {
  width: 60%;
  height: 5rem;
  border-radius: 1rem;
  padding: 0.6rem;
  margin-right: 1rem;
  margin-top: 0rem;
}

.comment-input button,
.comment-list button {
  border-radius: 1rem;
  padding: 0.5rem 1rem;
}

/* -- 댓글 리스트*/
.comment {
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 1px solid white;
  margin-bottom: 1rem;
}

.comment > header {
  display: flex;
  width: 100%;
  align-items: center;
}

.comment > header > .comment-writer {
  background-image: var(--second-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  margin-right: 0.7rem;
  padding: 0.5rem 0rem;
}

.comment > header > .comment-inserted {
  font-size: 0.8rem;
  color: #bdbdbd;
  font-weight: bold;
}

.comment > section {
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 1px solid #bdbdbd;
}

.comment > footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;

}

.comment > footer > button {
  border-bottom: 1px solid #bdbdbd;
}

.comment-content > textarea {
  width: 100%;
}

</style>
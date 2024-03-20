<script setup>
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import Swal from "sweetalert2";
import {useMemberStore} from "@/store";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const boardInfo = reactive({});
const memberStore = useMemberStore();
const memberId = memberStore.member.memberId;
const fileBox = ref(false);

onMounted(() => {
  /* 게시글 가져오기 */
  axios.get(`/api/boards/${id}`)
      .then(response => {
        Object.assign(boardInfo, response.data);
        console.log(boardInfo);
        if(boardInfo.files !== null){
          boardInfo.files
        }
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

/* 게시글 삭제 */
function onBoardDelete(){
  Swal.fire({
    title: "정말로 삭제하시겠습니까?",
    text: "삭제 후, 영구적으로 복구가 불가합니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "삭제",
    cancelButtonText:"취소"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`/api/boards/${id}`)
          .then(()=>{
            Swal.fire({
              icon: "success",
              title: "삭제완료",
              text: "게시글이 성공적으로 삭제되었습니다."
            });
            router.push({
              name:"BoardList"
            })
          }).catch(()=>{
        Swal.fire({
          icon: "error",
          title: "이런...",
          text: "오류가 발생했습니다. 잠시후에 시도 부탁드립니다."
        });
      })
    }
  });
}

/* 게시글 수정으로 이동*/
function moveToBoardUpdate(){
  router.push({
    name: "BoardUpdate",
    params:id,
  })
}

/* 파일명에서 UUID 제거 */
function removeUUIDFromFilename(filename){
  // UUID와 파일명 사이의 구분자 '_' 기준으로 분리
  const file = filename.split('_');

  // 분리된 배열에서 첫 번째 인덱스(UUID)를 제외 후 합침.
  if(file.length > 1){
    return file.slice(1).join('_');
  }else{
    return filename;
  }
}
/* 파일 박스 핸들러*/
function fileBoxHandler(){
  fileBox.value = !fileBox.value;
}

/* 파일 다운로드 요청*/
function downLoadFile(boardId, fileName){
  axios({
    url: `/api/boards/download/${boardId}/${fileName}`,
    method:'GET',
    responseType:'blob',  // 응답 데이터 blob처리
    // Blob: 이진 데이터의 큰 덩어리를 다룰 때 사용되는 데이터 타입
  }).then((response)=>{
    // 다운로드 데이터 URL 객체로 저장
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // 다운로드를 위한 url href
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);    // 파일 다운로드 이름
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // 활용 끝난 URL 해제
  }).catch((error)=>{
    console.error(error);
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
        <div class="text-center mt-2">
          첨부 파일<span class="text-blue-300 mr-2">({{boardInfo.files?.length}})</span>
          <button class="text-blue-300" @click="fileBoxHandler">{{fileBox ? "닫기":"보기"}}</button>
          <div v-if="fileBox">
            <ul>
              <li v-for="file in boardInfo.files" :key="file.id">
                <button
                    class="text-blue-500 underline"
                    @click="downLoadFile(file.boardId, file.fileName)"
                >
                  {{removeUUIDFromFilename(file.fileName)}}
                </button>
              </li>
            </ul>
          </div>
        </div>

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
  align-items: center;
  padding-top: 2rem;
}
.board-footer textarea{
  width:60%;
  height:5rem;
  border-radius: 1rem;
  padding:0.6rem;
  margin-right: 1rem;
  margin-top: 0rem;
}
.board-footer > button{
  border-radius: 1rem;
  padding: 0.5rem 1rem;
}
</style>
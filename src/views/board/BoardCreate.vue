<template>
  <div class="board-container board-create-container pt-10">
    <header>
      <h1 class="text-white">게시글 쓰기</h1>
    </header>
    <section>
      <form class="board-create-form">
        <div class="board-create-content">
          <input
              type="text"
              placeholder="제목을 입력해주세요.(최대 100자)"
              v-model="title"
              maxlength=100
          >
        </div>
        <div class="board-create-content">
          <textarea class="custom-scroll-bar" placeholder="내용을 입력해주세요." v-model="content"/>
        </div>
        <div class="board-create-file">
          <span>{{ displayFileName }}</span>
          <button type="button" @click="triggerFileInput">파일 업로드</button>
          <input
              type="file"
              ref="fileInput"
              @change="setUploadFiles"
              accept="image/*"
              multiple
              style="display: none;"
          />
        </div>
        <div class="board-create-content justify-end">
          <button type="button" class="bg-blue-600" @click="onCreateBoard">저장</button>
          <button type="button" class="bg-red-600" @click="moveToHome">취소</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// 필드
const router = useRouter();
let title = ref("");
let content = ref("");
let writer = ref("");
const fileInput = ref(null);
const files = ref([]);
const displayFileName = ref('선택된 파일 없음');


// 메소드
// 홈으로 이동
function moveToHome() {
  router.push({
    name: "Home"
  })
}

// 파일 커스터마이징을 위해 input file trigger
function triggerFileInput() {
  fileInput.value.click();
}

// 멀티 파일을
function setUploadFiles(event) {
  files.value = event.target.files;
  displayFileName.value = Array.from(files.value)
      .map(file => file.name)
      .join(', ');
  if(displayFileName.value.length > 50){
    displayFileName.value = displayFileName.value.slice(0,50) + "....";
  }
}

function onCreateBoard() {
  writer.value = "test5";
  axios.postForm('/api/board/create', {
    title: title.value,
    content: content.value,
    writer: writer.value,
    uploadFiles: files.value,
  }).then(() => {
    Swal.fire("게시글이 생성되었습니다!");
    moveToHome();
  })

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

.board-create-form,
.board-create-content,
.board-create-file {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-create-file {
  width: 50%;
  flex-direction: column;
}

.board-create-file button{
  padding: 0.3rem;
  border: 1px solid white;
  border-radius: 0.6rem;
  color: white;
}

.board-create-file span{
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #c7c7c7;
}
.board-create-form {
  flex-direction: column;
}


.board-create-content button {
  padding: 0.5rem 1rem;
  color: white;
  border-radius: 0.5rem;
  margin: 0.5rem;
}

.board-create-container input, textarea {
  width: 50%;
  height: 2.2rem;
  border-radius: 1.5rem;
  padding: 0rem 1.5rem;
  margin-top: 1.5rem;
  color: black;
}

.board-create-container textarea {
  padding-top: 1rem;
  height: 20rem;
  color: white;
}

.board-create-container label {
  font-size: 2rem;
  color: white;
}
</style>
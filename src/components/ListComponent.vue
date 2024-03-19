<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

let boardList = ref([]);
const router = useRouter();
const currentPage = ref(0);   // 현재 페이지 번호 (0부터 시작)
const totalPages = ref(0);    // 총 페이지 수
const pageSize = ref(10);     // 페이지당 게시글 항목 수

function fetchBoardList(page){
  axios.get(`/api/boards?page=${page}&size=${pageSize.value}`)
      .then((response) => {
        boardList.value = response.data.content; // board list 목록
        totalPages.value = response.data.totalPages; // 총 페이지 수 업데이트
        currentPage.value = response.data.number; // 현재 페이지 번호 업데이트
        })
      .catch((error)=>{
        console.error(error);
      })
}

onMounted(()=> {
  fetchBoardList(currentPage.value);
});

function moveToBoard(boardId){
  router.push({
    name:"BoardView",
    params: {id: boardId},
  })
}

</script>

<template>
  <div class="default-style-container">
    <div class="board-list">
      <table>
        <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
        </tr>
        </thead>
        <tbody v-if="boardList">
        <tr class="table-body-tr" v-for="board in boardList" :key="board.id"
            @click="moveToBoard(board.id)">
          <td>{{board.id}}</td>
          <td>{{board.title?.length > 30 ? board.title.slice(0,30) + "....": board.title}}</td>
          <td>{{board.writer}}</td>
          <td>{{board.ago}}</td>
        </tr>
        </tbody>
      </table>
      <div class="board-pagination">
        <ul>
          <li>
            <button @click="fetchBoardList(currentPage -1)" :disabled="currentPage === 0">이전</button>
          </li>
          <li
              v-for="page in totalPages"
              :key="page"
              >
            <button @click="fetchBoardList(page -1)" :class="{ currentPage: currentPage === page-1 }" >
              {{page}}
            </button>
          </li>
          <li>
            <button @click="fetchBoardList(currentPage +1)" :disabled="currentPage >= totalPages -1">다음</button>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .board-list{
    width: 100%;
  }
  table{
    width: 100%;
  }
  tr{
    border: 1px solid white;
  }
  .table-body-tr:hover{
    background-image: var(--main-gradient);
    color: black;
    cursor: pointer;
  }

  td{
    border-right: 1px solid white;
    text-align: center;
    padding: 0.5rem 0rem;
  }

  /* pagination*/
  .board-pagination{
    width:100%;
    display: flex;
    margin-top: 0.5rem;
    cursor: pointer;
    justify-content: center;
  }
  ul{
    display: flex;
  }
  .board-pagination > ul > li > button{
  border: 1px solid white;
  padding: 0.3rem 0.6rem;
}
  .board-pagination > ul > li > button:disabled{
    opacity: 0.7;
  }
  .currentPage{
    background-color: white;
    color: black;
  }
</style>
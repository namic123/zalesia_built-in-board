<script setup>
import axios from "axios";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import _ from "lodash";

let boardList = ref([]);
const router = useRouter();
// 페이징 State
const currentPage = ref(0);   // 현재 페이지 번호 (0부터 시작)
const totalPages = ref(0);    // 총 페이지 수
const pageSize = ref(10);     // 페이지당 게시글 항목 수
const searchQuery = ref(""); // 검색 키워드
// 페이징 그룹 처리
const pageGroupSize = ref(10); // 그룹당 표시할 페이지 수
const startPage = ref(1);  // 페이지 그룹의 시작 페이지 번호

// board list 요청
function fetchBoardList(page) {
  axios.get(`/api/boards?page=${page}&size=${pageSize.value}&search=${searchQuery.value}`)
      .then((response) => {
        boardList.value = response.data.content; // board list 목록
        totalPages.value = response.data.totalPages; // 총 페이지 수 업데이트
        currentPage.value = response.data.number; // 현재 페이지 번호 업데이트
      })
      .catch((error) => {
        console.error(error);
      })
}

// lodash의 debounce 함수를 사용하여 호출을 디바운스
// seaching 기능을 위한 watch
watch(searchQuery, _.debounce(() => {
  fetchBoardList(0); // 검색 시 항상 첫 페이지부터 표시
}, 500)); // 500ms 디바운스

// 페이징 그룹 동적 처리를 위한 watch
watch(currentPage, () => {
  // 페이징 그룹의 첫 번째 페이지 계산
  // 예(현재 페이지 5): ( 5 / 10) * 10 +1
  // 0.5 * 10 + 1
  // 6
  startPage.value = Math.floor(currentPage.value / pageGroupSize.value) * pageGroupSize.value + 1;
})

onMounted(() => {
  fetchBoardList(currentPage.value);
});

function moveToBoard(boardId) {
  router.push({
    name: "BoardView",
    params: {id: boardId},
  })
}

</script>

<template>
  <div class="default-style-container flex-col">
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="검색어 입력">
    </div>
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
          <td>{{ board.id }}</td>
          <td>{{ board.title?.length > 30 ? board.title.slice(0, 30) + "...." : board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ board.ago }}</td>
        </tr>
        </tbody>
      </table>
      <div class="board-pagination">
        <ul>
          <li>
            <button @click="fetchBoardList(currentPage -1)" :disabled="currentPage === 0">이전</button>
          </li>
          <li
              v-for="page in [...Array(Math.max(0, Math.min(pageGroupSize, totalPages - startPage + 1))).keys()].map(i => i + startPage)"
              :key="page">
            <button @click="fetchBoardList(page -1)" :class="{ currentPage: currentPage === page-1 }">
              {{ page }}
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
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.search-container > input {
  width: 30rem;
  padding: 0.5rem;
}

.board-list {
  width: 100%;
}

table {
  width: 100%;
}

tr {
  border: 1px solid white;
}

.table-body-tr:hover {
  background-image: var(--main-gradient);
  color: black;
  cursor: pointer;
}

td {
  border-right: 1px solid white;
  text-align: center;
  padding: 0.5rem 0rem;
}

/* pagination*/
.board-pagination {
  width: 100%;
  display: flex;
  margin-top: 0.5rem;
  cursor: pointer;
  justify-content: center;
}

ul {
  display: flex;
}

.board-pagination > ul > li > button {
  border: 1px solid white;
  padding: 0.3rem 0.6rem;
}

.board-pagination > ul > li > button:disabled {
  opacity: 0.7;
}

.currentPage {
  background-color: white;
  color: black;
}
</style>
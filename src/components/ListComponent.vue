<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

let boardList = ref([]);
const router = useRouter();
onMounted(()=> {
  axios.get('/api/boards')
      .then((res)=>{
        boardList.value = res.data.boardList;
      })
      .catch((error)=>{
        console.log(error);
      });
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
          <td>{{board.inserted}}</td>
        </tr>
        </tbody>
      </table>
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
</style>
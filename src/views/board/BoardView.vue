<script setup>
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {onMounted, reactive} from "vue";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const boardInfo = reactive({});

onMounted(() => {
  axios.get(`/api/board/id/${id}`)
      .then(response => {
        Object.assign(boardInfo, response.data);
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "이런...",
          text: error.response.data.message || error.message,
        });
        router.push({
          name: "PageHome",
        })
      })
})

</script>

<template>
  <div class="default-style-container">
    <div v-if="boardInfo">
      <div class="board-title">

      </div>
      <div class="board-content">

      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  color: white;
}
</style>
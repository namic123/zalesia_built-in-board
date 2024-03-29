<script setup>
import {
  VueSpinnerIos,
} from 'vue3-spinners';
import {onMounted} from "vue";
import axios from "axios";
import {useMemberStore} from "@/store";
import Swal from "sweetalert2";
import {useRouter} from "vue-router";

onMounted(() => {
  loadMemberInfo();
})
const router = useRouter();

const memberStore = useMemberStore();
function loadMemberInfo() {
  axios.get('/api/members/validation')
      .then(response => {
        memberStore.member
            = {
          memberId : response.data.memberId,
          nickname : response.data.nickname,
          role : response.data.role,
        }
        Swal.fire({
          title: "로그인 성공!",
          text: "게시글 목록으로 이동합니다.",
          icon: "success"
        });
        router.push({
          name: "BoardList",
        });
      }).catch(() => {
          Swal.fire({
          icon: "error",
          title: "이런...",
          text: "검증에 실패했습니다. 다시 시도해주세요.",
          footer: '<a href="#">계정 정보를 잊으셨나요?</a>'
    });
    router.push({
      name: "MemberLogin",
    });
  });
}
</script>

<template>
  <div class="default-style-container">
    <VueSpinnerIos size="70" color="white"/>
  </div>
</template>

<style scoped>
div {
  height: 80%;
}
</style>
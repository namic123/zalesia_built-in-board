<template>
  <div class="default-style-container member-login-container">
    <div class="member-login-form">
      <h1 class="logo">Zalesia</h1>
      <form>
        <div>
          <input type="text" placeholder="아이디를 입력해주세요." v-model="memberId">
          <input type="password" placeholder="비밀번호를 입력해주세요" v-model="password">
        </div>
        <div>
          <button type="button" @click="handleLogin">로그인</button>
        </div>
      </form>
    </div>
    <div class="member-login-footer mt-2">
      <button>아이디 찾기</button>
      <button>비밀번호 찾기</button>
      <button @click="signupModalHandler">회원 가입</button>
    </div>
    <Transition name="modal">
      <MemberSignUp v-if="signupModal" @onCloseModal="signupModalHandler"/>
    </Transition>
  </div>
</template>
<script setup>
import MemberSignUp from "@/components/SignUp.vue";
import {ref} from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import {useRouter} from "vue-router";
import {useMemberStore} from "@/store";


const router = useRouter();
/* 로그인 관련 상태*/
const memberId = ref("");
const password = ref("");

const memberStore = useMemberStore();
/* 모달 */
const signupModal = ref(false);

function signupModalHandler() {
  signupModal.value = !signupModal.value;
}

function handleLogin() {
  const data = new URLSearchParams();
  data.append('username', memberId.value);
  data.append('password', password.value);

  // 토큰 생성과 안정성 멱등성의 이유로 POST 요청을 사용
  axios.post('/api/members/login', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    memberStore.member = response.data;
    memberStore.accessToken = response.headers.getAuthorization();
    Swal.fire({
      title: "로그인 성공!",
      text: "게시글 목록으로 이동합니다.",
      icon: "success"
    });
    router.push({
      name: "Home",
    });
  }).catch((error) => {
    console.log(error);
      Swal.fire({
        icon: "error",
        title: "이런...",
        text: "로그인이 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.",
        footer: '<a href="#">계정 정보를 잊으셨나요?</a>'
      });
  }).finally(() => {
    memberId.value = "";
    password.value = "";
  })
}

</script>

<style scoped>
button {
  border-radius: 1rem;
  padding: 0rem 0.5rem;
  font-weight: bold;
  color: white;
}

.member-login-form button {
  background-image: var(--main-gradient);
}

.member-login-container {
  display: flex;
  flex-direction: column;
  height: 80%;
}


.member-login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 1rem;
  padding: 2rem 5rem;
}

.member-login-form h1 {
  background-image: var(--second-gradient);
  font-weight: bold;
  font-size: 2rem;
}

.member-login-form > form > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.member-login-form input {
  padding: 0rem 1rem;
  margin-bottom: 0.5rem;
  height: 2.2rem;
  min-width: 300px;
  border-radius: 1rem;
}

.member-login-footer > button:nth-child(2) {
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-radius: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="default-style-container member-login-container">
    <div class="member-login-form">
      <h1>Zalesia</h1>
      <form @submit.prevent="">
        <div>
          <input type="text" placeholder="아이디를 입력해주세요.">
          <input type="password" placeholder="비밀번호를 입력해주세요">
        </div>
        <div>
          <button type="submit" class="bg-blue-600 text-white">로그인</button>
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
<script>
import MemberSignUp from "@/components/SignUp.vue";
import {ref} from "vue";

export default {
  components: {MemberSignUp},
  setup() {

    const signupModal = ref(false);

    function signupModalHandler() {
      signupModal.value = !signupModal.value;
    }

    return {

      signupModal,
      signupModalHandler,
    }
  }
}
</script>

<style scoped>
button {
  border-radius: 1rem;
  padding: 0rem 0.5rem;
  font-weight: bold;
  color: white;
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
  color: white;
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
.modal-leave-active{
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to{
  opacity: 0;
}
</style>

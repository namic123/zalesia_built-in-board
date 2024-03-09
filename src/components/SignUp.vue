<template>
  <div class="default-style-container member-signup-container">
    <div class="member-signup-form">
      <h1>회원가입</h1>
      <!-- 1번 라인 -->
      <div class="flex">
        <!-- 이름  -->
        <div>
          <label >이름</label>
          <input type="text"  placeholder="이름 입력">
        </div>
        <!-- 닉네임 -->
        <div>
          <label >별명</label>
          <input type="text"  placeholder="별명 입력">
          <!--          <div v-if="nicknameError" class="text-red-500">-->
          <!--            {{nicknameError}}-->
          <!--          </div>-->
          <button>중복체크</button>
        </div>
      </div>
      <!-- 2번 라인 -->
      <div>
        <div>
          <label >이메일</label>
          <input type="email"  placeholder="이메일 입력">
          <button>중복체크</button>
        </div>
      </div>
      <!-- 3번 라인 -->
      <div class="flex">
        <!-- 아이디 -->
        <div>
          <label >아이디</label>
          <input type="text"  placeholder="아이디 입력">
          <button>중복체크</button>
        </div>
        <!-- 비밀번호 -->
        <div>
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호 입력">
          <input type="password" placeholder="비밀번호 재확인">
          <button>안전검사</button>
        </div>
      </div>
      <!-- Footer -->
      <div>
        <button class="mr-2">가입</button>
        <button @click="onCloseModal">취소</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup(props, {emit}){
    function onCloseModal() {
      emit('onCloseModal');
    }
    return{
      onCloseModal
    }
  }
}
</script>

<style scoped>
.member-signup-container {
  height: 100vh;
  position: fixed;
  z-index: 100;
  background: rgba(0,0,0,0.6);
}

/* 폼 컨테이너 */
.member-signup-form {
  padding: 3rem 3rem;
  text-align: center;
  background-color: #ffffff;
  color: black;
  border-radius: 1rem;
}

.member-signup-form h1 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.member-signup-form > div {
  margin: 0.5rem;
}

.member-signup-form > div > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem;
}

.member-signup-form input, button {
  border-radius: 0.6rem;
  padding: 0rem 0.5rem;
}

.member-signup-form label {
  font-weight: bold;
}

.member-signup-form input {
  text-align: center;
  border: 1px solid #d5d5d5;
}

.member-signup-form input::placeholder {
  text-align: center;
}

.member-signup-form button {
  margin-top: 0.3rem;
  background-color: #7abcf3;
  color: white;
}

</style>
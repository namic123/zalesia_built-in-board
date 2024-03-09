<script setup>

</script>

<template>
  <div class="default-style-container member-signup-container">
    <div class="member-signup-form">
      <h1>회원가입</h1>
      <!-- 이름  -->
      <div class="flex">
        <div>
          <label for="name">이름</label>
          <input type="text" id="name" placeholder="이름 입력">
        </div>
        <!-- 닉네임 -->
        <div>
          <label for="name">별명</label>
          <input type="text" id="name" placeholder="별명 입력">
          <button class="bg-blue-600">중복체크</button>
        </div>
      </div>
      <!-- 아이디 -->
      <div class="flex">
        <div>
          <label for="id">아이디</label>
          <input type="text" id="id" placeholder="아이디 입력">
          <button class="bg-blue-600">중복체크</button>
        </div>
        <!-- 비밀번호 -->
        <div>
          <label for="password">비밀번호</label>
          <input type="password" id="password" placeholder="비밀번호 입력">
          <input type="password" id="password" placeholder="비밀번호 재확인">
          <button class="bg-blue-600">안전검사</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-signup-container {
  height: 80%;
}

.member-signup-form {
  border: 1px solid white;
  padding: 5rem 10rem;
  text-align: center;
}

.member-signup-form h1 {
  font-size: 2.2rem;
  font-weight: bold;
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
  border-radius: 1rem;
  padding: 0rem 0.5rem;
}

.member-signup-form input::placeholder {
  text-align: center;
}

.member-signup-form button {
  margin-top: 0.3rem;
}

</style>
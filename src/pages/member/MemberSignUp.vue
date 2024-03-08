<script setup>

</script>

<template>
  <div class="default-style-container member-signup-container">
    <div class="member-signup-form">
      <!-- 이름  -->
      <div>
        <label for="name">이름</label>
        <input type="text" id="name" placeholder="이름 입력">
      </div>
      <!-- 성별 -->
      <div class="member-signup-gender flex w-full flex-row">
        <label for="male">남자</label>
        <input type="radio" id="male" name="gender" value="m">
        <label for="women">여자</label>
        <input type="radio" id="women" name="gender" value="w">
      </div>
      <!-- 아이디 -->
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
</template>

<style scoped>
.member-signup-container {
  height:80%;
}

.member-signup-form {
  border: 1px solid white;
  padding:5rem 10rem
}

.member-signup-form > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.member-signup-form > .member-signup-gender{
  flex-direction: row;
  justify-content: center;
}
.member-signup-form input, button {
  border-radius: 1rem;
  padding: 0rem 0.5rem;
}
.member-signup-form button {

}

</style>
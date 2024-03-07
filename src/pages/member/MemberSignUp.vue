<script setup>

</script>

<template>
  <div class="default-style-container member-signup-container">
    <div class="member-signup-form">
      <!-- 첫번째 라인  -->
      <div>
        <div class="mr-1">
          <label for="name">이름</label>
          <input type="text" id="name" placeholder="이름 입력">
        </div>
        <div>
          <label for="male">남자</label>
          <input type="radio" id="male" name="gender" value="m">
          <label for="women">여자</label>
          <input type="radio" id="women" name="gender" value="w">
        </div>
      </div>
      <!-- 두번째 라인 -->
      <div>
        <label for="id">아이디</label>
        <input type="text" id="id" placeholder="아이디 입력">
        <button class="bg-blue-600">중복체크</button>
      </div>
      <!-- 세번째 라인 -->
      <div>
        <label for="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력해주세요">
        <label for="password">재확인</label>
        <input type="password" id="password" placeholder="다시 입력해주세요">
      </div>
      <!-- 네번째 라인 -->
    </div>
  </div>
</template>

<style scoped>
.member-signup-container {
}

.member-signup-form {
  border: 1px solid white;
}

.member-signup-form label {
  min-width: 50px;
}

.member-signup-form input, button {
  border-radius: 1rem;
  padding: 0rem 0.5rem;
}

.member-signup-form button {

}

.member-signup-form > div {
  display: flex;
}

</style>
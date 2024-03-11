<template>
  <div class="default-style-container member-signup-container">
    <div class="member-signup-form">
      <h1>회원가입</h1>
      <!-- 1번 라인 -->
      <div class="flex">
        <!-- 이름 -->
        <div>
          <label>이름</label>
          <input type="text" placeholder="이름 입력">
        </div>
        <!-- 닉네임 -->
        <div>
          <label>별명</label>
          <input
              type="text"
              placeholder="별명 입력(2글자 이상)"
              v-model="nickname"
              @input="updateNickname($event)"
          >
          <div v-if="isValidateNicknameSuccess" class="success">사용 가능한 별명입니다</div>
          <div v-if="isValidateNickname" class="errors">{{ nicknameErrorMessage }}</div>
          <button
              v-if="!isValidateNicknameSuccess"
              v-bind:disabled="nickname.length < 2"
              @click="checkNicknameDuplicates"
          >
            중복확인
          </button>
        </div>
      </div>
      <!-- 2번 라인 -->
      <div>
        <!-- 이메일 -->
        <div>
          <label>이메일</label>
          <input type="email" placeholder="이메일 입력" v-model="email">
          <div v-if="isValidateEmailSuccess" class="success">사용 가능한 이메일입니다</div>
          <div v-if="isValidateEmail" class="errors">이메일 형식이 아닙니다</div>
          <button
              v-bind:disabled="isValidateEmail || email.length <= 0"
              @click="checkEmailDuplicates"
          >중복확인
          </button>
        </div>
      </div>
      <!-- 3번 라인 -->
      <div class="flex">
        <!-- 아이디 -->
        <div>
          <label>아이디</label>
          <input type="text" placeholder="아이디 입력" v-model="id" @input="updateId($event)">
          <div v-if="isValidateId " class="errors">{{ idErrorMessage }}</div>
          <button
              v-bind:disabled="isValidateId"
              @click="checkIdDuplicates"
          >중복확인
          </button>
        </div>
        <!-- 비밀번호 -->
        <div>
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호 입력" v-model="password">
          <input type="password" placeholder="비밀번호 재확인" v-model="passwordCheck">
          <div v-if="comparePasswords" class="errors">비밀번호가 일치하지 않습니다</div>
          <div v-if="checkPasswordLength" class="errors">{{ password.length === 0 ? "" : "8자 이상 입력이 필요합니다" }}</div>
          <div v-if="isValidatePassword" class="errors">8자 이상, 영문자, 숫자, 특수문자를</div>
          <div v-if="isValidatePassword" class="errors">모두 포함해주세요</div>
          <div v-if="isValidatePasswordSuccess" class="success">안전한 비밀번호입니다</div>
          <button
              v-bind:disabled="comparePasswords || checkPasswordLength"
              @click="handlePasswordType"
          >
            안전검사
          </button>
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
<script setup>

import {computed, ref, watch} from "vue";
import axios from "axios";


const emit = defineEmits(['onCloseModal']);
/*------------------------ 필드 영역 --------------------------------------*/
let nickname = ref("");
let email = ref("");
let id = ref("");
let password = ref("");
let passwordCheck = ref("");
// 중복 여부 상태
let isNicknameDuplicated = ref(false);

/* 폼 에러메세지 */
// 닉네임 에러메세지 설정
let nicknameErrorMessage = computed(() => {
  if (nickname.value.length === 0) {
    return "";
  } else if (nickname.value.length < 2) {
    return "2자 이상 입력해주세요.";
  } else if (isNicknameDuplicated.value) {
    return "이미 존재하는 닉네임입니다.";
  } else {
    return "";
  }
});

// 아이디 에러메세지 설정
let idErrorMessage = computed(() => {
  if (id.value.length === 0) {
    return "";
  } else if (id.value.length < 5) {
    return "5자 이상 영문 소문자, 숫자만 포함";
  }
  return "";
});


/* 유효성 검증 */
// 닉네임 형식 검증
let isValidateNickname = computed(() => {
  if (nickname.value.length < 2) {
    return true;
  } else {
    return false;
  }
})
// 이메일 형식 검증
let isValidateEmail = computed(() => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailPattern.test(email.value) && email.value.length > 0;
});
// 아이디 형식 검증
const idPattern = /^(?=.*[a-z])[a-z0-9]+$/;
let isValidateId = computed(() => {
  return !idPattern.test(id.value) || (id.value.length < 5);
})
// 비밀번호와 재확인 비교
let comparePasswords = computed(() => {
  return password.value !== passwordCheck.value
});
//
let checkPasswordLength = computed(() => {
  return password.value.length < 8;
})

let isValidatePassword = ref(false);

/*------------ 유효성 검사 성공 메세지 -------------------------*/
let isValidateNicknameSuccess = ref(false);
let isValidatePasswordSuccess = ref(false);
let isValidateEmailSuccess = ref(false);
/*---------------------------- 메소드 영역 ------------------------------------------*/

function onCloseModal() {
  emit('onCloseModal');
}

// 한글 입력은 조합형 입력이므로, 키보드에서 키를 누를때마다 바로 입력이 확정되지 않는다.
// 따라서, v-model이 입력중인 조합형 문자를 바로 반영 못하는 문제가 있으므로, 아래 메서드와 같이 바로 반영
function updateNickname(e) {
  nickname.value = e.target.value;
}

function updateId(e) {
  id.value = e.target.value;
}

// 닉네임 중복 체크
function checkNicknameDuplicates() {
  console.log(nickname.value);
  axios.get('/api/member/check', {
    params: {
      nickname: nickname.value,
    }
  })

      .then((res) => {
        // 닉네임 사용 가능한 경우
        if (res.status === 200) {
          isValidateNicknameSuccess.value = true;
          isNicknameDuplicated.value = false; // 중복 없음
          //test
          // test2
        }

      })
      .catch((error) => {
        console.log(error);
        isValidateNickname.value = true;
      })
}

// 닉네임 중복 체크
function checkIdDuplicates() {
  console.log(nickname.value);
  axios.get('/api/member/check', {
    params: {
      id: id.value,
    }
  })
      .then(() => {
        isValidateNicknameSuccess.value = true;
      })
      .catch((error) => {
        console.log(error);
      })
}

// 닉네임 중복 체크
function checkEmailDuplicates() {
  console.log(nickname.value);
  axios.get('/api/member/check', {
    params: {
      email: email.value,
    }
  })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
}

/* 비밀번호 유효성 검증 (영문자, 숫자, 특수문자 포함 여부 확인)*/
function handlePasswordType() {
  // 대,소문자, 숫자 포함 여부 및 특수문자 필수 포함
  const hasUpperCase = /[A-Z]/.test(password.value);
  const hasLowerCase = /[a-z]/.test(password.value);
  const hasNumber = /[0-9]/.test(password.value);
  // IBM 규칙에 따라 가능한 특수 기호
  const hasSpecialChar = /[~!@#$%^&*_\-+=`|\\(){}\]:;"'<>,.?/]/.test(
      password.value,
  );
  // 일치 갯수 계산 로직
  const findPatternMatches = [hasUpperCase, hasLowerCase, hasNumber];
  const countMatches = findPatternMatches.filter(Boolean).length;

  if (!(countMatches > 1 && hasSpecialChar)) {
    isValidatePassword.value = true;
  } else {
    isValidatePasswordSuccess.value = true;
  }
}

/* -------------------------------- 상태관리 영역 ---------------------------------*/
/*------------------------------검증 후, 값 변경 방지 추적 -------------------------*/
watch([password, passwordCheck], () => {
  isValidatePasswordSuccess.value = false
});
watch(nickname,()=>{
  isValidateNicknameSuccess.value = false;
} )
</script>

<style scoped>
/* 컨테이너 */
.member-signup-container {
  height: 100vh;
  position: fixed;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
}

/* 폼 */
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


.member-signup-form button {
  margin-top: 0.3rem;
  background-color: #0888ff;
  color: white;
}

/* 폼 속성 커스텀 */
button:disabled {
  background-color: #76b9fa;
}

.member-signup-form input::placeholder {
  text-align: center;
}

</style>
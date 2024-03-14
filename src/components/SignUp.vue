<template>
  <div class="default-style-container member-signup-container">
    <div class="member-signup-form">
      <h1>회원가입</h1>
      <!-- 1번 라인 -->
      <div class="flex">
        <!-- 이름 -->
        <div>
          <label>이름</label>
          <input type="text" placeholder="이름 입력" v-model="name" @input="updateName($event)">
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
          <div v-if="isValidateEmail" class="errors">{{ emailErrorMessage }}</div>
          <button
              v-if="!isValidateEmailSuccess"
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
          <input type="text" placeholder="아이디 입력" v-model="memberId" @input="updateMemberId($event)">
          <div v-if="isValidateMemberIdSuccess" class="success">사용 가능한 아이디입니다.</div>
          <div v-if="isValidateMemberId" class="errors">{{ memberIdErrorMessage }}</div>
          <button
              v-if="!isValidateMemberIdSuccess"
              v-bind:disabled="isValidateMemberId"
              @click="checkMemberIdDuplicates"
          >중복확인
          </button>
        </div>
        <!-- 비밀번호 -->
        <div>
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호 입력" v-model="password" @input="updatePassword($event)">
          <input type="password" placeholder="비밀번호 재확인" v-model="passwordCheck" @input="updatePasswordCheck($event)">
          <div v-if="comparePasswords" class="errors">비밀번호가 일치하지 않습니다</div>
          <div v-if="checkPasswordLength" class="errors">{{ password.length === 0 ? "" : "8자 이상 입력이 필요합니다" }}</div>
          <div v-if="isValidatePassword" class="errors">8자 이상, 영문자, 숫자, 특수문자를</div>
          <div v-if="isValidatePassword" class="errors">모두 포함해주세요</div>
          <div v-if="isValidatePasswordSuccess" class="success">안전한 비밀번호입니다</div>
          <button
              v-if="!isValidatePasswordSuccess"
              v-bind:disabled="comparePasswords || checkPasswordLength"
              @click="handlePasswordType"
          >
            안전검사
          </button>
        </div>
      </div>
      <!-- Footer -->
      <div>
        <button
            v-bind:disabled="isValidateAllFormSuccess"
            class="mr-2"
            @click="createMemberAccount"
        >
          가입
        </button>
        <button @click="onCloseModal">취소</button>
      </div>
    </div>
  </div>
</template>
<script setup>

import {computed, ref, watch} from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const emit = defineEmits(['onCloseModal']);
/*------------------------ 상태 영역 --------------------------------------*/
let name = ref("");
let nickname = ref("");
let email = ref("");
let memberId = ref("");
let password = ref("");
let passwordCheck = ref("");
// 중복 여부 상태
let isNicknameDuplicated = ref(false);
let isEmailDuplicated = ref(false);
let isMemberIdDuplicated = ref(false);

// 폼 별 패턴
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const memberIdPattern = /^(?=.*[a-z])[a-z0-9]+$/;

/* 폼 메세지 */
/*------------ 유효성 검사 성공 메세지 -------------------------*/
let isValidateNicknameSuccess = ref(false);
let isValidatePasswordSuccess = ref(false);
let isValidateEmailSuccess = ref(false);
let isValidateMemberIdSuccess = ref(false);
let isValidateAllFormSuccess = computed(() => {
  // 모든 폼 검증이 성공적인지 여부를 반환
  return !(name.value.length > 0 &&
      isValidateNicknameSuccess.value &&
      isValidateEmailSuccess.value &&
      isValidateMemberIdSuccess.value &&
      isValidatePasswordSuccess.value)
});

/*------------ 공백 제거 -----------------------------*/
function removeSpaces(value, target) {
  target.value = value.replace(/\s+/g, '');
}

// 한글 입력은 조합형 입력이므로, 키보드에서 키를 누를때마다 바로 입력이 확정되지 않는다.
// 따라서, v-model이 입력중인 조합형 문자를 바로 반영 못하는 문제가 있으므로, 아래 메서드와 같이 바로 반영
function updateName(event) {
  name.value = event.target.value;
  removeSpaces(event.target.value, name);

}

function updateNickname(event) {
  nickname.value = event.target.value;
  removeSpaces(event.target.value, nickname);

}

function updateMemberId(event) {
  memberId.value = event.target.value;
  removeSpaces(event.target.value, memberId);
}


function updatePassword(event) {
  removeSpaces(event.target.value, password);
}

function updatePasswordCheck(event) {
  removeSpaces(event.target.value, passwordCheck);
}

/*------------ 유효성 검사 에러 메세지 -------------------------*/
// 닉네임 에러메세지 설정
let nicknameErrorMessage = computed(() => {
  if (nickname.value.length === 0) {
    return "";
  } else if (nickname.value.length < 2) {
    return "2자 이상 입력해주세요.";
  } else if (isNicknameDuplicated.value) {
    return "이미 존재하는 닉네임입니다.";
  }
  return "";
});

// 아이디 에러메세지 설정
let memberIdErrorMessage = computed(() => {
  if (memberId.value.length === 0) {
    return "";
  } else if (isMemberIdDuplicated.value) {
    return "이미 존재하는 아이디입니다.";
  } else if (memberId.value.length < 5 || !memberIdPattern.test(memberId.value)) {
    return "5자 이상 영문 소문자, 숫자만 포함";
  } else {
    return "";
  }
});

let emailErrorMessage = computed(() => {
  if (email.value.length === 0) {
    return "";
  } else if (!emailPattern.test(email.value)) {
    return "이메일 형식이 아닙니다.";
  } else if (isEmailDuplicated.value) {
    return "이미 존재하는 이메일입니다.";
  } else {
    return "";
  }
});

/* ---------------------------------유효성 검증----------------------------------------- */
// 닉네임 형식 검증
let isValidateNickname = computed(() => {
  if (nickname.value.length < 2 || isNicknameDuplicated.value) {
    return true;
  } else {
    return false;
  }
})
// 이메일 형식 검증
let isValidateEmail = computed(() => {
  // 패턴 일치 여부, 중복되는 경우
  return !emailPattern.test(email.value) || isEmailDuplicated.value;
});
// 아이디 형식 검증
let isValidateMemberId = computed(() => {
  return !memberIdPattern.test(memberId.value) || (memberId.value.length < 5) || isMemberIdDuplicated.value;
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

/*---------------------------- 메소드 영역 ------------------------------------------*/

function onCloseModal() {
  emit('onCloseModal');
}

/*----------------- 중복확인 요청 -------------------------------*/
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
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 409) {
          isNicknameDuplicated.value = true; // 중복 있음
        }
      });
}

// 닉네임 중복 체크
function checkMemberIdDuplicates() {
  axios.get('/api/member/check', {
    params: {
      memberId: memberId.value,
    }
  })
      .then((res) => {

        // 닉네임 사용 가능한 경우
        if (res.status === 200) {
          isValidateMemberIdSuccess.value = true;
          isMemberIdDuplicated.value = false; // 중복 없음
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log("아이디 중복됨");
          isMemberIdDuplicated.value = true; // 중복 있음
        }
      });
}

// 닉네임 중복 체크
function checkEmailDuplicates() {
  axios.get('/api/member/check', {
    params: {
      email: email.value,
    }
  })
      .then((res) => {
        // 이메일 사용 가능한 경우
        if (res.status === 200) {
          isValidateEmailSuccess.value = true;
          isEmailDuplicated.value = false; // 중복 없음
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 409) {
          isEmailDuplicated.value = true; // 중복 있음
        }
      });
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
/*------------------------------검증 후, 값 변경 방지를 위한 추적 -------------------------*/
watch([password, passwordCheck], () => {
  isValidatePasswordSuccess.value = false
});
watch(nickname, () => {
  isValidateNicknameSuccess.value = false;
  isNicknameDuplicated.value = false;
});
watch(email, () => {
  isValidateEmailSuccess.value = false;
  isEmailDuplicated.value = false;
});
watch(memberId, () => {
  isValidateMemberIdSuccess.value = false;
  isMemberIdDuplicated.value = false;
});

/* --------------------------- 계정 생성 ----------------------------------*/
function createMemberAccount() {
  isValidateAllFormSuccess.value = false;
  axios.post('/api/member/create', {
    name: name.value,
    nickname: nickname.value,
    email: email.value,
    memberId: memberId.value,
    password: password.value,
  })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "회원가입이 완료되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#0888ff",
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
          }
        });
        onCloseModal();
      })
      .catch((error) => {
            if (error.response.status === 400) {
              Swal.fire({
                position: "center",
                icon: "danger",
                title: "잘못된 요청입니다.",
                confirmButtonText: "확인",
                confirmButtonColor: "red",
                showClass: {
                  popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
                },
                hideClass: {
                  popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
                }
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "danger",
                title: "일시적인 오류가 발생했습니다. 잠시 후 시도해주세요.",
                confirmButtonText: "확인",
                confirmButtonColor: "red",
                showClass: {
                  popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
                },
                hideClass: {
                  popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
                }
              });
            }
          }
      )
}
</script>

<style scoped>
/* 컨테이너 */
.member-signup-container {
  height: 100%;
  position: fixed;
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
}

/* 폼 */
/* 폼 컨테이너 */
.member-signup-form {
  padding: 3rem 3rem;
  text-align: center;
  background-color: var(--second-bg-color);
  color: white;
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
}


.member-signup-form button {
  margin-top: 0.3rem;
  background-color: #385ffc;
  color: white;
}

/* 폼 속성 커스텀 */
button:disabled {
  background-color: #8594fc;
}

.member-signup-form input::placeholder {
  text-align: center;
}

</style>
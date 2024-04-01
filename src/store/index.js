import {defineStore} from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

export const useMemberStore = defineStore('member', {
        state: () => ({
            member: null,
            oauth2AccessToken: null,
        }),
        getters: {
            isLoggedIn: (state) => {
                return state.member != null;
            },
        },
        actions: {
            logout() {
                localStorage.clear();
                axios.post('/api/members/logout')
                    .then(() => {
                        Swal.fire({
                            title: "로그아웃",
                            text: "로그아웃 처리되었습니다.",
                            icon: "warning"
                        });
                    });
            }
        },
    }
)
import {defineStore} from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useMemberStore = defineStore('member', {
        state: () => ({
            member: null,
            oauth2AccessToken: null,
        }),
        getters: {
            isLoggedIn: (state) => {
                return state.member != null
            },
        },
        actions: {
            logout() {
                this.member = null;
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
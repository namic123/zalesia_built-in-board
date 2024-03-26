import {defineStore} from "pinia";

export const useMemberStore = defineStore('member', {
    state: ()=> ({
        member: null,
        accessToken:null,
    }),
    getters:{
        isLoggedIn: (state) => {
            return state.accessToken != null
        },
    },
    actions: {
        logout(){
            this.member = null;
            this.accessToken = null;
            localStorage.clear();
        }
    },
}
)
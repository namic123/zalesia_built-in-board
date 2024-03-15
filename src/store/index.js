import {defineStore} from "pinia";

export const useMemberStore = defineStore('memberStore',{
    state: () => ({
        member: null,
        isLoggedIn: false,
    }),
    actions:{
        setLogin(memberData){
            this.member = memberData;
            this.isLoggedIn = true;
        },
        logout(){
            this.member = null;
            this.isLoggedIn = false;
        }
    }
})
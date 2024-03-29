import {defineStore} from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useMemberStore = defineStore('member', {
    state: ()=> ({
        member: null,
    }),
    getters:{
        isLoggedIn: (state) => {
            return state.member != null
        },
    },
    actions: {
        logout(){
            this.member = null;
            axios.post('https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=r4RBEAxdu56ZrDf4haDh&client_secret=OgGDxj_Hre&code=EIc5bFrl4RibFls1&state=9kgsGTfH4j7IyAkg')
            axios.post('/api/members/logout')
                .then(()=>{
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
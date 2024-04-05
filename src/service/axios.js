import axios from 'axios';
export const defaultAxios = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 3000,
});

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 3000,
});

// 요청 인터셉터를 사용해 각 요청에 헤더를 동적으로 추가
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = accessToken;
    }
    return config;
});

// 응답 인터셉터를 사용하여 토큰 만료 시 재발급 로직 처리
api.interceptors.response.use(
    (response) => {
        // 성공 응답을 그대로 반환
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log("엑세스 토큰 만료로 재발급 요청 시작");
            originalRequest._retry = true; // 재요청 플래그 설정

            try {
                // 토큰 재발급 요청
                const response =
                    await defaultAxios.post('/api/reissue');
                const newAccessToken = response.headers.get('Authorization');

                console.log("토큰 재발급 완료, 새로 발급된 토큰 =", newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);

                // 재발급 받은 토큰으로 실패한 요청의 헤더 업데이트
                api.defaults.headers.common['Authorization'] =newAccessToken;
                originalRequest.headers['Authorization'] = newAccessToken;

                // 실패 요청 재시도
                return api(originalRequest);
            } catch (reissueError) {
                console.log("토큰 재발급 실패:", reissueError);
                return Promise.reject(reissueError);
            }
        }

        // 기타 모든 종류의 에러는 여기서 처리
        return Promise.reject(error);
    }
);

export default api;
/**
 * 處理身份驗證
*/
import { useApiUrlStore, useTokenStore, useUdataStore } from '@/stores/useGlobalStore';

// 登入頁面的身分確認
export const isAuthenticated = () => {
    const uStore = useUdataStore();
    return uStore.is_login;
}

// 驗證 Token 及 User 資料是否有效
//  return : true/false
export const checkAuthToken = async () => {
    const token = useTokenStore().token;

    if (token) {
        const udata = useUdataStore().udata;
        const auth_apiUrl = useApiUrlStore().apiUrl+"/authen";

        try {
            const response = await axios.post(auth_apiUrl, {
                token: token,
                udata: udata
            }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data) {
                // 正確
                return true;
            } else {
                // 資料有誤或失效
                removeAuthStore();  // 刪除 Store 資料
                return false;
            }
        } catch (error) {
            return false;  // 出錯時返回 false
        }
    } else {
        return false;
    }
}

// 設定資料
export const setAuthStore = (token, udata) => {
    removeAuthStore();

    const tStore = useTokenStore();
    const uStore = useUdataStore();

    // 將資料存入 Pinia Store
    tStore.updateTokenaVar(token);
    uStore.updateUdataVar(udata);
}

// 刪除 Pinia Store 資料
export const removeAuthStore = () => {
    const tStore = useTokenStore();
    const uStore = useUdataStore();

    tStore.removeToken();
    uStore.removeUdata();
}

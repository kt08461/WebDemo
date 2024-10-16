<script setup>
// template: https://bootsnipp.com/snippets/2X0r
import AlertMessage from '@/components/AlertMessage.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { replaceUrlPage, goNamePage } from '@/assets/js/redirect';
import { getCookie, setCookie, removeCookie } from '@/assets/js/cookies';
import { setAuthStore, removeAuthStore } from '@/assets/js/authen';
import { useApiUrlStore } from '@/stores/useGlobalStore';

const apiUrl = useApiUrlStore().apiUrl+"/login";
const route = useRoute();
const redirect = route.query.redirect ? route.query.redirect : null;

async function onSubmit(values) {
    resetSetting();

    await axios.post(apiUrl, values, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        const rs = response.data;
        if (rs['status'] === 1) {
            // 登入驗證成功
            removeCookie();
            setCookie(values);

            setAuthStore(rs['token'], rs['udata']);
            redirect? replaceUrlPage(redirect) : goNamePage('Articles');
        } else {
            // 驗證失敗
            error_msg.value = rs['errmsg'];
        }

        return true;
    })
    .catch(error => console.error(error))
}

// 取預設【記住Email】值
const getDefaultFlag = () => {
    try {
        let flag = JSON.parse(getCookie('flag'));
        flag = (flag === null)? true : flag;
        return flag;
    } catch (e) {
        return true;
    }
}

const resetSetting = () => {
    error_msg.value = null;
    removeAuthStore();
}

// 網頁使用變數
const password = ref(null);
const flag = ref( getDefaultFlag() );
const email = flag.value ? ref( getCookie('email') ) : ref(null);
const error_msg = ref(null);

</script>

<template>
    <div class="col-md-8 col-lg-6 col-xl-4">
        <AlertMessage v-if="error_msg" :line_warning_msg="error_msg" />
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="fs-5 panel-title">【登入 / Sign In】</div>
            </div>
            <div class="panel-body py-4" >
                <v-form @submit="onSubmit">
                <!-- login email -->
                <div class="input-group">
                    <span class="input-group-text bg-body-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                        </svg>
                    </span>
                    <v-field type="email" name="email" v-model="email" rules="required|email" class="form-control" placeholder="請輸入email" />
                </div>
                <p class="mx-2 mb-3 text-danger"><error-message name="email" /></p>

                <!-- login password -->
                <div class="input-group">
                    <span class="input-group-text bg-body-secondary">
                        <img src="/img/password.svg" width="24" height="24">
                    </span>
                    <v-field type="password" name="password" v-model="password" rules="required|min:5" class="form-control" placeholder="請輸入密碼(至少5位數)" />
                </div>
                <p class="mx-2 mb-3 text-danger"><error-message name="password" /></p>

                <div class="input-group">
                    <div class="col d-flex">
                        <label>
                            <v-field type="checkbox" name="flag" v-model="flag" :value="true" :unchecked-value="false" />
                            記住email
                        </label>
                    </div>
                    <div class="col-auto">
                        <RouterLink :to="{ name: 'Forget' }" class="icon-link">忘記密碼</RouterLink>
                    </div>
                </div>

                <div class="my-3">
                    <!-- Button -->
                    <button class="me-2 btn btn-success">登入</button>
                </div>
                </v-form>

                <div class="form-group fw-bold">
                    <div style="border-top: 1px solid#888; padding-top:15px;" class="mt-2 pt-3" >
                        還沒有帳號?
                        <RouterLink :to="{ name: 'Register' }" class="icon-link">註冊</RouterLink>
                    </div>
                </div>
                <p class="mb-4"></p>
                <div>
                    ※範例帳號：guest@mysite.com<br />
                    　　　密碼：guesspwd
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/css/member.css";
</style>
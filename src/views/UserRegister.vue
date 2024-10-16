<script setup>
import AlertMessage from '@/components/AlertMessage.vue';
import { ref } from 'vue';
import { goNamePage } from '@/assets/js/redirect';
import { setAuthStore, removeAuthStore } from '@/assets/js/authen';
import { useApiUrlStore } from '@/stores/useGlobalStore';

const apiUrl = useApiUrlStore().apiUrl+"/php/users/register";

// 網頁使用變數
const email = ref(null);
const name = ref(null);
const password = ref(null);
const password_confirm = ref(null);
const error_msg = ref(null);
const alert_msg = ref(null);
const buttonDisable = ref(false);

async function onSubmit(values) {
    resetSetting();

    await axios.post(apiUrl, values, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        const rs = response.data;
        if (rs['status'] === 1) {
            // 註冊成功
            setAuthStore(rs['token'], rs['udata']);
            buttonDisable.value = true;
            alert_msg.value = '已完成【'+rs['udata']['email']+'】註冊！';

            setTimeout(() => {
                goNamePage('Articles'); // 1秒後導向
            }, 1000);
        } else {
            // 驗證失敗
            error_msg.value = rs['errmsg'];
        }

        return true;
    })
    .catch(error => console.error(error))
}

const resetSetting = () => {
    error_msg.value = null;
    alert_msg.value = null;
    removeAuthStore();
}

</script>

<template>
    <div class="col-md-8 col-lg-6 col-xl-4">
        <AlertMessage v-if="error_msg" :line_warning_msg="error_msg" />
        <AlertMessage v-if="alert_msg" :line_alert_msg="alert_msg" />
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="fs-5 panel-title">【註冊 / Register】</div>
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

                    <!-- login name -->
                    <div class="input-group">
                        <span class="input-group-text bg-body-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
                            </svg>
                        </span>
                        <v-field type="text" name="name" v-model="name" rules="required|min:5" class="form-control" placeholder="請輸入暱稱(至少5位數)" />
                    </div>
                    <p class="mx-2 mb-3 text-danger"><error-message name="name" /></p>

                    <div style="border-top: 1px solid#888; padding-top:15px;" class="mt-2 pt-3" ></div>

                    <!-- login password -->
                    <div class="input-group">
                        <span class="input-group-text bg-body-secondary">
                            <img src="/img/password.svg" width="24" height="24">
                        </span>
                        <v-field v-model="password" rules="required|min:5" type="password" name="password" class="form-control" placeholder="請輸入密碼(至少5位數)" />
                    </div>
                    <p class="mx-2 mb-3 text-danger"><error-message name="password" /></p>

                    <div class="input-group">
                        <span class="input-group-text bg-body-secondary">
                            <img src="/img/password-confirm.svg" width="24" height="24">
                        </span>
                        <v-field v-model="password_confirm" :rules="{ required: true, confirmed: password }" type="password" name="password_confirm" class="form-control" placeholder="再次確認密碼" />
                    </div>
                    <p class="mx-2 mb-3 text-danger"><error-message name="password_confirm" /></p>

                    <div class="mt-4 input-group">
                        <!-- Button -->
                        <div class="col d-flex">
                            <button :disabled="buttonDisable" class="btn btn-success">確定</button>
                            <button type="reset" :disabled="buttonDisable" @click="resetSetting()" class="mx-2 btn btn-success">重置</button>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-secondary" @click="$router.back()">回上一頁</button>
                        </div>
                    </div>
                </v-form>
            </div>
        </div>
    </div>

</template>

<style scoped>
@import "@/assets/css/member.css";
</style>
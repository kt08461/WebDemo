<script setup>
import { inject, ref } from 'vue';
import { useApiUrlStore } from '@/stores/useGlobalStore';

const apiUrl = useApiUrlStore().apiUrl+"/php/users/forget";

const props = defineProps({
    resetMsg: Function
});

// inject
const is_confirm = inject('is_confirm');
const udata = inject('udata');
const error_msg = inject('error_msg');
const alert_msg = inject('alert_msg');

// 網頁使用變數
const step = 'step1';
const buttonDisable = ref(false);

async function onSubmit(values) {
    values['step'] = step;
    props.resetMsg();

    await axios.post(apiUrl, values, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        const rs = response.data;
        if (rs['status'] === 1) {
            // 驗證成功
            buttonDisable.value = true;

            udata.value = rs.udata;
            is_confirm.value = true;
            alert_msg.value = '已完成驗證，請變更新密碼！';
        } else {
            // 驗證失敗
            error_msg.value = rs['errmsg'];
        }

        return true;
    })
    .catch(error => console.error(error))
}

</script>

<template>
    <div class="pb-3">步驟一：請輸入註冊時的Email及暱稱</div>
    <v-form @submit="onSubmit">
        <div class="input-group">
            <span class="input-group-text bg-body-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                </svg>
            </span>
            <v-field type="email" name="email" rules="required|email" class="form-control" placeholder="請輸入email" />
        </div>
        <p class="mx-2 mb-3 text-danger"><error-message name="email" /></p>

        <!-- login name -->
        <div class="input-group">
            <span class="input-group-text bg-body-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
                </svg>
            </span>
            <v-field type="text" name="name" rules="required|min:5" class="form-control" placeholder="請輸入暱稱(至少5位數)" />
        </div>
        <p class="mx-2 mb-3 text-danger"><error-message name="name" /></p>

        <div class="mt-4 input-group">
            <!-- Button -->
            <div class="col d-flex">
                <button :disabled="buttonDisable" class="btn btn-success">下一步</button>
                <button type="reset" :disabled="buttonDisable" @click="props.resetMsg()" class="mx-2 btn btn-success">重置</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-secondary" @click="$router.back()">回上一頁</button>
            </div>
        </div>
    </v-form>
</template>

<style scoped>
@import "@/assets/css/member.css";
</style>
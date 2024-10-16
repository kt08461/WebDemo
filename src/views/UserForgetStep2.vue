<script setup>
import { inject, ref } from 'vue';
import { goNamePage } from '@/assets/js/redirect';
import { useApiUrlStore } from '@/stores/useGlobalStore';

const apiUrl = useApiUrlStore().apiUrl+"/php/users/forget";

const props = defineProps({
    resetMsg: Function
});

// inject
const udata = inject('udata');
const error_msg = inject('error_msg');
const alert_msg = inject('alert_msg');

// 網頁使用變數
const step = 'step2';
const password = ref(null);
const password_confirm = ref(null);
const buttonDisable = ref(false);

async function onSubmit(values) {
    const data = Object.assign(udata.value, values);
    props.resetMsg();

    await axios.post(apiUrl, {
        step: step,
        udata: data
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        const rs = response.data;
        if (rs['status'] === 1) {
            // 驗證成功
            buttonDisable.value = true;
            alert_msg.value = '密碼已變更，請使用新密碼登入！';

            setTimeout(() => {
                goNamePage('Login'); // 1秒後導向
            }, 1000);
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
    <v-form @submit="onSubmit">
        <!-- login password -->
        <div class="pb-3">步驟二：變更新密碼：</div>
        <div class="input-group">
            <span class="input-group-text bg-body-secondary">
                <img src="/img/password.svg" width="24" height="24">
            </span>
            <v-field v-model="password" rules="required|min:5" type="password" name="password" class="form-control" placeholder="請輸入新密碼(至少5位數)" />
        </div>
        <p class="mx-2 mb-3 text-danger"><error-message name="password" /></p>

        <div class="input-group">
            <span class="input-group-text bg-body-secondary">
                <img src="/img/password-confirm.svg" width="24" height="24">
            </span>
            <v-field v-model="password_confirm" :rules="{ required: true, confirmed: password }" type="password" name="password_confirm" class="form-control" placeholder="再次確認新密碼" />
        </div>
        <p class="mx-2 mb-3 text-danger"><error-message name="password_confirm" /></p>

        <div class="mt-4 input-group">
            <!-- Button -->
            <div class="col d-flex">
                <button :disabled="buttonDisable" class="btn btn-success">確定</button>
                <button type="reset" :disabled="buttonDisable" @click="props.resetMsg()" class="mx-2 btn btn-success">重置</button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-secondary" @click="$router.back()">回上一頁</button>
            </div>
        </div>
    </v-form>
</template>

<style scoped>
</style>
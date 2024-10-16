<script setup>
import { ref } from 'vue';
import { setAuthStore, removeAuthStore } from '@/assets/js/authen';
import { useApiUrlStore, useUdataStore } from '@/stores/useGlobalStore';

const apiUrl = useApiUrlStore().apiUrl+"/php/users/edit";
const uStore = useUdataStore();

// 網頁使用變數
const email = uStore.udata['email'];
const name = ref( uStore.udata['name'] );
const password = ref(null);
const password_confirm = ref(null);

const errorMsg = defineModel('errorMsg',{ type: String });
const alertMsg = defineModel('alertMsg',{ type: String });

const props = defineProps({
    resetMsg: {
        type: Function,
        required: true
    },
});

const onSubmit = async (values) => {
    values = Object.assign(uStore.udata, values);
    props.resetMsg();

    await axios.post(apiUrl, values, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        const rs = response.data;
        if (rs['status'] === 1) {
            // 修改完成
            removeAuthStore();
            setAuthStore(rs['token'], rs['udata']);

            if (password.value) {
                alertMsg.value = '資料、密碼變更已完成，請使用新密碼登入！';
            } else {
                alertMsg.value = '資料修改已完成！';
            }
        } else if (rs['status'] === 30) {
            alertMsg.value = rs['errmsg'];
        } else {
            // 驗證失敗
            errorMsg.value = rs['errmsg'];
        }

        return true;
    })
    .catch(error => console.error(error))
}

</script>

<template>
    <div class="panel-body py-4" >
        <v-form @submit="onSubmit">
            <div class="input-group">
                <span class="input-group-text bg-body-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>
                </span>
                <span class="form-control fw-semibold">{{ email }}</span>
            </div>
            <p class="mx-2 mb-3 text-danger"></p>

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
            <span class="text-dark">密碼變更：(若不變更無須輸入)</span>
            <div class="input-group">
                <span class="input-group-text bg-body-secondary">
                    <img src="/img/password.svg" width="24" height="24">
                </span>
                <v-field v-model="password" rules="min:5" type="password" name="password" class="form-control" placeholder="請輸入新密碼(至少5位數)" />
            </div>
            <p class="mx-2 mb-3 text-danger"><error-message name="password" /></p>

            <div class="input-group">
                <span class="input-group-text bg-body-secondary">
                    <img src="/img/password-confirm.svg" width="24" height="24">
                </span>
                <v-field v-model="password_confirm" :rules="{ confirmed: password }" type="password" name="password_confirm" class="form-control" placeholder="再次確認新密碼" />
            </div>
            <p class="mx-2 mb-3 text-danger"><error-message name="password_confirm" /></p>

            <div class="mt-4 input-group">
                <!-- Button -->
                <div class="col d-flex">
                    <button class="btn btn-success">確定</button>
                    <button type="reset" @click="props.resetMsg()" class="mx-2 btn btn-success">重置</button>
                </div>
            </div>
        </v-form>
    </div>
</template>

<style scoped>
</style>
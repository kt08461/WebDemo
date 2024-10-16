<script setup>
import AlertMessage from '@/components/AlertMessage.vue';
import UserForgetStep1 from './UserForgetStep1.vue';
import UserForgetStep2 from './UserForgetStep2.vue';
import { provide, ref } from 'vue';

const is_confirm = ref(false);
const udata = ref(null);
const error_msg = ref(null);
const alert_msg = ref(null);

// Provide 變數給子組件使用
provide('is_confirm', is_confirm);
provide('udata', udata);
provide('error_msg', error_msg);
provide('alert_msg', alert_msg);


// function clearMsg() {
const clearMsg = () => {
    error_msg.value = null;
    alert_msg.value = null;
}

</script>

<template>
    <div class="col-md-8 col-lg-6 col-xl-4">
        <AlertMessage v-if="error_msg" :line_warning_msg="error_msg" />
        <AlertMessage v-if="alert_msg" :line_alert_msg="alert_msg" />
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="fs-5 panel-title">【忘記密碼 / Forget Password】</div>
            </div>
            <div class="panel-body" >
                <UserForgetStep2 v-if="is_confirm" :resetMsg="clearMsg" />
                <UserForgetStep1 v-else :resetMsg="clearMsg" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/css/member.css";
</style>
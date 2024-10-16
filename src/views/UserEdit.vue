<script setup>
import AlertMessage from '@/components/AlertMessage.vue';
import UserEditContent from './UserEditContent.vue';
import { watch, ref } from 'vue';
import { getTimestamp } from '@/assets/js/util';
import { useUdataStore } from '@/stores/useGlobalStore';

const refreshKey = ref(null);
const error_msg = ref(null);
const alert_msg = ref(null);

const clearMsg = () => {
    error_msg.value = null;
    alert_msg.value = null;
}

watch(
    () => useUdataStore().udata,
    () => { refreshKey.value = getTimestamp(); },
    { immediate: true }
)

</script>

<template>
    <div class="col-md-8 col-lg-6 col-xl-4">
        <AlertMessage v-if="error_msg" :line_warning_msg="error_msg" />
        <AlertMessage v-if="alert_msg" :line_alert_msg="alert_msg" />
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="fs-5 panel-title">【會員資料修改 / Info】</div>
            </div>
            <UserEditContent
                :resetMsg="clearMsg"
                v-model:errorMsg="error_msg"
                v-model:alertMsg="alert_msg"
                :key="refreshKey"
            />
        </div>
    </div>

</template>

<style scoped>
@import "@/assets/css/member.css";
</style>
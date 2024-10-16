<script setup>
import AlertMessage from '@/components/AlertMessage.vue';

</script>

<template>
    <main>
        <div class="container">
            <div class="main-body p-0">
                <div class="inner-wrapper">
                    <!-- Inner main -->
                    <div class="inner-main">
                        <AlertMessage :alert_msg="'查無資料'" />
                        <AlertMessage :warning_msg="'查無資料'" />
                        <AlertMessage :line_alert_msg="'註冊完成'" />
                        <AlertMessage :line_warning_msg="'查無資料'" />
                    </div>
                    <!-- /Inner main -->
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
</style>
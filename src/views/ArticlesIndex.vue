<script setup>
import Navigation from '@/components/Navigation.vue';
import ArticlesInnerHeader from '@/components/ArticlesInnerHeader.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import ModalArticlesConfirm from '@/components/ModalArticlesConfirm.vue';
import { provide, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTimestamp } from '@/assets/js/util';
import { useApiUrlStore, useUdataStore } from '@/stores/useGlobalStore';

const route = useRoute();
const apiUrl = useApiUrlStore().apiUrl+"/php/articles/article";
const user_id = useUdataStore().udata.user_id;

const refreshKey = ref(null);
const alert_msg = ref(null);
const error_msg = ref(null);
const model_msg = ref({'article_id':null, 'title':null, 'content':null, 'submitFunc':null});

const clearMsg = () => {
    alert_msg.value = null;
    error_msg.value = null;
}

const reloadPage = () => {
    clearMsg();

    refreshKey.value = getTimestamp();
}

const delArticle = async (article_id) => {
    clearMsg();

    await axios.post(apiUrl, {
        user_id: user_id,
        action: 'delete',
        article_id:article_id,
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        const result = response.data;
        if (result) {
            alert_msg.value = '刪除成功！';
        } else {
            error_msg.value = '刪除失敗！';
        }

        return true;
    })
    .catch(error => console.error(error))
}

provide('alert_msg', alert_msg);
provide('error_msg', error_msg);
provide('clearMsg', clearMsg);
provide('delArticle', delArticle);
provide('model_msg', model_msg);

watch(
    () => [route.path, useUdataStore().is_login],
    reloadPage,
    { immediate: true }
)

</script>

<template>
    <main>
        <div class="container">
            <div class="main-body p-0">
                <div class="inner-wrapper">
                    <!-- Inner sidebar -->
                    <div class="inner-sidebar">
                        <ArticlesInnerHeader />
                        <Navigation />
                    </div>
                    <!-- /Inner sidebar -->

                    <!-- Inner main -->
                    <router-view :key="refreshKey" v-slot="{ Component }">
                        <component :is="Component">
                            <template v-slot:alert_msg>
                                <AlertMessage :line_alert_msg="alert_msg" />
                            </template>
                            <template v-slot:error_msg>
                                <AlertMessage :line_warning_msg="error_msg" />
                            </template>
                        </component>
                    </router-view>
                    <!-- /Inner main -->
                </div>
            </div>
        </div>
    </main>
    <ModalArticlesConfirm v-bind="model_msg" />
</template>
<style scoped>
@import "@/assets/css/website.css";
</style>
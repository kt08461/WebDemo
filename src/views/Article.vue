<script setup>
import AlertMessage from '@/components/AlertMessage.vue';
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTimestamp } from '@/assets/js/util';
import { useApiUrlStore, useUdataStore } from '@/stores/useGlobalStore';

const route = useRoute();
const uStore = useUdataStore();
const apiUrl = useApiUrlStore().apiUrl+"/php/articles/article";
const userselfOnly = route.meta.userselfOnly;

const article_id = route.params.article_id? ref(route.params.article_id) : ref(null);
const is_loading = ref(true);
let refreshKey = ref(null);

const loadTheArticle = async () => {
    await axios.post(apiUrl, {
        user_id: uStore.udata.user_id,
        article_id:article_id.value,
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        props.value.article = response.data;
        is_loading.value = false;

        return true;
    })
    .catch(error => console.error(error))
};

const refreshPage = () => {
  refreshKey.value = getTimestamp();
};

const props = ref({article:null, refreshPage:refreshPage});

watch(
    () => refreshKey.value,
    loadTheArticle,
    { immediate: true}
)

</script>

<template>
    <div class="inner-main">
        <div v-if="is_loading"><h3><img src="/img/loading.gif"> 資料載入中...</h3></div>
        <div v-else class="post-content">
            <div class="post-container">
                <div class="p-2">
                    <slot name="alert_msg"></slot>
                    <slot name="error_msg"></slot>
                </div>

                <router-view v-if="route.name == 'ArticleAdd'" v-bind="props" />
                <div v-else-if="props.article">
                    <div v-if="(userselfOnly === undefined) || (userselfOnly && (uStore.udata['user_id'] == props.article['user_id']))">
                        <!-- 無限制 OR 本人限定-->
                        <router-view
                            v-if="props.article"
                            v-bind="props"
                            :key="refreshKey"
                        />
                    </div>
                    <AlertMessage v-else :warning_msg="'未經授權！'" />
                </div>
                <AlertMessage v-else :alert_msg="'查無資料'" />

            </div>
        </div>
    </div>
</template>
<style scoped>
    @import "@/assets/css/article_view.css";
</style>
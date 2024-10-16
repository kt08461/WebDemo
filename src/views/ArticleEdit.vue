<script setup>
import ArticleComment from './ArticleComment.vue';
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { replaceUrlPage } from '@/assets/js/redirect';
import { useApiUrlStore, useUdataStore } from '@/stores/useGlobalStore';

const apiUrl = useApiUrlStore().apiUrl+"/php/articles/article";
const router = useRouter();
const uStore = useUdataStore();

const buttonDisable = ref(false);
const alert_msg = inject('alert_msg');
const clearMsg = inject('clearMsg');
const props = defineProps({
    article: {
        type: Object,
    },
    refreshPage: {
        type: Function,
        required: true
    },
});

const adata = computed(() => props.article || { title:null, content:null, state:'draft' });
const onSubmit = async () => {
    buttonDisable.value = true;
    const article_id = adata.value['article_id'];

    await axios.post(apiUrl, {
        user_id: uStore.udata.user_id,
        action: 'edit',
        article: adata.value,
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(async response => {
        const aid = response.data;
        if (article_id) {
            alert_msg.value = '文章內容已更新！';
            props.refreshPage();
        } else {
            alert_msg.value = '文章已新增！';
            setTimeout(() => {
                replaceUrlPage('/articles/'+aid); // 1秒後導向
            }, 1000);
        }
        buttonDisable.value = false;

        return true;
    })
    .catch(error => console.error(error))
}

</script>

<template>
    <div class="post-detail">
        <!-- 主文章 -->
        <v-form @submit="onSubmit">
            <div class="second p-2 mb-3">
                <div class="input-group">
                    <span class="input-group-text bg-body-secondary fw-bolder">
                        標題
                    </span>
                    <v-field v-model="adata.title" rules="required" type="text" name="title" class="form-control" placeholder="請輸入標題" />
                </div>
                <p class="mx-2 text-danger"><error-message name="title" /></p>
                <div class="input-group">
                    <span class="input-group-text bg-body-secondary fw-bolder align-items-start">
                        內文
                    </span>
                    <v-field v-model="adata.content" rules="required" as="textarea" name="content" cols="70" rows="7" class="form-control" />
                </div>
                <p class="mx-2 text-danger"><error-message name="content" /></p>

                <div class="input-group">
                    <span class="input-group-text bg-body-secondary fw-bolder">
                        狀態
                    </span>
                    <span class="form-control">
                        <v-field v-model="adata.state" name="state" type="radio" value="draft" />
                        草稿<img src="/img/draft.png">
                        <v-field v-model="adata.state" name="state" type="radio" value="private" class="ms-4" />
                        不公開<img src="/img/private.png">
                        <v-field v-model="adata.state" name="state" type="radio" value="published" class="ms-4" />
                        發佈<img src="/img/published.png">
                    </span>
                </div>

                <div class="d-flex justify-content-center my-3">
                    <button :disabled="buttonDisable" class="btn btn-success me-2">確定</button>
                    <button :disabled="buttonDisable" @click="clearMsg()" type="reset" class="btn btn-success">重置</button>
                    <button type="button" class="btn btn-secondary ms-5" @click="router.back()">回上一頁</button>
                </div>
            </div>
        </v-form>

        <!-- 留言 -->
         <div v-if="adata.article_id">
            <ArticleComment :article_id="adata.article_id" />
         </div>
    </div>
</template>

<style scoped>
    @import "@/assets/css/article_view.css";
    @import "@/assets/css/article_content.css";
</style>
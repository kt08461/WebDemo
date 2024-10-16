<script setup>
import ArticleComment from './ArticleComment.vue';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getTimestamp } from '@/assets/js/util';
import { useApiUrlStore, useUdataStore } from '@/stores/useGlobalStore';

const router = useRouter();
const uStore = useUdataStore();
const apiUrl = useApiUrlStore().apiUrl+"/php/articles/article";

const form = ref(null);
const buttonDisable = ref(false);
const refreshKey = ref(null);

const alert_msg = inject('alert_msg');
const error_msg = inject('error_msg');
const clearMsg = inject('clearMsg');
const props = defineProps({
    article: {
        type: Object,
        required: true
    },
    refreshPage: {  // refreshPage用不到
        type: Function,
        required: false
    },
});

const comment = ref( {content:null, parent_id:props.article['article_id']} );
const onCommentSubmit = async (values) => {
    clearMsg();
    buttonDisable.value = true;
    comment.value['content'] = values['comment'];

    await axios.post(apiUrl, {
        action: 'add_comment',
        user_id: uStore.udata.user_id,
        comment: comment.value,
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(async response => {
        const result = response.data;
        if (result) {
            alert_msg.value = '留言已新增！';
        } else {
            error_msg.value = '留言新增失敗！';
        }
        form.value.resetForm();  // 執行form的reset
        refreshKey.value = getTimestamp();
        buttonDisable.value = false;

        return true;
    })
    .catch(error => console.error(error))
}

</script>

<template>
    <img class="profile-photo-md pull-left float-start" :src="'/img/'+article.state+'.png'" />
    <div class="post-detail">
        <!-- 主文章 -->
        <div class="second p-2 mb-3">
            <h4 class="mb-4 fw-bolder">{{ article.title }}</h4>
            <div class="d-flex justify-content-between align-items-end border-2 border-bottom pb-3">
                <div class="text-muted">
                    <span class="text-success">{{ article.name }}</span> - {{ article.updated_at }} 最後更新
                </div>
                <div>
                    <RouterLink v-if="article.user_id == uStore.udata['user_id']" :to="{ name: 'ArticleEdit', params:{article_id:article.article_id} }" class="btn btn-secondary btn-sm">編輯</RouterLink>
                    <button type="button" class="btn btn-secondary btn-sm mx-2" @click="router.back()">回上一頁</button>
                </div>
            </div>
            <div class="my-3 mx-2">
                <pre class="fs-5">{{ article.content }}</pre>
            </div>

            <v-form v-if="uStore.is_login" @submit="onCommentSubmit" ref="form">
                <div class="bg-secondary bg-opacity-25 mx-2 p-3 d-flex text-nowrap">
                    <div class="d-flex flex-nowrap align-items-start" style="nowap">
                        <span class="text-success me-2">{{ uStore.udata['name'] }}</span>
                        留言：
                        <v-field rules="required" as="textarea" name="comment" cols="70" rows="5" class="form-control" />
                    </div>
                    <div class="d-flex align-items-start flex-column mx-3">
                        <div class="mb-auto">
                            <div class="text-danger"><error-message name="comment" /></div>
                        </div>
                        <div>
                            <button :disabled="buttonDisable" class="btn btn-success">送出留言</button>
                        </div>
                    </div>
                </div>
            </v-form>
        </div>

        <!-- 留言 -->
        <ArticleComment :article_id="article.article_id" :key="refreshKey" />
    </div>
</template>

<style scoped>
    @import "@/assets/css/article_view.css";
    @import "@/assets/css/article_content.css";
</style>
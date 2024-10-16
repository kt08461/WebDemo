<script setup>
import ArticleCommentRow from './ArticleCommentRow.vue';
import { onMounted, inject, ref } from 'vue';
import { useApiUrlStore } from '@/stores/useGlobalStore';

const fetch_apiUrl = useApiUrlStore().apiUrl+"/php/articles/article";
const comments = ref([]);

const delArticle = inject('delArticle');
const model_msg = inject('model_msg');
const props = defineProps({
    article_id: {
        type: [Number, String],
        required: true
    },
});

const loadComments = async () => {
    await axios.post(fetch_apiUrl, {
        action: 'get_comments',
        article_id:props.article_id,
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        comments.value = response.data;
        return true;
    })
    .catch(error => console.error(error))
};

const onDeleteSubmit = async (comment_id) => {
    await delArticle(comment_id);
    loadComments();
};

const setModelMsg = (comment) => {
    model_msg.value['article_id'] = comment.comment_id;
    model_msg.value['title'] = '留言刪除';
    model_msg.value['submitFunc'] = onDeleteSubmit;
    model_msg.value['content'] = '是否確定刪除？';
}

onMounted(() => {
    loadComments();
});

</script>

<template>
    <div class="second p-2 mb-3">
        <div v-if="comments.length > 0" class="my-3 mx-2">
            <ArticleCommentRow v-for="data in comments" :comment="data" :setModelMsg="setModelMsg" :key="data.comment_id" />
        </div>
        <div v-else class="my-3 mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
            </svg>
            暫無留言
        </div>
    </div>
</template>

<style scoped>
    @import "@/assets/css/article_view.css";
    @import "@/assets/css/article_content.css";
</style>
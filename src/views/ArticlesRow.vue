<script setup>
import { useUdataStore } from '@/stores/useGlobalStore';

const user_id = useUdataStore().udata.user_id;
const is_login = useUdataStore().is_login;

defineProps({
    article: {
        type: Object,
        required: true
    },
    comment_cnt: {
        type: Object,
        required: true
    },
    setModelMsg: {
        type: Function,
        required: true
    },
});

</script>

<template>
    <div class="card mb-2">
        <div class="card-body p-2 p-sm-3">
            <div class="media forum-item">
                <div class="media-body">
                    <h6>
                        <img class="me-2" :src="'/img/'+article.state+'.png'" />
                        <RouterLink :to="{ name: 'Article', params: { article_id: article.article_id }}" class="text-body fw-bold">{{ article.title }}</RouterLink>
                    </h6>
                    <p class="text-secondary text-truncate">
                        {{ article.content }}
                    </p>
                    <div class="container">
                        <div class="row justify-content-between">
                            <div class="col-auto text-muted">
                                <span class="text-dark fw-bold">{{ article.created_at.split(' ')[0] }}</span> 由
                                <span class="text-success">{{ article.name }}</span>
                                分享 / 留言
                                ( {{ comment_cnt[article.article_id]? comment_cnt[article.article_id] : 0 }} )
                                <div v-if="article.created_at !== article.updated_at">
                                    最後更新時間:
                                    <span class="text-danger">{{ article.updated_at }}</span>
                                </div>
                            </div>
                            <div v-if="is_login && (user_id == article.user_id)" class="col-auto">
                                <RouterLink :to="{ name: 'ArticleEdit', params:{article_id:article.article_id} }" class="fs-6 btn btn-secondary btn-sm me-2">編輯</RouterLink>
                                <button type="button" @click="setModelMsg(article);" data-bs-toggle="modal" data-bs-target="#confirmModal" class="fs-6 btn btn-secondary btn-sm me-2">刪除</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
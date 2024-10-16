<script setup>
import { useUdataStore } from '@/stores/useGlobalStore';

const user_id = useUdataStore().udata['user_id'];

defineProps({
    comment: {
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
    <div class="post-comment">
        <div><img src="/img/comment.png" class="me-2"></div>
        <div class="flex-grow-1">
            <span class="text-success">{{ comment.name }}</span> - {{ comment.created_at }} 留言
            <div class="bg-secondary bg-opacity-25 me-2 p-3 rounded">
                <pre class="fs-6">{{ comment.content }}</pre>
            </div>
        </div>
        <div class="d-flex align-items-end">
            <button v-if="comment.user_id == user_id" type="button" @click="setModelMsg(comment);" data-bs-toggle="modal" data-bs-target="#confirmModal" class="btn btn-secondary btn-sm me-2">刪除</button>
        </div>
    </div>
</template>

<style scoped>
</style>
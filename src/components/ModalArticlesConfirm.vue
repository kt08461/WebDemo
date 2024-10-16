<script setup>
const props = defineProps({
    article_id: {
        type: [Number, String],
    },
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    submitFunc: {
        type: Function,
    }
});

const handleSubmit = () => {
    props.submitFunc(props.article_id);

    // 使用 Bootstrap 的模態框 API 關閉對話框
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
    modal.hide();
};

</script>

<template>
    <v-form @submit="handleSubmit">
        <div class="modal fade" id="confirmModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmModalLabel">{{ title }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-text="content" style="white-space: pre-wrap;"></div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success">確定</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </v-form>
</template>

<style scoped>
</style>
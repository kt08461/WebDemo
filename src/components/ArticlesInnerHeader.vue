<script setup>
</script>

<template>
    <div class="inner-sidebar-header justify-content-center">
        <RouterLink :to="{ name: 'ArticleAdd'}" class="btn btn-primary has-icon btn-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            新增文章
        </RouterLink>
    </div>
</template>

<style scoped>
</style>
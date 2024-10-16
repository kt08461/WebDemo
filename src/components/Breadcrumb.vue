<script setup>
import { useBreadcrumbStore } from '@/stores/useBreadcrumbStore';

const brStore = useBreadcrumbStore();

</script>

<template>
    <nav class="fs-5" style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);">
        <ol class="breadcrumb">
            <li v-for="(item, idx) in brStore.breadcrumb_array" class="breadcrumb-item text-white" :key="'bread'+idx">
                <RouterLink v-if="item.link_name" :to="{ name:item.link_name }" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{{ item.name }}</RouterLink>
                <RouterLink v-if="item.link_path" :to="{ path:item.link_path }" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{{ item.name }}</RouterLink>
            </li>
        </ol>
    </nav>
</template>

<style scoped>
</style>
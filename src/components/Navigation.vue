<script setup>
// template => https://s.bootsnipp.com/iframe/x85EN
import { useUdataStore } from '@/stores/useGlobalStore';
import { useMenuActiveStore } from '@/stores/useBreadcrumbStore';

const uStore = useUdataStore();
const mStore = useMenuActiveStore();

</script>

<template>
<!-- Inner sidebar body -->
<div class="navbar-default sidebar">
    <div class="mt-3 sidebar-nav">
        <strong class="bd-links-heading d-flex w-100 align-items-center fw-semibold">
            <img class="me-2" src="https://icons.getbootstrap.com/assets/icons/grid-fill.svg">
            PHP
        </strong>

        <ul class="ms-4 nav nav-pills flex-column" id="side-menu">
            <li>
                <RouterLink :to="{ name: 'Articles' }" :class="{active:mStore.menu.articles}" >文章分享</RouterLink>
                <ul v-if="uStore.is_login" class="nav nav-second-level">
                    <li>
                        <RouterLink :to="{ name:'ArticlesParams', params:{uid:'u'+uStore.udata.user_id} }" :class="{active:mStore.menu.articles_mine}" >我的文章</RouterLink>
                    </li>
                </ul>
            </li>
            <li><a href="#" :class="{active:mStore.menu.products}" >商品管理</a></li>
        </ul>
    </div>
</div>
<!-- /Inner sidebar body -->

</template>

<style scoped>
  @import "@/assets/css/navigation.css";
</style>
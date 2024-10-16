<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import { useRoute } from 'vue-router';
import { replaceUrlPage } from '@/assets/js/redirect';
import { removeAuthStore } from '@/assets/js/authen';
import { useUdataStore } from '@/stores/useGlobalStore';

const route = useRoute();
const uStore = useUdataStore();

// 登出
const Logout = () => {
  removeAuthStore();

  // 登出時，觸發重新渲染
  replaceUrlPage( route.path );
}

</script>

<template>
  <header>
    <div class="navbar navbar-dark bg-dark bg-gradient shadow-sm">
      <div class="container">
        <Breadcrumb />
        <div class="navbar navbar-expand-lg navbar-dark">
          <div v-if="uStore.is_login" class="container text-light fs-6">
            <div class="mx-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"></path>
              </svg>
            </div>
            {{ uStore.udata['name'] }}
          </div>
          <div class="nav-item dropdown">
            <button class="btn btn-dark border-secondary" type="button">
              <span class="navbar-toggler-icon"></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
              <li v-if="!uStore.is_login"><RouterLink :to="{ name: 'Login' }" class="dropdown-item">登入 / 註冊</RouterLink></li>
              <li><RouterLink :to="{ name: 'Articles' }" class="dropdown-item">文章分享</RouterLink></li>
              <li v-if="uStore.is_login"><RouterLink :to="{ name: 'UserInfo' }" class="dropdown-item">會員資料</RouterLink></li>
              <li v-if="uStore.is_login"><RouterLink :to="route.fullPath" @click="Logout" class="dropdown-item">登出</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@media all and (min-width: 992px) {
	.navbar .nav-item .dropdown-menu{ display: none; }
	.navbar .nav-item:hover .nav-link{   }
	.navbar .nav-item:hover .dropdown-menu{ display: block; }
	.navbar .nav-item .dropdown-menu{ margin-top:0; }
}
</style>
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

// 狀態管理工具
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';

// 引入 VeeValidate 元件跟功能
import { defineRule, Form, Field, ErrorMessage, configure } from 'vee-validate';
// 引入 VeeValidate 的驗證規則
import { required, email, min, confirmed } from '@vee-validate/rules';
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import { customMessages } from '@/stores/zh_TW_Global';

import { checkAuthToken, isAuthenticated } from '@/assets/js/authen';
import { useBreadcrumbStore } from '@/stores/useBreadcrumbStore';


/********* vee-validate *********/
// Define the rule globally
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', confirmed);

// 合併自定義的訊息到 zhTW
const localizedMessages = {
    ...zhTW,  // 保留原本的 zh_TW 訊息
    names: { ...zhTW.names, ...customMessages.names },  // 合併欄位名稱
    messages: { ...zhTW.messages, ...customMessages.messages },  // 合併自定義訊息
    fields: { ...zhTW.fields, ...customMessages.fields },  // 合併欄位自定義訊息
};

configure({
    validateOnInput: true,  // 即時驗證
    generateMessage: localize({ zh_TW: localizedMessages }),  // 使用擴展的本地化訊息
});
setLocale('zh_TW');     // 語系設定為繁體中文

const app = createApp(App);

/********* pinia *********/
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);

// 掛載 Global 的 VeeValidate 元件
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.use(router);

router.isReady().then(() => app.mount('#app'))

router.beforeEach(async (to, from) => {
    // 驗證 Token 及 User 資料
    await checkAuthToken();

    // 登入畫面身份驗證
    if (to.meta.requiresAuth && !isAuthenticated() && to.name !== 'Login') {
        return {
            path:'/login',
            query: { redirect: to.fullPath },   // 保存目前位置
        };
    }
});


router.beforeResolve(async to => {
    console.log('beforeResolve');

    // Set Breadcrumb
    useBreadcrumbStore().setBreadcrumb(to);
});

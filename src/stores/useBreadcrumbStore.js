// stores/useBreadcrumbStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia';
import { convertCamelToSnake } from '@/assets/js/util';
import { useUdataStore } from './useGlobalStore';

// Menu Active Class store
export const useMenuActiveStore = defineStore('MenuActive',
    () => {
        const initialMenu = {
            articles:false,
            articles_mine:false,
            products:false,
        };

        // 建立 menu ref，初始值設為 initialMenu
        const menu = ref({ ...initialMenu });

        // setActive 方法，設定被選取選項
        const setActive = (itemVal) => {
            for (const key in menu.value) {
                menu.value[key] = (itemVal == key)? true: false;
            }
        }

        // resetMenu 方法，將 menu 還原為初始值
        const resetMenu = () => {
            menu.value = { ...initialMenu };  // 使用擴展運算符來拷貝 initialMenu 的值
        }

        return { menu, setActive, resetMenu }
    },{
        persist: true,
    }
);

// Breadcrumb
export const useBreadcrumbStore = defineStore('breadcrumb',
    () => {
        const initialBreadcrumb = {
            linkName:null,
            breadcrumb_path:null,
            breadcrumb_array:[],
        };

        const linkName = ref(initialBreadcrumb.linkName);
        const breadcrumb_path = ref(initialBreadcrumb.breadcrumb_path);
        const breadcrumb_array = ref(initialBreadcrumb.breadcrumb_array);

        // call by beforeResolve
        const setBreadcrumb = (to) => {
            const uStore = useUdataStore();
            const mStore = useMenuActiveStore();

            if (to.meta.resetBreadcrumb) {
                mStore.resetMenu();
                resetBreadcrumb();
            }

            switch(to.name) {
                case 'Articles':
                    linkName.value = 'articles';
                    mStore.setActive(linkName.value);
                    breadcrumb_path.value = '/'+linkName.value;
                    break;
                case 'ArticlesParams':
                    if (to.params.uid && (to.params.uid.substr(1) == uStore.udata.user_id)) {
                        linkName.value = 'articles_mine';
                    } else {
                        linkName.value = 'articles';
                    }
                    mStore.setActive(linkName.value);
                    breadcrumb_path.value = '/'+linkName.value;
                    break;
                case 'Article':
                case 'ArticleAdd':
                case 'ArticleEdit':
                    const article_manu = ['articles', 'articles_mine'];
                    if (!article_manu.includes(linkName.value)) {
                        linkName.value = 'articles';
                        mStore.setActive(linkName.value);
                        breadcrumb_path.value = '/'+linkName.value;
                    }
                    if (to.name == 'ArticleAdd') {
                        breadcrumb_path.value += '/'+convertCamelToSnake(to.name);
                    }
                    break;
                case 'UserInfo':
                case 'Login':
                case 'Register':
                case 'Forget':
                    linkName.value = convertCamelToSnake(to.name);
                    breadcrumb_path.value = '/'+linkName.value;
                    break;
                default:
                    break;
            }

            setBreadcrumbObj();
        }

        const setBreadcrumbObj = () => {
            if (!breadcrumb_path.value) return ;

            const user_id = useUdataStore().udata.user_id;
            breadcrumb_array.value = [];

            for (const item of breadcrumb_path.value.split('/')) {
                switch(item) {
                    case '':
                        breadcrumb_array.value.push({name:'首頁', link_name:'Home'});
                        break;
                    case 'articles':
                        breadcrumb_array.value.push({name:'文章分享', link_name:'Articles'});
                        break;
                    case 'articles_mine':
                        breadcrumb_array.value.push({name:'我的文章', link_path:'/articles/u'+user_id});
                        break;
                    case 'user_info':
                        breadcrumb_array.value.push({name:'會員資料', link_name:'UserInfo'});
                        break;
                    case 'login':
                        breadcrumb_array.value.push({name:'會員登入', link_name:'Login'});
                        break;
                    case 'register':
                        breadcrumb_array.value.push({name:'會員註冊', link_name:'Register'});
                        break;
                    case 'forget':
                        breadcrumb_array.value.push({name:'忘記密碼', link_name:'Forget'});
                        break;
                }
            }
        }

        const resetBreadcrumb = () => {
            linkName.value = initialBreadcrumb.linkName;
            breadcrumb_path.value = initialBreadcrumb.breadcrumb_path;
            breadcrumb_array.value = initialBreadcrumb.breadcrumb_array;
        }

        return { setBreadcrumb, breadcrumb_array };
    },{
        persist: true,
    }
);

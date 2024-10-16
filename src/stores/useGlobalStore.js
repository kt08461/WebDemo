// stores/useGlobalStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia';

// udata store
export const useUdataStore = defineStore('udata',
    () => {
        const is_login = ref(null);
        const udata = ref([]);

        const updateUdataVar = (newVal) => {
            if (newVal) {
                is_login.value = true;
                udata.value = newVal;
            } else {
                removeUdata();
            }
        }

        const removeUdata = () => {
            is_login.value = false;
            udata.value = [];
        }

        return { is_login, udata, updateUdataVar, removeUdata };
    },{
        persist: true,
    }
);

// apiUrl store
export const useApiUrlStore = defineStore('apiurl',
    () => {
        const apiUrl = 'http://localhost/api';
        return { apiUrl }
    },{
        persist: true,
    }
);

// token store
export const useTokenStore = defineStore('token',
    () => {
        const token = ref(null);

        const updateTokenaVar = (newVal) => {
            token.value = newVal ? newVal : removeToken();
        }

        const removeToken = () => {
            token.value = null;
        }

        return { token, updateTokenaVar, removeToken };
    },{
        persist: true,
    }
);

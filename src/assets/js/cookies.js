/**
 * Cookie函式
*/
import { useCookies } from 'vue3-cookies';

const {cookies} = useCookies();
const cookie_items = ['email', 'flag'];

// 取得 Cookie 值
export const getCookie = (key) => {
    return cookies.get( key );
}

export const setCookie = (data) => {
    cookie_items.forEach(function(item) {
        cookies.set(item, data[ item ], '1m');
    });
}

export const removeCookie = () => {
    cookie_items.forEach(function(item) {
        cookies.remove(item);
    });
}

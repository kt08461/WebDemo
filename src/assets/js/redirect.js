/**
 * 綱頁導向
 */
import router from '@/router';
import { getTimestamp } from './util';

export const replaceUrlPage = (Url, query=null) => {
    query = mergeTimeObject(query);
    router.replace({
        path: Url,
        query: query      // 路由參數
    }).catch(() => {});
};

// 導向指定 name 的路由
export const goNamePage = (name, params=null) => {
    // const route = router.getRoutes().find(r => r.name === 'Articles');
    // console.log(route.path);
    goRedirectByPush(name, null, params);
};

// 導向指定 URL
export const goUrlPage = (Url, params=null) => {
    params = mergeTimeObject(params);
    goRedirectByPush(null, Url, params);
};

function goRedirectByPush(name=null, Url=null, params=null) {
    if (name) {
        router.push({
            name: name,         // 路由名稱
            params: params      // 路由參數
        });
    } else if( Url) {
        router.push({
            path: Url,
            query: params      // 路由參數
        });
    }
}

export const mergeTimeObject = (o=null) => {
    const obj = { t: getTimestamp() };
    return o? Object.assign(obj, o) : obj;
}

<script setup>
// template site => https://www.bootdey.com/snippets/view/bs4-forum#html
import ArticlesRow from './ArticlesRow.vue';
import Pagination from '@/components/Pagination.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import { inject, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ObjValJoin } from '@/assets/js/util';
import { goUrlPage } from '@/assets/js/redirect';
import { useApiUrlStore, useUdataStore } from '@/stores/useGlobalStore';

const route = useRoute();
const fetch_apiUrl = useApiUrlStore().apiUrl+"/php/articles/articles";
const user_id = useUdataStore().udata.user_id;

const props = ref({articles:null, comment_cnt:null, pginfo:null, linkUrl:''});
const sort = ref(null);

const delArticle = inject('delArticle');
const model_msg = inject('model_msg');

const loadArticles = async () => {
    await axios.post(fetch_apiUrl, {
        user_id: user_id,
        uid:route.params.uid? route.params.uid.substr(1) : '',
        pn:route.params.pn? route.params.pn.substr(1) : '',
        sort:route.params.sort,
    }, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
        const data = response.data

        sort.value = data.sort;
        props.value.articles = data.articles;
        props.value.comment_cnt = data.comment_cnt;
        props.value.pginfo = data.pginfo;
        props.value.linkUrl = getFuncPath({pn:'p#pn#', sort:sort.value});

        return true;
    })
    .catch(error => console.error(error))
}

const getFuncPath = (obj=null) => {
    const params = obj ? Object.assign(route.params, obj)  : route.params;
    const params_str = ObjValJoin(params, '/');
    const func_path = '/'+route.path.split('/')[1]+'/'+params_str;
    return func_path;
}

const onSortChange = (e) => {
    const Url = getFuncPath({pn:'p1', sort:e.target.value});
    goUrlPage(Url);
}

const onDeleteSubmit = async (article_id) => {
    await delArticle(article_id);
    loadArticles();
};

const setModelMsg = (article) => {
    model_msg.value['article_id'] = article.article_id;
    model_msg.value['title'] = '文章刪除';
    model_msg.value['submitFunc'] = onDeleteSubmit;
    model_msg.value['content'] = '【'+article.title+'】'+"\n"+'是否確定刪除？';
}

// 監聽路由參數的變化
// watchEffect(async () => {
//     loadArticles();
// })
watch(
    () => route.path,
    loadArticles,
    { immediate: true}
)

</script>

<template>
    <div class="inner-main">
        <!-- Inner main header -->
        <div class="inner-main-header">
            <select v-model="sort" @change="onSortChange" class="custom-select custom-select-sm w-auto mr-1">
                <option value="c-d">發表日期：新-舊</option>
                <option value="c-a">發表日期：舊-新</option>
                <option value="u-d">更新日期：新-舊</option>
                <option value="u-a">更新日期：舊-新</option>
                <option value="n-a">發表人：升冪</option>
                <option value="n-d">發表人：降冪</option>
            </select>
        </div>
        <!-- /Inner main header -->

        <!-- Inner main body -->
        <div class="p-2 p-sm-3 collapse forum-content show">
            <div v-if="props.articles === null">
                <h3><img src="/img/loading.gif"> 資料載入中...</h3>
            </div>
            <div v-else>
                <slot name="alert_msg"></slot>
                <slot name="error_msg"></slot>

                <div v-if="props.articles.length > 0">
                    <ArticlesRow v-for="article in props.articles" :article="article" :comment_cnt="props.comment_cnt" :setModelMsg="setModelMsg" :key="article.article_id" />
                    <Pagination v-bind="props" />
                </div>
                <div v-else>
                    <AlertMessage :alert_msg="'查無資料'" />
                </div>
            </div>
        </div>
        <!-- /Inner main body -->

    </div>
</template>
<style scoped>
@import "@/assets/css/website.css";
</style>
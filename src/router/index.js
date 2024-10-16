import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { resetBreadcrumb: true },
    },{
      // 文章分享
      path: '/articles',
      component: () => import('../views/ArticlesIndex.vue'),
      children: [
        {
          path: '',
          name: 'Articles',
          component: () => import('../views/ArticlesList.vue'),
        },{
          path: ':uid(u\\d+)?/:pn(p\\d+)?/:sort?',
          name: 'ArticlesParams',
          component: () => import('../views/ArticlesList.vue'),
        },{
          path: 'add',
          component: () => import('../views/Article.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'ArticleAdd',
              component: () => import('../views/ArticleEdit.vue'),
            },
          ]
        },{
          path: ':article_id(\\d+)',
          component: () => import('../views/Article.vue'),
          children: [
            {
              path: '',
              name: 'Article',
              component: () => import('../views/ArticleContent.vue'),
            },{
              path: 'edit',
              name: 'ArticleEdit',
              component: () => import('../views/ArticleEdit.vue'),
              meta: { requiresAuth: true, userselfOnly: true },
            },
          ]
        },
      ]
    },{
      // 用戶資料
      path: '/user',
      component: () => import('../views/UserFrame.vue'),
      meta: { requiresAuth: true, resetBreadcrumb: true },
      children: [
        {
          path: '',
          component: () => import('../views/UserEdit.vue'),
        },{
          path: 'edit',
          name: 'UserInfo',
          component: () => import('../views/UserEdit.vue'),
        },
      ]
    },{
      path: '/login',
      component: () => import('../views/UserFrame.vue'),
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('../views/UserLogin.vue'),
        },
      ]
    },{
      path: '/register',
      component: () => import('../views/UserFrame.vue'),
      children: [
        {
          path: '',
          name: 'Register',
          component: () => import('../views/UserRegister.vue'),
        },
      ]
    },{
      path: '/forget',
      component: () => import('../views/UserFrame.vue'),
      children: [
        {
          path: '',
          name: 'Forget',
          component: () => import('../views/UserForget.vue'),
        },
      ]
    },{
      path: '/test',
      // redirect: '/user/login',
      name: 'Test',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TestView.vue'),
    },{
      path: '/:pathMatch(.*)*', // 匹配所有未定義的路徑
      redirect: '/',
    },
  ]
})

export default router

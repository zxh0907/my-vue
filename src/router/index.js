import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import List from '@/views/List'
import Info from '@/views/Info'
import Detail from '@/views/Detail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
  	{
			path: '/',
			name: 'Index',
			component: Index,
			meta: {
				title: '首页'
			},
			children: [{
			  path: '/info',
			  name: 'Info',
			  component: Info,
			  meta: {
					title: '介绍页'
				}
			},{
			  path: '/list',
			  name: 'List',
			  component: List,
			  meta: {
					title: '列表页'
				}
			}]
  	},{
      path: '/detail/:id',
      name: 'Detail',
      component: Detail,
      meta: {
				title: '详细页'
			}
    }
  ]
})

router.afterEach((to, from) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }

})

router.afterEach((to, from) => {
  //console.log(location.href);
})

export default router;

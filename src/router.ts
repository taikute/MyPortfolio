import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import CV from './components/CV.vue'
import Projects from './components/Projects.vue'
import Credit from './components/Credit.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/cv',
			component: CV,
			meta: { title: 'CV' },
		},
		{
			path: '/projects',
			component: Projects,
			meta: { title: 'Projects' },
		},{
			path:'/credit',
			component: Credit,
			meta:{title: 'Credit'},
		}
	]
})

const DEFAULT_TITLE: string = 'Anh Tài'
router.afterEach((to) => {
	let title = to.meta?.title
	if (typeof title == 'string') {
		document.title = DEFAULT_TITLE + ' | ' + title
	} else {
		document.title = DEFAULT_TITLE
	}
})

export default router
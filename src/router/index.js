import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import InTheaters from '@/views/InTheaters.vue';
import Movie from '@/views/Movie.vue';
import BestMovies from '@/views/BestMovies.vue';
import ComingSoon from '@/views/ComingSoon.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
	},
	{
		path: '/intheaters',
		component: InTheaters,
	},
	{
		path: '/bestmovies',
		component: BestMovies,
	},
	{
		path: '/comingsoon',
		component: ComingSoon,
	},
	{
		path: '/movies/:id',
		component: Movie,
		props: true,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;

<template>
	<v-app>
		<nav-bar></nav-bar>

		<v-main>
			<!-- <transition
				mode="out-in"
				enter-active-class="animate__animated animate__bounce"
				leave-active-class="animate__animated animate__bounceOutRight"
			>
			</transition> -->
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	export default {
		name: 'App',

		data: () => ({}),
		components: {
			'nav-bar': NavBar,
		},
	};
</script>
<style>
	/* .router-anim-enter-active {
		animation: coming 1s;
		animation-delay: 0.5s;

		opacity: 0;
	}
	.router-anim-leave-active {
		animation: going 1s;
	}
	@keyframes coming {
		from {
			transform: translateX(-50px);
			opacity: 0;
		}
		to {
			transform: translateX(0px);
			opacity: 1;
		}
	}
	@keyframes going {
		0% {
			transform: translateX(0px);
		}
		100% {
			transform: translateX(-50px);
			opacity: 0;
		}
	} */
</style>

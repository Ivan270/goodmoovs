<template>
	<v-container class="mx-auto deep-purple accent-4 pt-0 mt-0" fluid>
		<v-container id="first"></v-container>
		<v-sheet height="86vh" color="transparent">
			<Hero title="in theaters" />
			<v-container class="justify-self-center align-self-end mb-16">
			</v-container>
		</v-sheet>
		<MoviesDisplay :movies="inTheaters" />
	</v-container>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import Hero from '@/components/Hero.vue';
	import MoviesDisplay from '@/components/MoviesDisplay.vue';

	export default {
		name: 'in-theaters',
		// props: {},
		data: function () {
			return {
				transparent: 'rgba(255, 255, 255, 0)',
				page: 1,
				length: 2,
				goToOptions: {
					duration: 800,
					offset: 0,
					easing: 'easeInOutCubic',
				},
			};
		},
		computed: {
			...mapState(['inTheaters']),
		},
		methods: {
			...mapActions(['fetchInTheaters']),
		},

		// watch: {},
		components: {
			Hero,
			MoviesDisplay,
		},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.fetchInTheaters();
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>

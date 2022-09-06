<template>
	<v-container class="mx-auto deep-purple accent-4 pt-0 mt-0" fluid>
		<v-container id="first"></v-container>
		<v-sheet height="86vh" color="transparent">
			<Hero title="best movies" />
			<v-container class="justify-self-center align-self-end mb-16">
			</v-container>
		</v-sheet>
		<MoviesDisplay :movies="bestMovies" />
	</v-container>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import Hero from '@/components/Hero.vue';
	import MoviesDisplay from '@/components/MoviesDisplay.vue';

	export default {
		name: 'best-movies-comp',
		// props: {},
		data: function () {
			return {};
		},
		computed: {
			...mapState(['bestMovies']),
		},
		methods: {
			...mapActions(['fetchBestMovies']),
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
			this.fetchBestMovies();
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>

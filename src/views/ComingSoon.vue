<template>
	<v-container class="mx-auto deep-purple accent-4 pt-0 mt-0" fluid>
		<v-container id="first"></v-container>
		<v-sheet height="86vh" color="transparent">
			<Hero title="coming soon" />
			<v-container class="justify-self-center align-self-end mb-16">
			</v-container>
		</v-sheet>
		<MoviesDisplay :movies="comingSoon" />
	</v-container>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import Hero from '@/components/Hero.vue';
	import MoviesDisplay from '@/components/MoviesDisplay.vue';

	export default {
		name: 'coming-soon-view',
		// props: {},
		data: function () {
			return {};
		},
		computed: {
			...mapState(['comingSoon']),
		},
		methods: {
			...mapActions(['fetchComingSoon']),
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
			this.fetchComingSoon();
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>

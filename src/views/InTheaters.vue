<template>
	<v-container class="mx-auto deep-purple accent-4 pt-0 mt-0" fluid>
		<v-container id="first"></v-container>
		<v-sheet height="86vh" color="transparent">
			<v-container fill-height>
				<v-row align="center">
					<v-col cols="12" sm="auto">
						<h1 class="text-h2 text-md-h1 font-weight-black white--text mx-6">
							In Theaters
						</h1>
					</v-col>
					<v-col cols="12" sm="auto" class="ms-4">
						<v-btn
							elevation="4"
							icon
							@click="$vuetify.goTo('#second', goToOptions)"
							><v-icon color="white" large
								>mdi-chevron-double-down</v-icon
							></v-btn
						>
					</v-col>
					<v-btn
						class="md-5 mr-3 elevation-21"
						dark
						fab
						button
						right
						bottom
						color="deep-purple lighten-1"
						fixed
						@click="$vuetify.goTo('#first', goToOptions)"
						><v-icon>mdi-arrow-up</v-icon></v-btn
					>
				</v-row>
			</v-container>
			<v-container class="justify-self-center align-self-end mb-16">
			</v-container>
		</v-sheet>

		<v-row justify="space-around" class="mx-6" id="second">
			<v-col
				cols="12"
				sm="12"
				md="6"
				lg="3"
				v-for="movie in shownCards"
				:key="movie.id"
				class="d-flex justify-center"
			>
				<v-hover v-slot="{ hover }">
					<v-card
						min-height="520px"
						min-width="300"
						max-width="70%"
						align="center"
						justify="center"
						class="ma-2"
						:elevation="hover ? 12 : 2"
						:class="{ 'on-hover': hover }"
						@click="redirectTo(movie.id)"
					>
						<v-subheader></v-subheader>
						<v-container class="pb-2">
							<v-img
								:src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
								contain
								height="400"
								><template v-slot:placeholder>
									<v-row
										class="fill-height ma-0"
										align="center"
										justify="center"
									>
										<v-progress-circular
											indeterminate
											color="grey lighten-5"
										></v-progress-circular>
									</v-row> </template
							></v-img>
						</v-container>

						<v-container>
							<v-row>
								<v-col>
									<v-card-title class="d-block">{{
										movie.original_title
									}}</v-card-title>
									<v-card-subtitle>{{ movie.directors }}</v-card-subtitle>
								</v-col>
							</v-row>
						</v-container>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
		<v-row justify="center">
			<div class="text-center">
				<v-pagination
					v-model="page"
					:length="length"
					circle
					dark
					color="amber darken-4"
				></v-pagination>
			</div>
		</v-row>
	</v-container>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

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
			shownCards() {
				const { page, length, inTheaters } = this;
				console.log(inTheaters.length);
				const number = Math.ceil(inTheaters.length / length); // Numero de elementos a mostrar por página
				return inTheaters.slice((page - 1) * number, page * number);
			},
		},
		methods: {
			...mapActions(['fetchInTheaters']),
			redirectTo(id) {
				this.$router.push(`/movies/${id}`);
			},

			// top() {
			// 	// window.scrollTo(0, 0);
			// 	window.scrollTo({
			// 		top: 0,
			// 		left: 0,
			// 		behavior: 'smooth',
			// 	});
			// },
		},

		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.fetchInTheaters();
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.v-card {
		transition: opacity 0.4s ease-in-out;
	}

	.v-card:not(.on-hover) {
		opacity: 0.6;
	}
</style>

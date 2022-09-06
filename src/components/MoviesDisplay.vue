<template>
	<div>
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
	</div>
</template>

<script>
	export default {
		name: 'movie-display-comp',
		props: ['movies'],
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
			shownCards() {
				const { page, length, movies } = this;
				console.log(movies.length);
				const number = Math.ceil(movies.length / length); // Numero de elementos a mostrar por página
				return movies.slice((page - 1) * number, page * number);
			},
		},
		methods: {
			redirectTo(id) {
				this.$router.push(`/movies/${id}`);
			},
		},
		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		// -- End Lifecycle Methods
	};
</script>

<style scoped>
	.v-card {
		transition: opacity 0.4s ease-in-out;
	}

	.v-card:not(.on-hover) {
		opacity: 0.6;
	}
</style>

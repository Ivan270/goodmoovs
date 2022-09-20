<template>
	<v-container fluid class="deep-purple accent-4">
		<v-row justify="center">
			<v-col cols="12" lg="10" class="order-2 order-lg-1 deep-orange pt-8 ps-8">
				<v-row justify="center" justify-md="start" class="ma-1 mx-2" no-gutters>
					<v-btn
						width="100"
						dark
						large
						depressed
						color="deep-purple accent-4"
						@click="$router.go(-1)"
						>Go back</v-btn
					>
				</v-row>

				<v-row no-gutters>
					<v-col cols="12" md="3" class="deep-orange d-flex justify-center">
						<v-sheet v-if="isLoading" color="deep-purple accent-1" class="pa-3">
							<v-skeleton-loader
								transition-group="scale-transition"
								class="pa-2 d-flex flex-column justify-space-around"
								width="350px"
								height="525"
								type="image"
							></v-skeleton-loader>
						</v-sheet>
						<v-card v-else class="mb-1">
							<v-img
								max-width="350"
								contain
								:src="`https://image.tmdb.org/t/p/original/${movie.poster_path}?controls=0`"
								class="ma-2"
							></v-img>
						</v-card>
					</v-col>

					<v-col cols="12" md="9" class="deep-orange d-flex justify-center">
						<v-sheet v-if="isLoading" color="deep-purple accent-1" class="pa-3">
							<v-skeleton-loader
								transition-group="scale-transition"
								class="pa-2 d-flex flex-column justify-space-around"
								width="933"
								height="525"
								type="image"
							></v-skeleton-loader>
						</v-sheet>
						<v-card v-else class="d-flex align-stretch mt-1">
							<iframe
								width="933"
								height="525"
								:src="trailer"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
								class="ma-2"
							></iframe>
						</v-card>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="8">
						<v-subheader class="white--text"
							>{{ movie.release_date }}
							<v-icon color="grey lighten-1">mdi-circle-small</v-icon>
							{{ movie.runtime }} min.</v-subheader
						>
						<v-chip
							v-for="genre in movie.genres"
							:key="genre.id"
							class="mr-2 my-1"
							dark
							color="grey darken-1"
							>{{ genre.name }}</v-chip
						>
					</v-col>
					<v-col cols="12" md="11" class="pe-lg-1">
						<v-card>
							<v-card-text>{{ movie.overview }}</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				<v-row> </v-row>
			</v-col>
			<v-col
				cols="12"
				lg="2"
				class="order-1 order-lg-2 d-flex flex-column mt-5 align-stretch justify-center"
			>
				<h1 class="text-h3 text-lg-h2 font-weight-black white--text vert-text">
					{{ movie.original_title }}
				</h1>
			</v-col>
		</v-row>
		<v-row justify="start">
			<v-col cols="10">
				<v-card dark width="100%">
					<MoreInfo :items="this.directors" :title="'Director/s'" />
					<MoreInfo :items="this.stars" :title="'Stars'" />
					<MoreInfo :items="this.music" :title="'Composer'" />
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import MoreInfo from '@/components/MoreInfo.vue';

	export default {
		name: 'movie-view',
		props: ['id'],
		data: function () {
			return {
				// loading: false,
				movie: [],
				trailer: '',
				credits: [],
				cast: [],
				directors: [],
				music: [],
				stars: [],
				isLoading: false,
			};
		},
		// computed: {},
		methods: {
			async fetchMovie() {
				try {
					// this.loading = true;
					let response = await fetch(
						`https://api.themoviedb.org/3/movie/${this.id}?api_key=78854d693c531f7fffbfc383ef0ea4e4&language=en-US`
					);
					if (!response.ok) throw Error('Error en peticion');
					let data = await response.json();
					this.movie = data;
					this.acting;
				} catch (error) {
					console.log(error);
				}
			},
			async fetchTrailer() {
				try {
					let response = await fetch(
						`https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=78854d693c531f7fffbfc383ef0ea4e4&language=en-US`
					);
					if (!response.ok) throw Error('Error en peticion del video');
					let videos = await response.json();

					this.trailer = `https://www.youtube.com/embed/${videos.results[0].key}`;
				} catch (error) {
					console.log(error);
				}
			},
			async fetchCast() {
				try {
					let response = await fetch(
						`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=78854d693c531f7fffbfc383ef0ea4e4&language=en-US`
					);
					if (!response.ok) throw Error('Error en petición de los créditos');
					let data = await response.json();

					this.credits = data;
					// Filter Actors actresses
					let creds = this.credits;
					const acting = creds.cast.filter(
						(person) => person.known_for_department === 'Acting'
					);

					// Filter director/s
					const direct = creds.crew.filter(
						(person) =>
							person.job === 'Director' || person.job === 'Co-Director'
					);
					// Find composer
					const music = creds.crew.filter(
						(person) => person.job === 'Original Music Composer'
					);

					this.cast = acting;
					this.directors = direct;
					this.music = music;

					let actors = this.cast;
					const stars = actors.filter(
						(person) =>
							person.order === 0 ||
							person.order === 1 ||
							person.order === 2 ||
							person.order === 3
					);

					this.stars = stars;
				} catch (error) {
					console.log(error);
				}
			},
		},
		// watch: {},
		components: {
			MoreInfo,
		},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.fetchMovie();
			this.fetchTrailer();
			this.fetchCast();
		},
		mounted() {
			this.isLoading = true;
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped>
	iframe,
	object,
	embed {
		max-width: 100%;
		max-height: 100%;
	}
	.vert-text {
		transform: rotate(0deg);
	}
	@media screen and (min-width: 1264px) {
		.vert-text {
			transform: rotate(90deg);
		}
	}
</style>

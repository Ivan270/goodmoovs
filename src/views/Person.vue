<template>
	<v-container fluid class="deep-purple accent-4">
		<v-row justify="center">
			<v-col
				cols="12"
				lg="10"
				class="order-2 order-lg-1 deep-orange pt-8 pb-8 ps-8"
			>
				<v-row class="" no-gutters>
					<v-col
						cols="12"
						md="3"
						class="deep-orange d-flex justify-center align-center"
					>
						<v-card class="mb-1">
							<v-img
								max-width="350"
								contain
								:src="`https://image.tmdb.org/t/p/original/${person.profile_path}?controls=0`"
								class="ma-2"
							></v-img>
						</v-card>
					</v-col>

					<v-col
						cols="12"
						md="9"
						class="deep-orange white--text"
						align-self="center"
					>
						<v-row
							justify="center"
							justify-md="space-between"
							align="center"
							class="mb-6"
							no-gutters
						>
							<v-col cols="12" md="6" class="order-2 order-md-1">
								<h4 v-if="person.biography != ''" class="text-h4">Biography</h4>
							</v-col>
							<v-col
								cols="12"
								md="6"
								class="order-1 order-md-2 d-flex justify-start justify-md-end"
							>
								<v-btn
									depressed
									dark
									large
									color="deep-purple accent-4"
									@click="$router.go(-1)"
									>Go back</v-btn
								>
							</v-col>
						</v-row>

						<p class="text-justify">
							{{ person.biography }}
						</p>
						<!-- </v-col> -->
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="12"
				lg="2"
				class="order-1 order-lg-2 d-flex flex-column mt-5 align-stretch justify-center"
			>
				<h1 class="text-h3 text-lg-h2 font-weight-black white--text vert-text">
					{{ person.name }}
				</h1>
			</v-col>

			<v-row class="order-3 deep-purple accent-4">
				<v-col cols="12" md="3" class="d-flex justify-center align-top">
					<v-card class="pa-1" width="350" min-height="400" max-height="500">
						<v-card-title>Personal Info</v-card-title>
						<v-divider class="mx-4"></v-divider>
						<v-card-subtitle class="subtitle-1 font-weight-bold mb-0 pb-0"
							>Known for</v-card-subtitle
						>
						<v-card-text>{{ person.known_for_department }}</v-card-text>
						<v-divider class="mx-4"></v-divider>
						<v-card-subtitle class="subtitle-1 font-weight-bold mb-0 pb-0"
							>Gender</v-card-subtitle
						>
						<v-card-text>{{ defineGender() }}</v-card-text>
						<v-divider class="mx-4"></v-divider>
						<v-card-subtitle class="subtitle-1 font-weight-bold mb-0 pb-0"
							>Birthday</v-card-subtitle
						>
						<v-card-text>{{ person.birthday }}</v-card-text>
						<v-divider v-if="person.deathday != null" class="mx-4"></v-divider>
						<v-card-subtitle
							v-if="person.deathday != null"
							class="subtitle-1 font-weight-bold mb-0 pb-0"
							>Deathday</v-card-subtitle
						>
						<v-card-text v-if="person.deathday != null">{{
							person.deathday
						}}</v-card-text>
						<v-divider class="mx-4"></v-divider>
						<v-card-subtitle class="subtitle-1 font-weight-bold mb-0 pb-0"
							>Place of Birth</v-card-subtitle
						>
						<v-card-text>{{ person.place_of_birth }}</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12" md="7" align-self="start">
					<v-card dark width="100%">
						<!-- Crear componente que muestre lista de peliculas donde trabajó -->
						<Credits
							v-if="this.creditsCastTv.length > 0"
							:items="this.creditsCastTv"
							:title="'TV Acting'"
						/>
						<Credits
							v-if="this.creditsCastMv.length > 0"
							:items="this.creditsCastMv"
							:title="'Movie Acting'"
						/>
						<Credits
							v-if="this.creditsProdTv.length > 0"
							:items="this.creditsProdTv"
							:title="'TV Crew'"
						/>
						<Credits
							v-if="this.creditsProdMv.length > 0"
							:items="this.creditsProdMv"
							:title="'Movie Crew'"
						/>
					</v-card>
				</v-col>
			</v-row>
		</v-row>
	</v-container>
</template>

<script>
	import Credits from '@/components/Credits.vue';

	export default {
		name: 'person-view',
		props: ['id'],
		data: function () {
			return {
				person: {},
				creditsCastTv: [],
				creditsCastMv: [],
				creditsProdTv: [],
				creditsProdMv: [],
			};
		},
		// computed: {},
		methods: {
			async fetchPerson() {
				try {
					let response = await fetch(
						`https://api.themoviedb.org/3/person/${this.id}?api_key=78854d693c531f7fffbfc383ef0ea4e4&language=en-US`
					);
					if (!response.ok) throw 'Error finding person';
					let data = await response.json();
					this.person = data;
				} catch (error) {
					console.log(error);
				}
			},
			async fetchCredits() {
				try {
					let response = await fetch(
						`https://api.themoviedb.org/3/person/${this.id}/combined_credits?api_key=78854d693c531f7fffbfc383ef0ea4e4&language=en-US`
					);
					if (!response.ok) throw 'Error finding credits';
					let data = await response.json();
					let tvCreds = data.cast.filter((c) => c.media_type === 'tv');
					if (tvCreds.length > 0) {
						this.creditsCastTv = tvCreds;
					}
					let movCreds = data.cast.filter((c) => c.media_type === 'movie');
					if (movCreds.length > 0) {
						this.creditsCastMv = movCreds;
					}
					let prodCredsTv = data.crew.filter((c) => c.media_type === 'tv');
					if (prodCredsTv.length > 0) {
						this.creditsProdTv = prodCredsTv;
					}
					let prodCredsMov = data.crew.filter((c) => c.media_type === 'movie');
					if (prodCredsMov.length > 0) {
						this.creditsProdMv = prodCredsMov;
					}
				} catch (error) {
					console.log(error);
				}
			},
			defineGender() {
				if (this.person.gender === 1) {
					return 'Female';
				} else if (this.person.gender === 2) {
					return 'Male';
				} else {
					return 'Other gender';
				}
			},
		},
		// watch: {},
		components: {
			Credits,
		},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		created() {
			this.fetchPerson();
			this.fetchCredits();
		},
		// -- End Lifecycle Methods
	};
</script>

<style scoped>
	.vert-text {
		transform: rotate(0deg);
	}
	@media screen and (min-width: 1264px) {
		.vert-text {
			transform: rotate(90deg);
		}
	}
</style>

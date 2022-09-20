<template>
	<v-container fluid class="deep-purple accent-4">
		<v-row justify="center">
			<v-col
				cols="12"
				lg="10"
				class="order-2 order-lg-1 deep-orange pt-8 pb-8 ps-8"
			>
				<v-row no-gutters class="mx-6">
					<v-col
						cols="12"
						md="3"
						class="deep-orange d-flex justify-center align-center"
					>
						<v-sheet v-if="isLoading" color="deep-purple accent-1" class="pa-3">
							<v-skeleton-loader
								transition-group="scale-transition"
								class="pa-2 d-flex flex-column justify-space-around"
								width="350"
								height="525"
								type="image"
							></v-skeleton-loader>
						</v-sheet>
						<v-card v-else class="mb-1">
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
							class="ma-6"
							no-gutters
						>
							<v-col cols="12" md="6" class="order-2 order-md-1 mb-2">
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
							<p class="text-justify order-3 mt-6">
								{{ person.biography }}
							</p>
						</v-row>
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

			<v-row
				class="order-3 deep-purple accent-4 justify-center mt-8"
				no-gutters
			>
				<v-col
					cols="12"
					lg="3"
					class="d-flex justify-center align-top order-2 order-lg-1 px-2 px-xl-0"
				>
					<v-card
						class="pa-1 mb-8"
						width="350"
						min-height="400"
						max-height="500"
					>
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
				<v-col
					cols="12"
					lg="7"
					align-self="start"
					class="order-3 order-lg-2 px-2 px-xl-0 mb-2"
				>
					<v-card min-width="300px" max-width="100vw">
						<Credits
							v-if="this.creditsCast.length > 0"
							:items="this.creditsCast"
							:title="'Acting'"
						/>
						<v-divider class="mx-13"></v-divider>
						<Credits
							v-if="this.creditsProd.length > 0"
							:items="this.creditsProd"
							:title="'Crew'"
						/>
					</v-card>
				</v-col>
				<v-col
					cols="12"
					lg="2"
					class="order-1 order-lg-3 d-flex flex-column mt-5 align-stretch justify-center"
				>
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
				creditsCast: [],
				creditsProd: [],
				isLoading: false,
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
						`https://api.themoviedb.org/3/person/${this.id}/movie_credits?api_key=78854d693c531f7fffbfc383ef0ea4e4&language=en-US`
					);
					if (!response.ok) throw 'Error finding credits';
					let data = await response.json();
					let creds = data.cast;
					if (creds.length > 0) {
						this.creditsCast = creds;
					}
					let prodCreds = data.crew;
					if (prodCreds.length > 0) {
						this.creditsProd = prodCreds;
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
	.vert-text {
		transform: rotate(0deg);
	}
	@media screen and (min-width: 1264px) {
		.vert-text {
			transform: rotate(90deg);
		}
	}
</style>

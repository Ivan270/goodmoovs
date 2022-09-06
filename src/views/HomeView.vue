<template>
	<v-container fill-height fluid class="deep-purple accent-4">
		<v-row>
			<v-col
				cols="12"
				md="4"
				class="d-flex justify-center"
				v-for="option in homeOptions"
				:key="option.title"
			>
				<v-hover v-slot="{ hover }">
					<v-card
						:elevation="hover ? 20 : 0"
						rounded="lg"
						height="56vh"
						width="600px"
						class="pa-2"
						dark
						color="deep-purple accent-1"
						:to="option.route"
					>
						<v-card-title
							><h1 class="text-h4 text-xl-h2 font-weight-black">
								{{ option.title }}
							</h1></v-card-title
						>
						<v-card-subtitle>
							<h3>{{ option.subtitle }}</h3>
						</v-card-subtitle>
						<v-card-actions>
							<v-img
								height="300px"
								:src="require(`@/assets/${option.source}`)"
								cover
								position="center center"
							></v-img>
						</v-card-actions>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		name: 'Home-view',
		data: function () {
			return {
				homeOptions: [
					{
						title: 'Best Movies',
						subtitle: 'Check the ranking',
						source: 'oscar-wide.jpg',
						route: '/bestmovies',
					},
					{
						title: 'In Theaters',
						subtitle: "What's new?",
						source: 'popcorn.jpg',
						route: '/intheaters',
					},
					{
						title: 'Coming Soon',
						subtitle: "What's next?",
						source: 'recording-gear.jpg',
						route: '/comingsoon',
					},
				],
			};
		},
		computed: {
			...mapState(['inTheaters']),
		},
		methods: {
			...mapActions(['fetchInTheaters']),
		},

		components: {},
		created() {
			this.fetchInTheaters();
		},
	};
</script>

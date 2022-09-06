<template>
	<v-container fill-height>
		<v-row align="center">
			<v-col cols="12" sm="auto">
				<h1 class="text-h2 text-md-h1 font-weight-black white--text mx-6">
					{{ title }}
				</h1>
			</v-col>
			<v-col cols="12" sm="auto" class="ms-4">
				<v-btn elevation="4" icon @click="$vuetify.goTo('#second', goToOptions)"
					><v-icon color="white" large>mdi-chevron-double-down</v-icon></v-btn
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
</template>

<script>
	export default {
		name: 'hero-comp',
		props: ['title'],
		data: function () {
			return {};
		},
		// computed: {},
		//methods: {}
		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>

<template>
	<div>
		<v-app-bar
			app
			color="deep-purple accent-4"
			shrink-on-scroll
			dark
			elevation="0"
			clipped-right
			scroll-threshold="500"
		>
			<v-container fluid fill-height>
				<v-row justify="center" align="center">
					<v-btn icon plain large class="mr-3" to="/"
						><v-icon> mdi-movie-open</v-icon></v-btn
					>
					<v-toolbar-title class=""
						><v-btn text class="text-h1" plain to="/">GoodMoovs</v-btn>
					</v-toolbar-title>
				</v-row>
			</v-container>
			<v-spacer></v-spacer>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
		</v-app-bar>

		<v-navigation-drawer
			app
			clipped
			fixed
			right
			temporary
			dark
			v-model="drawer"
		>
			<template v-slot:prepend>
				<v-list-item two-line dense>
					<v-list-item-title @click="drawer = !drawer"
						><v-btn fab icon small>
							<v-icon>mdi-backburger</v-icon>
						</v-btn></v-list-item-title
					>
				</v-list-item>
				<v-list-item>
					<v-list-item-subtitle>Choose your path</v-list-item-subtitle>
				</v-list-item>
			</template>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item
					v-for="item in items"
					:key="item.title"
					@click="redirectTo(item.path)"
					:disabled="currentRoute == item.path"
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
	export default {
		name: 'nav-bar',
		// props: {},
		data: function () {
			return {
				items: [
					{
						icon: 'mdi-home',
						title: 'Home',
						path: '/',
					},
					{
						icon: 'mdi-theater',
						title: 'In theaters',
						path: '/intheaters',
					},
				],
				drawer: false,
			};
		},
		computed: {
			currentRoute() {
				return this.$route.fullPath;
			},
		},
		methods: {
			redirectTo(path) {
				this.$router.push(path);
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

<style scoped></style>

<template>
	<v-container>
		<v-card-actions>
			<v-card-title
				><v-btn text @click="show = !show" class="text-h6">
					{{ title }}
					<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
				</v-btn></v-card-title
			>
		</v-card-actions>
		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>

				<v-card-text v-for="item in items" :key="item.credit_id">
					<template>
						<v-btn text @click="redirectTo(item.id)" class="text-capitalize">{{
							item.name || item.original_title
						}}</v-btn>
					</template>
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-container>
</template>

<script>
	export default {
		name: 'credits-comp',
		props: ['items', 'title'],
		data: function () {
			return {
				show: false,
			};
		},
		// computed: {},
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
	.text-h6 {
		text-transform: capitalize !important;
	}
</style>

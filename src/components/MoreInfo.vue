<template>
	<v-container>
		<v-card-actions>
			<v-btn text @click="show = !show">
				{{ title }}
				<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
			</v-btn>
		</v-card-actions>
		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>

				<v-card-text v-for="item in items" :key="item.id">
					{{ item.name }}
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-container>
</template>

<script>
	export default {
		name: 'info-comp',
		props: ['items', 'title'],
		data: function () {
			return {
				stars: [],
				show: false,
			};
		},
		// computed: {},
		methods: {},
		// watch: {},
		// components: {},
		// mixins: [],
		// filters: {},
		// -- Lifecycle Methods
		// -- End Lifecycle Methods
	};
</script>

<style scoped></style>

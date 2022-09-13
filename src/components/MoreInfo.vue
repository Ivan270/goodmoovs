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
					<v-tooltip right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								text
								@click="redirectTo(item.id)"
								v-bind="attrs"
								v-on="on"
								class="text-capitalize"
								>{{ item.name }}</v-btn
							>
						</template>
						<span>Click for more info on {{ item.name }}</span>
					</v-tooltip>
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
		methods: {
			redirectTo(id) {
				this.$router.push(`/people/${id}`);
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

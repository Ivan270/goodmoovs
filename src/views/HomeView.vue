<template>
	<v-container> </v-container>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	export default {
		name: 'Home-view',
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

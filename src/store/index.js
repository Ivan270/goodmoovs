import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		inTheaters: [],
	},
	getters: {},
	mutations: {
		SET_INTHEATERS(state, movies) {
			state.inTheaters = movies;
		},
	},
	actions: {
		async fetchInTheaters() {
			try {
				let response = await fetch(
					'https://api.themoviedb.org/3/movie/now_playing?api_key=78854d693c531f7fffbfc383ef0ea4e4&language=en-US&page=1'
				);
				if (!response.ok) throw 'Error en petición';

				let inTheaters = await response.json();

				this.commit('SET_INTHEATERS', inTheaters.results);
			} catch (error) {
				console.log(error);
			}
		},
	},
	modules: {},
});

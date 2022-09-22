const localState = () => ({
	isInitUsers: false,
	isUnauthorized: false,
	users: [],
	userMap: new Map(),
});

const localMutations = {
	setUsers(state, users) {
		state.isInitUsers = true;
		state.users = users;
		state.userMap = new Map(users.map((user) => [user.id, user]));
	},
	isUnauthorized(state) {
		state.isUnauthorized = true;
	},
};

const localGetters = {
	users: (state) => state.users,
	getUser: (state) => (
		(id) => {
			const user = state.userMap.get(id);
			if (user === undefined) {
				return {id};
			}
			return user;
		}
	),
};

const localActions = {
	async init({state, commit}) {
		if (state.isInitUsers) {
			return;
		}

		try {
			const slackUsers = await this.$axios.$get('https://slackbot-api.tsg.ne.jp/slack/users', {
				withCredentials: true,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			});
			commit('setUsers', slackUsers);
		} catch (error) {
			if (error.message === 'Network Error' || error.response.status === 401) {
				commit('isUnauthorized');
			}
		}
	},
};

export {
	localState as state,
	localMutations as mutations,
	localGetters as getters,
	localActions as actions,
};

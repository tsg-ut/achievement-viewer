const localState = () => ({
	isUnauthorized: false,
	isInitUsers: false,
	isInitTopicMessages: false,
	users: [],
	userMap: new Map(),
	topicMessages: [],
	topicMessagesMap: new Map(),
});

const localMutations = {
	setUsers(state, users) {
		state.isInitUsers = true;
		state.users = users;
		state.userMap = new Map(users.map((user) => [user.id, user]));
	},
	setTopicMessages(state, topicMessages) {
		state.isInitTopicMessages = true;
		state.topicMessages = topicMessages.map((topic) => ({...topic, randomSortKey: Math.random()}));
		state.topicMessagesMap = new Map(state.topicMessages.map((topicMessage) => [topicMessage.message.ts, topicMessage]));
	},
	addTopicMessageLike(state, ts) {
		const message = state.topicMessagesMap.get(ts);
		if (message) {
			message.isLiked = true;
			message.likes = message.likes.concat([null]); // placeholder
		}
	},
	removeTopicMessageLike(state, ts) {
		const message = state.topicMessagesMap.get(ts);
		if (message) {
			message.isLiked = false;
			message.likes = message.likes.slice(1);
		}
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
	topicMessages: (state) => state.topicMessages,
	getTopicMessage: (state) => (
		(ts) => {
			const message = state.topicMessagesMap.get(ts);
			if (message === undefined) {
				return {ts};
			}
			return message;
		}
	),
};

const localActions = {
	async initUsers({state, commit}) {
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
			if (error?.message === 'Network Error' || error?.response?.status === 401) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async initTopicMessages({state, commit}) {
		if (state.isInitTopicMessages) {
			return;
		}

		try {
			const topicMessages = await this.$axios.$get('https://slackbot-api.tsg.ne.jp/topic/topics', {
				withCredentials: true,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			});
			commit('setTopicMessages', topicMessages);
		} catch (error) {
			if (error?.message === 'Network Error' || error?.response?.status === 401) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async likeTopicMessage({commit}, {ts}) {
		try {
			await this.$axios.$put(`https://slackbot-api.tsg.ne.jp/topic/topics/${ts}/like`, '', {
				withCredentials: true,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'text/plain'
				},
			});
			commit('addTopicMessageLike', ts);
		} catch (error) {
			if (error?.message === 'Network Error' || error?.response?.status === 401) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async unlikeTopicMessage({commit}, {ts}) {
		try {
			await this.$axios.$delete(`https://slackbot-api.tsg.ne.jp/topic/topics/${ts}/like`, {
				withCredentials: true,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			});
			commit('removeTopicMessageLike', ts);
		} catch (error) {
			if (error?.message === 'Network Error' || error?.response?.status === 401) {
				commit('isUnauthorized');
			} else {
				throw error;
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

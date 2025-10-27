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
			const response = await fetch('https://slackbot-api.tsg.ne.jp/slack/users', {
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 401) {
					commit('isUnauthorized');
					return;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const slackUsers = await response.json();
			commit('setUsers', slackUsers);
		} catch (error) {
			if (error?.message === 'Network Error' || error?.message?.includes('Failed to fetch')) {
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
			const response = await fetch('https://slackbot-api.tsg.ne.jp/topic/topics', {
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 401) {
					commit('isUnauthorized');
					return;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const topicMessages = await response.json();
			commit('setTopicMessages', topicMessages);
		} catch (error) {
			if (error?.message === 'Network Error' || error?.message?.includes('Failed to fetch')) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async likeTopicMessage({commit}, {ts}) {
		try {
			const response = await fetch(`https://slackbot-api.tsg.ne.jp/topic/topics/${ts}/like`, {
				method: 'PUT',
				body: '',
				credentials: 'include',
				headers: {
					'Content-Type': 'text/plain',
				},
			});

			if (!response.ok) {
				if (response.status === 401) {
					commit('isUnauthorized');
					return;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			commit('addTopicMessageLike', ts);
		} catch (error) {
			if (error?.message === 'Network Error' || error?.message?.includes('Failed to fetch')) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async unlikeTopicMessage({commit}, {ts}) {
		try {
			const response = await fetch(`https://slackbot-api.tsg.ne.jp/topic/topics/${ts}/like`, {
				method: 'DELETE',
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 401) {
					commit('isUnauthorized');
					return;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			commit('removeTopicMessageLike', ts);
		} catch (error) {
			if (error?.message === 'Network Error' || error?.message?.includes('Failed to fetch')) {
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

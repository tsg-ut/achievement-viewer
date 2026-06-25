import type {SlackUser, TopicMessage} from '~/types/store.js';

interface State {
	isUnauthorized: boolean;
	isInitUsers: boolean;
	isInitTopicMessages: boolean;
	users: SlackUser[];
	userMap: Map<string, SlackUser>;
	topicMessages: TopicMessage[];
	topicMessagesMap: Map<string, TopicMessage>;
}

const localState = (): State => ({
	isUnauthorized: false,
	isInitUsers: false,
	isInitTopicMessages: false,
	users: [],
	userMap: new Map(),
	topicMessages: [],
	topicMessagesMap: new Map(),
});

const localMutations = {
	setUsers(state: State, users: SlackUser[]) {
		state.isInitUsers = true;
		state.users = users;
		state.userMap = new Map(users.map((user) => [user.id, user]));
	},
	setTopicMessages(state: State, topicMessages: TopicMessage[]) {
		state.isInitTopicMessages = true;
		state.topicMessages = topicMessages.map((topic) => ({
			...topic,
			randomSortKey: Math.random(),
		}));
		state.topicMessagesMap = new Map(
			state.topicMessages.map((topicMessage) => [
				topicMessage.message.ts,
				topicMessage,
			]),
		);
	},
	addTopicMessageLike(state: State, ts: string) {
		const message = state.topicMessagesMap.get(ts);
		if (message) {
			message.isLiked = true;
			message.likes = message.likes.concat([null]);
		}
	},
	removeTopicMessageLike(state: State, ts: string) {
		const message = state.topicMessagesMap.get(ts);
		if (message) {
			message.isLiked = false;
			message.likes = message.likes.slice(1);
		}
	},
	isUnauthorized(state: State) {
		state.isUnauthorized = true;
	},
};

const localGetters = {
	users: (state: State) => state.users,
	getUser: (state: State) => (id: string) => {
		const user = state.userMap.get(id);
		if (user === undefined) {
			return {id} as SlackUser;
		}
		return user;
	},
	topicMessages: (state: State) => state.topicMessages,
	getTopicMessage: (state: State) => (ts: string) => {
		const message = state.topicMessagesMap.get(ts);
		if (message === undefined) {
			return {ts} as unknown as TopicMessage;
		}
		return message;
	},
};

const isNetworkError = (error: unknown): boolean => {
	if (error instanceof Error) {
		return (
			error.message === 'Network Error' ||
			error.message.includes('Failed to fetch') ||
			error.message.includes('NetworkError')
		);
	}
	return false;
};

const localActions = {
	async initUsers({state, commit}: {state: State; commit: Function}) {
		if (state.isInitUsers) {
			return;
		}

		try {
			const response = await fetch(
				'https://slackbot-api.tsg.ne.jp/slack/users',
				{
					credentials: 'include',
				},
			);

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
			if (isNetworkError(error)) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async initTopicMessages({state, commit}: {state: State; commit: Function}) {
		if (state.isInitTopicMessages) {
			return;
		}

		try {
			const response = await fetch(
				'https://slackbot-api.tsg.ne.jp/topic/topics',
				{
					credentials: 'include',
				},
			);

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
			if (isNetworkError(error)) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async likeTopicMessage({commit}: {commit: Function}, {ts}: {ts: string}) {
		try {
			const response = await fetch(
				`https://slackbot-api.tsg.ne.jp/topic/topics/${ts}/like`,
				{
					method: 'PUT',
					body: '',
					credentials: 'include',
					headers: {
						'Content-Type': 'text/plain',
					},
				},
			);

			if (!response.ok) {
				if (response.status === 401) {
					commit('isUnauthorized');
					return;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			commit('addTopicMessageLike', ts);
		} catch (error) {
			if (isNetworkError(error)) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
	async unlikeTopicMessage({commit}: {commit: Function}, {ts}: {ts: string}) {
		try {
			const response = await fetch(
				`https://slackbot-api.tsg.ne.jp/topic/topics/${ts}/like`,
				{
					method: 'DELETE',
					credentials: 'include',
				},
			);

			if (!response.ok) {
				if (response.status === 401) {
					commit('isUnauthorized');
					return;
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			commit('removeTopicMessageLike', ts);
		} catch (error) {
			if (isNetworkError(error)) {
				commit('isUnauthorized');
			} else {
				throw error;
			}
		}
	},
};

export {
	localActions as actions,
	localGetters as getters,
	localMutations as mutations,
	localState as state,
};

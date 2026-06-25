import type {SlackUser, TopicMessage} from '~/types/store.js';

export interface SlackInfosState {
	isUnauthorized: boolean;
	isInitUsers: boolean;
	isInitTopicMessages: boolean;
	users: SlackUser[];
	userMap: Map<string, SlackUser>;
	topicMessages: TopicMessage[];
	topicMessagesMap: Map<string, TopicMessage>;
}

const localState = (): SlackInfosState => ({
	isUnauthorized: false,
	isInitUsers: false,
	isInitTopicMessages: false,
	users: [],
	userMap: new Map(),
	topicMessages: [],
	topicMessagesMap: new Map(),
});

const localMutations = {
	setUsers(state: SlackInfosState, users: SlackUser[]) {
		state.isInitUsers = true;
		state.users = users;
		state.userMap = new Map(users.map((user) => [user.id, user]));
	},
	setTopicMessages(state: SlackInfosState, topicMessages: TopicMessage[]) {
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
	addTopicMessageLike(state: SlackInfosState, ts: string) {
		const message = state.topicMessagesMap.get(ts);
		if (message) {
			message.isLiked = true;
			message.likes = message.likes.concat([null]);
		}
	},
	removeTopicMessageLike(state: SlackInfosState, ts: string) {
		const message = state.topicMessagesMap.get(ts);
		if (message) {
			message.isLiked = false;
			message.likes = message.likes.slice(1);
		}
	},
	isUnauthorized(state: SlackInfosState) {
		state.isUnauthorized = true;
	},
};

const localGetters = {
	users: (state: SlackInfosState) => state.users,
	getUser: (state: SlackInfosState) => (id: string) => {
		const user = state.userMap.get(id);
		if (user === undefined) {
			return {id} as SlackUser;
		}
		return user;
	},
	topicMessages: (state: SlackInfosState) => state.topicMessages,
	getTopicMessage: (state: SlackInfosState) => (ts: string) => {
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
	async initUsers({state, commit}: {state: SlackInfosState; commit: Function}) {
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
	async initTopicMessages({
		state,
		commit,
	}: {
		state: SlackInfosState;
		commit: Function;
	}) {
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

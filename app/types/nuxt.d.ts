import type {Store} from 'vuex';

declare module '#app' {
	interface NuxtApp {
		$store: Store<unknown>;
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$store: Store<unknown>;
	}
}

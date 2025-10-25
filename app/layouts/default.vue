<template>
	<div>
		<nav class="navbar is-black" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<nuxt-link class="navbar-item" to="/">
					achievement-viewer
				</nuxt-link>

				<a
					role="button"
					class="navbar-burger burger"
					aria-label="menu"
					aria-expanded="false"
					@click="isActive = !isActive"
				>
					<span aria-hidden="true"/>
					<span aria-hidden="true"/>
					<span aria-hidden="true"/>
				</a>
			</div>

			<div class="navbar-menu" :class="{'is-active': isActive}">
				<div class="navbar-start">
					<nuxt-link class="navbar-item" to="/">
						ホーム
					</nuxt-link>
					<nuxt-link class="navbar-item" to="/achievements">
						実績一覧
					</nuxt-link>
					<div class="navbar-item has-dropdown is-hoverable">
						<div class="navbar-link">
							各種ログ
						</div>
						<div class="navbar-dropdown">
							<nuxt-link class="navbar-item" to="/records/slow-quiz">
								1日1文字クイズ
							</nuxt-link>
							<nuxt-link class="navbar-item" to="/records/topic">
								トピック
							</nuxt-link>
							<nuxt-link class="navbar-item" to="/records/oneiromancy">
								夢占い
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<slot />
		<footer class="footer">
			<div class="content has-text-centered">
				<p>
					Achievement Viewer ●
					by <a href="https://github.com/hakatashi">@hakatashi</a> ●
					<a href="https://github.com/tsg-ut/achievement-viewer">GitHub</a>
				</p>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isActive: false,
		};
	},
};
</script>

<style>
html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

.container {
	padding: 2rem 1rem 0 1rem;
}

.footer {
	margin-top: 3rem;
}

ul.steps {
	list-style: none;
}

.steps p:not(:last-child) {
	margin-bottom: 0;
}
</style>

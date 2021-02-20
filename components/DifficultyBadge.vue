<template>
	<span>
		<span v-if="difficulty === 'baby'" class="tag is-light">
			Baby
		</span>
		<span v-if="difficulty === 'easy'" class="tag is-success">
			Easy
		</span>
		<span v-if="difficulty === 'medium'" class="tag is-link">
			Medium
		</span>
		<span v-if="difficulty === 'hard'" class="tag is-warning">
			Hard
		</span>
		<span v-if="difficulty === 'professional'" class="tag is-danger">
			Pro
		</span>
	</span>
</template>

<script>
export default {
	props: ['difficulty'],
	components: true,
}
</script>


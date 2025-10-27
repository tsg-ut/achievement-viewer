<script>
import {Bar} from 'vue-chartjs';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
	name: 'TimeSeriesStat',
	components: {
		Bar,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
		},
	},
	computed: {
		chartOptions() {
			return {
				responsive: true,
				maintainAspectRatio: true,
				aspectRatio: 4,
			};
		},
	},
};
</script>

<template>
	<Bar :data="chartData" :options="chartOptions" />
</template>

<style></style>

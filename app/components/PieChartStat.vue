<template>
	<div><doughnut :data="chartData" :options="options"/></div>
</template>

<script>
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
	name: 'PieChartStat',
	components: {
		Doughnut,
	},
	props: {
		chartData: {
			type: Object,
			required: true,
		},
		options: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>

<style></style>

<script>
import {Doughnut} from 'vue-chartjs';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

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

<template>
	<div><Doughnut :data="chartData" :options="options" /></div>
</template>

<style></style>

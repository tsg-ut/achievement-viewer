<template>
	<div><doughnut :data="chartData" :options="options" /></div>
</template>

<script setup lang="ts">
import type {ChartData, ChartOptions} from 'chart.js';
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js';
import {Doughnut} from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

withDefaults(
	defineProps<{
		chartData: ChartData<'doughnut'>;
		options?: ChartOptions<'doughnut'>;
	}>(),
	{
		options: () => ({}),
	},
);
</script>

<style></style>

<template>
	<bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import type {ChartData} from 'chart.js';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import {Bar} from 'vue-chartjs';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

defineProps<{
	chartData: ChartData<'bar'>;
}>();

const chartOptions = {
	responsive: true,
	maintainAspectRatio: true,
	aspectRatio: 4,
};
</script>

<style></style>

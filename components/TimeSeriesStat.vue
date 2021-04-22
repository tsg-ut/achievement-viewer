<script>
import {Bar, mixins} from 'vue-chartjs';

const {reactiveProp} = mixins;

export default {
	components: true,
	extends: Bar,
	mixins: [reactiveProp],
	mounted() {
		this.renderChart(this.chartData, {
			responsive: true,
			maintainAspectRatio: false,
			aspectRatio: 4,
		});
	},
};
</script>

<style></style>

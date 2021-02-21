<script>
import {Line, mixins} from 'vue-chartjs';

const {reactiveProp} = mixins;

export default {
	extends: Line,
	mixins: [reactiveProp],
	mounted() {
		this.renderChart(this.chartData, {
			scales: {
				xAxes: [{
					type: 'time',
					time: {
						unit: 'month',
					},
				}],
			},
			maintainAspectRatio: false,
			aspectRatio: 4,
		});
	},
	components: true,
}
</script>

<style></style>

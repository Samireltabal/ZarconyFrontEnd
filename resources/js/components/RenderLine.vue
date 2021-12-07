<template>
  <div>
    <LineChart :data="datasets" :options="barChartOptions" :height="300" />
  </div>
</template>
<script>
import LineChart from './LineChart.js'
export default {
  name: 'RenderLine',
  components: {
    LineChart
  },
  props: {
    keys: {
      required: true,
      type: [Array, Object]
    },
    values: {
      required: true,
      type: [Array, Object]
    },
    datasets: {
      required: true,
      type: [Object]
    },
    head: {
      required: true,
      type: [String]
    },
    color: {
      required: true,
      default: '#665191',
      type: String
    }
  },
  data () {
    return {
      report: {},
      showLine: false,
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: this.head,
          fontSize: 18,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    barChartData () {
      return {
        labels: this.keys,
        datasets: [
          {
            label: 'Sales',
            data: this.values[0],
            backgroundColor: 'rgb(255, 205, 86, 0.4)'
          },
          {
            label: 'Sales',
            data: this.values[1],
            backgroundColor: 'rgb(39, 174, 96, 0.4)',
          }
        ]
      }
    }
  }
}
</script>

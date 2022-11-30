<template>
  <div class="post-chart">
      <!-- Pie Chart -->
    <apex-chart class="post-chart__donut" width=500 type="donut" :options="options" :series="series"></apex-chart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PieChart',

  props: {
    propName: {
      type: String,
      required: true
    }
  },

  computed: {
    /* Get posts and other data from vuex store */
    ...mapGetters([
      'getImpressionsByProp'
    ]),

    /* Get chart options */
    options () {
      const labels = Object.keys(this.getImpressionsByProp(this.propName))

      return {
        labels: labels,
        states: {
          active: {
            filter: {
              type: 'none'
            }
          }
        },
        chart: {
          width: '500px'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%'
            }
          }
        },
        responsive: [{
          breakpoint: 600,
          options: {
            legend: {
              position: 'bottom'
            },
            chart: {
              width: '300px'
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '45%'
                }
              }
            }
          }
        }]
      }
    },

    /* Get chart values */
    series () {
      return Object.values(this.getImpressionsByProp(this.propName))
    }
  }
}
</script>

<style lang="scss">
  .post-chart{
    &__donut{
      .apexcharts-canvas{
        margin: 0 auto;
      }
    }
  }
</style>

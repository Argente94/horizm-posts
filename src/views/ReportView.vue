<template>
  <div class="home">
    <div class="home-stack">
      <!-- Posts filter -->
      <FilterSidebar @filter="setFilter" />
    </div>

    <div class="home-stack">
      <!-- Export to PDF -->
      <PdfView />

      <!-- Table header -->
      <h4 >Post Analysis</h4>

      <!-- Show amount of posts -->
      <p>The current report contains <strong>{{ getFilteredPosts(filter).length }}</strong> posts.</p>
    </div>

    <!-- Sorting posts table -->
    <PostsTable :posts="getFilteredPosts(filter)" :offset="10" />

    <!-- Select property for chart generation -->
    <ChartTabs :tabs="chartTabs" @clickTab="setChart"/>

    <!-- Pie Chart  -->
    <PieChart :propName="selectedChart"/>
  </div>
</template>

<script>
import FilterSidebar from '@/components/FilterSidebar.component.vue'
import PieChart from '@/components/PieChart.component.vue'
import ChartTabs from '@/components/ChartTabs.component.vue'
import PostsTable from '@/components/PostsTable.component.vue'
import PdfView from '@/components/PdfView.component.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    PieChart,
    ChartTabs,
    FilterSidebar,
    PostsTable,
    PdfView
  },

  data () {
    return {
      filter: null,
      chartTabs: [
        {
          title: 'Media Types',
          propName: 'type'
        },
        {
          title: 'Networks',
          propName: 'network'
        }
      ],
      selectedChart: 'type'
    }
  },

  mounted () {
    /* Load posts in vuex store */
    this.$store.dispatch('fetchPosts')
  },

  computed: {
    /* Get posts from vuex store */
    ...mapGetters([
      'getFilteredPosts'
    ])
  },

  methods: {
    setFilter (filter) {
      this.filter = {}
      Object.assign(this.filter, filter)
    },

    setChart (chart) {
      this.selectedChart = chart
    }
  }
}
</script>

<style lang="scss">
  .home{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    min-width: $phone-min-width;
    max-width: $tablet-h-width;
    margin: 0 auto;

    .home-stack{
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>

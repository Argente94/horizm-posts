<template>
  <div class="home">
    <FilterSidebar />
    <PostsTable />
    <PieChart />
  </div>
</template>

<script>
// @ is an alias to /src
import FilterSidebar from '@/components/FilterSidebar.component.vue'
import PieChart from '@/components/PieChart.component.vue'
import PostsTable from '@/components/PostsTable.component.vue'

export default {
  name: 'HomeView',
  components: {
    PieChart,
    FilterSidebar,
    PostsTable
  }
}
</script>

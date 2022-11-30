<template>
  <div class="chart-tabs">
    <!-- Chart header -->
    <h4>Impresions by {{ selectedTab.title }} Analysis</h4>

    <!-- Chart tabs -->
    <ul class="chart-tabs__list">
      <li v-for="tab in tabs" :key="tab.propName"
      class="chart-tabs__list__tab"
      :class="{active: tab.propName === selectedTab.propName}"
      @click="clickTab(tab.propName)">
        {{ tab.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ChartTabs',

  props: {
    tabs: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      selectedTab: this.tabs[0]
    }
  },

  methods: {
    clickTab (chart) {
      this.selectedTab = this.tabs.find(tab => { return tab.propName === chart })
      this.$emit('clickTab', chart)
    }
  }
}
</script>

<style lang="scss">
  .chart-tabs{
    & h4{
        margin-bottom: 1rem;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding-left: 0;
      margin-bottom: 1.5rem;
      list-style: none;
      border-bottom: 1px solid $tabs-border-color;

      &__tab {
        padding: 0.3rem;
        color: $tab-color;
        cursor: pointer;

        &.active {
          border-bottom: 2px solid $tab-color;
        }
      }
    }

  }
</style>

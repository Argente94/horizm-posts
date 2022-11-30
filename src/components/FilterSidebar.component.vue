<template>
  <div class="post-filter">
    <h4>Filter</h4>
    <div class="post-filter__container">
      <div>
        <label for="network">Network:</label>
        <select name="network" v-model="filter.network">
          <option value="all" selected>All networks</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
        </select>
      </div>
      <div>
        <label for="type">Type:</label>
        <select name="type" v-model="filter.type">
          <option value="all" selected>All types</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
      </div>
      <div>
        <label for="message">Message:</label>
        <input name="message" type="text" v-model="filter.message">
      </div>
    </div>
    <div class="post-filter__button">
      <button @click="applyFilter()">APPLY FILTER</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSidebar',

  data () {
    return {
      filter: {
        network: 'all',
        type: 'all',
        message: ''
      }
    }
  },

  methods: {
    applyFilter () {
      this.$emit('filter', this.filter)
    }
  }
}
</script>

<style lang="scss">
  .post-filter{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: $light-gray;
    max-width: $filter-max-width;
    margin: 0 auto;

    &__container{
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      column-gap: 2.5rem;
      row-gap: 1rem;

      label{
        color: $white;
        margin-right: 0.5rem;
      }

      select, input[type="text"]{
        padding: 0.2rem;
        color: $dark-gray;
        border-radius: 7px;
        border: 1px solid $dark-gray;
        outline: none;
        box-shadow: none;
        cursor: pointer;
      }
    }

    &__button{
      text-align: right;

      button{
        background-color: $dark-blue;
        color: $white;
        padding: 0.3rem 1.2rem;
        border: none;
        border-radius: 7px;

        &:hover{
          cursor: pointer;
          filter: brightness(135%);
        }
      }
    }
  }
</style>

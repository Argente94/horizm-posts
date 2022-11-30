<template>
    <div class="table-pagination">
        <div>
            <span class="p-btn" :class="{enabled: currentPage > 1}" @click="first">&lt;&lt;</span>
            <span class="p-btn" :class="{enabled: currentPage > 1}" @click="previous">&lt;</span>
            <span> {{ currentPage }} of {{ totalPages }} </span>
            <span class="p-btn" :class="{enabled: currentPage < totalPages}" @click="next">></span>
            <span class="p-btn" :class="{enabled: currentPage < totalPages}" @click="last">>></span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TablePagination',

  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      index: 0
    }
  },

  computed: {
    totalPages () {
      return Math.ceil(this.options.total / this.options.offset)
    },

    currentPage () {
      const page = this.index / this.options.offset + 1

      if (page > this.totalPages) {
        this.paginate(0)
        return 1
      }

      return page
    }
  },

  methods: {
    first () {
      if (this.currentPage > 1) {
        this.paginate(0)
      }
    },

    previous () {
      if (this.currentPage > 1) {
        this.paginate(this.index - this.options.offset)
      }
    },

    next () {
      if (this.currentPage < this.totalPages) {
        this.paginate(this.index + this.options.offset)
      }
    },

    last () {
      if (this.currentPage < this.totalPages) {
        this.paginate((this.totalPages - 1) * this.options.offset)
      }
    },

    paginate (index) {
      this.index = index
      this.$emit('paginate', index)
    }
  }

}
</script>

<style lang="scss">
    .table-pagination{
        display: flex;
        justify-content: end;
        margin-bottom: 0.5rem;

        span{
            margin: 0 0.1rem;

            &.p-btn{
                cursor: pointer;

                &:not(.enabled){
                    color: $light-gray;
                    cursor: default;
                }
            }
        }
    }
</style>

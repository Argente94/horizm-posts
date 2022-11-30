<template>
  <div class="post-table">
    <TablePagination v-if="isPaginationEnabled" :options="paginationOptions" @paginate="setPagination"/>
    <div class="post-table__content">
      <sorted-table :values="paginatedPosts">
      <thead>
        <tr>
          <th scope="col" class="post-table__content__network">
            <sort-link name="network">Network</sort-link>
          </th>
          <th scope="col" class="post-table__content__date">
            <sort-link name="date">Date</sort-link>
          </th>
          <th scope="col" class="post-table__content__message">
            <sort-link name="copy">Message</sort-link>
          </th>
          <th scope="col" class="post-table__content__type">
            <sort-link name="type">Type</sort-link>
          </th>
          <th scope="col" class="post-table__content__impressions">
            <sort-link name="impressions">Impressions</sort-link>
          </th>
        </tr>
      </thead>
      <template #body="sort">
        <tbody >
        <tr v-for="post in sort.values" :key="sort.values.indexOf(post)">
          <td class="post-table__content__network">
            <img :src=" 'images/' + post.network + '_icon.png'" width="25" height="25">
          </td>
          <td class="post-table__content__date">{{ post.date }}</td>
          <td class="post-table__content__message">{{ post.copy }}</td>
          <td class="post-table__content__type">{{ post.type }}</td>
          <td class="post-table__content__impressions">{{ post.impressions }}</td>
        </tr>
      </tbody>
      </template>
    </sorted-table>
    </div>
  </div>
</template>

<script>
import TablePagination from './TablePagination.component.vue'

export default {
  name: 'PostsTable',

  components: {
    TablePagination
  },

  props: {
    posts: {
      type: Array,
      required: true
    },
    offset: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data () {
    return {
      paginationFrom: 0
    }
  },

  computed: {
    isPaginationEnabled () {
      return this.offset !== 0
    },

    paginationOptions () {
      return {
        total: this.posts.length,
        offset: this.offset
      }
    },

    paginatedPosts () {
      const to = this.offset === 0 ? this.posts.length : this.paginationFrom + this.offset
      return this.posts.slice(this.paginationFrom, to)
    }
  },

  methods: {
    setPagination (from) {
      this.paginationFrom = from
    }
  }
}
</script>

<style lang="scss">
  .post-table{
    max-width: $tablet-h-width;
    width: 100%;
    margin: 0 auto;

    &__content{
      font-size: 0.9rem;
      overflow-x: scroll;

      table{
        border-collapse: collapse;
        width: 100%;
      }

      thead{
        background-color: $lighter-gray;

        a{
          text-decoration: none;
          color: $darker-gray;
        }
      }

      th, td{
        margin: 1rem 0;
        padding: 0 1rem;
        text-align: left;
      }

      &__network{
        min-width: 7rem;
        text-align: center !important;

        img{
          margin-top: 0.2rem;
        }
      }

      &__date{
        font-weight: bold;
        white-space: nowrap;
      }

      &__message{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      &__type{
        min-width: 6rem;
      }

      &__impressions{
        min-width: 9rem;
      }

      &::-webkit-scrollbar {
        width: 20px;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $sb-color;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: $sb-hover-color;
      }
    }
  }
</style>

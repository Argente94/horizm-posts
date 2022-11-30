import axios from 'axios'

const postsModule = {
  state: () => ({
    posts: []
  }),
  getters: {
    getPosts (state) {
      return state.posts
    },

    getFilteredPosts (state) {
      return (filter) => {
        let posts = state.posts

        /* Filter has not been applied yet */
        if (filter === null) { return posts }

        /* Filter by network */
        if (filter.network !== 'all') {
          posts = posts.filter((post) => { return post.network === filter.network })
        }

        /* Filter by type */
        if (filter.type !== 'all') {
          posts = posts.filter((post) => { return post.type === filter.type })
        }

        /* Filter by message */
        if (filter.message !== '') {
          posts = posts.filter((post) => { return post.copy.toLowerCase().includes(filter.message.toLowerCase()) })
        }

        return posts
      }
    },

    getImpressionsByProp (state) {
      return (propName) => {
        /* Get possible values */
        const values = []
        state.posts.forEach(post => {
          if (!values.includes(post[propName])) { values.push(post[propName]) }
        })

        const impressions = {}
        values.forEach(propValue => {
          impressions[propValue] = state.posts.filter(post => { return post[propName] === propValue }).reduce((acc, post) => { return acc + post.impressions }, 0)
        })

        return impressions
      }
    }
  },
  mutations: {
    SET_POSTS (state, posts) {
      state.posts = posts
    }
  },
  actions: {
    fetchPosts ({ commit }) {
      axios
        .get('posts_data.json')
        .then(response => response.data)
        .then(posts => {
          commit('SET_POSTS', posts)
        })
    }
  }
}

export default postsModule

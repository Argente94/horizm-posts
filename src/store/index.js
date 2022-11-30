import Vue from 'vue'
import Vuex from 'vuex'
import postsModule from '@/store/posts.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts: postsModule
  }
})

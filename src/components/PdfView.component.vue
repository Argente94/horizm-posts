<template>
    <div>
        <div @click="generatePDF()" class="pdf-btn">Export as PDF</div>

        <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :manual-pagination="true"
            filename="post_report"
            :pdf-quality="2"
            pdf-format="a4"
            :pdf-margin="20"
            pdf-orientation="portrait"
            pdf-content-width="800px"
            @progress="onProgress($event)"
            ref="html2Pdf"
        >
            <section slot="pdf-content">
                <div class="pdf-page html2pdf__page-break" v-for="posts in slicedPosts" :key="slicedPosts.indexOf(posts)">
                    <PostsTable :posts="posts" />
                    <div style="text-align: center">Page {{ slicedPosts.indexOf(posts) + 1 }} of {{slicedPosts.length + 1}}</div>
                </div>
                <div class="pdf-page">
                    <div class="pdf-charts">
                        <div>
                            <h3>Impressions by Media Types Analysis</h3>
                            <PieChart propName="type"/>
                        </div>
                        <div>
                            <h3>Impressions by Networks Analysis</h3>
                            <PieChart propName="network"/>
                        </div>
                    </div>
                </div>
            </section>
        </vue-html2pdf>
    </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import PieChart from '@/components/PieChart.component.vue'
import PostsTable from '@/components/PostsTable.component.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'PdfView',

  components: {
    VueHtml2pdf,
    PostsTable,
    PieChart
  },

  computed: {
    /* Get posts from vuex store */
    ...mapGetters([
      'getPosts'
    ]),

    slicedPosts () {
      const posts = []
      const chunkSize = 20

      for (let i = 0; i < this.getPosts.length; i += chunkSize) {
        const chunk = this.getPosts.slice(i, i + chunkSize)
        posts.push(chunk)
      }

      return posts
    }
  },

  methods: {
    onProgress (event) {
      console.log(`Processed: ${event} / 100`)
    },
    hasGenerated () {
      alert('PDF generated successfully!')
    },
    generatePDF () {
      this.$refs.html2Pdf.generatePdf()
    }
  }
}
</script>

<style lang="scss">
    .pdf-btn{
        max-width: $btn-width;
        padding: 0.5rem 1rem;
        margin-left: auto;
        background-color: $light-blue;
        border-radius: 7px;
        text-align: center;

        &:hover{
          cursor: pointer;
          filter: brightness(105%);
        }
    }

    .pdf-page{
        padding: 20px;
    }

    .pdf-charts{
        display:flex;
        flex-direction: column;
        gap: 40px;
        padding: 20px;

        h3{
            margin-bottom: 1rem;
        }
    }
</style>

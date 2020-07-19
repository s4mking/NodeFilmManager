<template>
  <div id="distributeurs">
    <h1>Distributeurs</h1>
      <table>
        <tr >
            <th>ID</th>
            <th>Nom</th>
            <th>Telephone</th>
        </tr>
        <tr v-for="distributeur in distributeurs" :key="distributeur.id_distributeur">
      <td><router-link :to="'/distributeurs/'+distributeur.id_distributeur">{{distributeur.id_distributeur}}</router-link></td>
     <td> <router-link :to="'/distributeurs/'+distributeur.id_distributeur">{{distributeur.nom}}</router-link></td>
            <td>{{distributeur.telephone}}</td>
        </tr>
    </table>

       <BasePagination
      :current-page="currentPage"
      :page-count="pageCount"
      class="articles-list__pagination"
      @nextPage="pageChangeHandle('next')"
      @previousPage="pageChangeHandle('previous')"
       @loadPage="pageChangeHandle"
    />
  </div>
</template>

<script>
import BasePagination from "@/components/Pagination";

export default {
  name: "Distributeurs",
  components: { BasePagination },
  data: function() {
    return {
      distributeurs: [],
       currentPage: 1,
      pageCount: 0
    };
  },
  mounted() {
    this.$store.dispatch("getDistributeurs").then(resp => {
      this.distributeurs = resp.data.distributeurs;
      this.pageCount = Math.ceil(
        resp.data.count / 20
      )
      console.log(resp.data)
    });
  },
  methods: {
    async pageChangeHandle(value) {
      switch (value) {
        case 'next':
          this.currentPage += 1
          break
        case 'previous':
          this.currentPage -= 1
          break
        default:
          this.currentPage = value
      }
      const { data } = await this.$store.dispatch("getDistributeurs",this.currentPage)
      this.distributeurs = data.distributeurs
    }
  }
};
</script>
<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
</style>
<template>
  <div id="films">
    <h1>Films</h1>
    <table>
      <tr>
        <th>
          <a href="/films/?sort=id">ID</a>
        </th>
        <th>
          <a href="/films/?sort=titre">Titre</a>
        </th>
        <th>
          <a href="/films/?sort=resum">Resum</a>
        </th>
        <th>
          <a href="/films/?sort=date_debut_affiche">Date debut affiche</a>
        </th>
        <th>
          <a href="/films/?sort=date_fin_affiche">Date fin affiche</a>
        </th>
        <th>
          <a href="/films/?sort=duree_minutes">Durée minutes</a>
        </th>
        <th>
          <a href="/films/?sort=annee_production">Année production</a>
        </th>
      </tr>
      <tr v-for="film in films" :key="film.id">
        <td>
          <router-link :to="'/films/'+film.id_film">{{film.id_film}}</router-link>
        </td>
        <td>
          <router-link :to="'/films/'+film.id_film">{{film.titre}}</router-link>
        </td>
        <td>{{film.resum}}</td>
        <td>{{film.duree_minutes}}</td>
        <td>{{film.date_debut_affiche}}</td>
        <td>{{film.date_fin_affiche}}</td>
        <td>{{film.annee_production}}</td>
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
  name: "Friends",
  components: { BasePagination },
  data: function() {
    return {
      films: [],
      currentPage: 1,
      pageCount: 0
    };
  },
  mounted() {
    this.$store.dispatch("getFilms").then(resp => {
      this.films = resp.data.films;
      this.pageCount = Math.ceil(resp.data.count / 20);
      console.log(resp.data);
    });
    this.sockets.listener.subscribe("modifFilm", data => {
      console.log(data);
      this.$store.dispatch("getFilms").then(resp => {
        this.films = resp.data.films;
        this.pageCount = Math.ceil(resp.data.count / 20);
        console.log(resp.data);
      });
    });
    this.sockets.listener.subscribe("deleteFilm", data => {
      console.log(data);
      this.$store.dispatch("getFilms").then(resp => {
        this.films = resp.data.films;
        this.pageCount = Math.ceil(resp.data.count / 20);
        console.log(resp.data);
      });
    });
  },
  methods: {
    async pageChangeHandle(value) {
      switch (value) {
        case "next":
          this.currentPage += 1;
          break;
        case "previous":
          this.currentPage -= 1;
          break;
        default:
          this.currentPage = value;
      }
      const { data } = await this.$store.dispatch("getFilms", this.currentPage);
      this.films = data.films;
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
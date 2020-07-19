<template>
  <div id="person">
    <h1>Film</h1>
    <Film :film="film" />
  </div>
</template>

<script>
import Film from "@/components/Film";
export default {
  name: "Profile",
  components: { Film },
  data: function() {
    return {
      film: {}
    };
  },

  mounted() {
    this.$store.dispatch("getFilm").then(resp => {
      this.film = resp.film;
    });
    this.sockets.listener.subscribe("modifFilm", data => {
      console.log(data);
      this.film = data;
    });
    this.sockets.listener.subscribe("deleteFilm", data => {
      console.log(data);
      this.$router.push("films");
    });
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
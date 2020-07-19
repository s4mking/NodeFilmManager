<template>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{{film.id_film}}</h5>
      <input v-model="film.titre" />
      <textarea v-model="film.resum"></textarea>
      <button type="button" v-on:click="remove()">Supprimer</button>
      <button type="button" v-on:click="modify()">Modifier</button>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Film",
  props: {
    film: {
      type: Object
    }
  },
  data() {
    return {
      socket: io("localhost:3000")
    };
  },
  methods: {
    remove() {
      this.$store
        .dispatch("removeFilm", this.film.id_film)
        .then(() => this.$socket.emit("removeFilm", this.distributeur))
        .catch(err => console.log(err));
    },
    modify() {
      this.$store
        .dispatch("putFilm", this.film)
        .then(this.$socket.emit("modifyFilm", this.distributeur))
        .catch(err => console.log(err));
    }
  },
  sockets: {
    customEmit: function() {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

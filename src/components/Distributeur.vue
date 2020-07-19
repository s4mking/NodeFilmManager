<template>
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{{distributeur.id_distributeur}}</h5>
      <input v-model="distributeur.nom">
      <textarea v-model="distributeur.telephone"></textarea>
      <button type="button" v-on:click="remove()">Supprimer</button>
      <button type="button" v-on:click="modify()">Modifier</button>
      <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
       <button @click="pingServer()">Ping Server</button>
    </div>
  </div>
</template>

<script>
//import io from 'socket.io-client';
export default {
  name: "Distributeur",
  props: {
    distributeur: {
      type: Object
    }
  },
  data(){
    return{
     // socket : io('localhost:3000')
    }
  },
  methods: {
 remove() {
      this.$store
        .dispatch("removeDistributeur", this.distributeur.id_distributeur)
        .then(() => this.$socket.emit('removeDistrib', this.distributeur))
        .catch(err => console.log(err));
    },
     modify() {
      this.$store
        .dispatch("putDistributeur", this.distributeur)
        .then(() => this.$socket.emit('modifyDistrib', this.distributeur))
        .catch(err => console.log(err));
       
    },
  },
   mounted() {
 
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

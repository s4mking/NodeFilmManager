<template>
  <div id="person">
    <h1>Distributeur</h1>
    <Distributeur :distributeur="distributeur" />
  </div>
</template>

<script>
import Distributeur from "@/components/Distributeur";
export default {
  name: "Profile",
  components: { Distributeur },
  data: function() {
    return {
      distributeur: {},
    };
  },
  mounted() {
    this.$store.dispatch("getDistributeur").then(resp => {
      this.distributeur = resp.distributeur;
     
    });
      this.sockets.listener.subscribe("modifDistrib", (data) => {
        console.log(data);
        this.distributeur=data
    });
      this.sockets.listener.subscribe("deleteDistrib", (data) => {
        console.log(data);
        this.$router.push('distributeurs');
    });
      //  this.socket.on('modifDistrib', (data) => {
      //     this.distributeur=data
      //   });
      //  this.socket.on('deleteDistrib', (data) => {
      //    console.log(data)
      //   this.$router.push('distributeurs');
      //  });
         
  },
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
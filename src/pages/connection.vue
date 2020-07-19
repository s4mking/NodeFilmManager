<template>
  <div id="login">
    <Login />
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  name: "Connection",
  components: { Login },
  data() {
    return {};
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
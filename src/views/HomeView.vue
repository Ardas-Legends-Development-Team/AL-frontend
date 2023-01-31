<template>
  <HelloWorld msg="Hello from HomeView.vue" />
  <button class="btn btn-accent" @click="testRequest">TEST</button>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
const testRequest = () => {
  const params = new URLSearchParams({
    page: "0",
    size: "10",
  });

  axios
    .get(`http://localhost:8080/api/player`, {
      params: params,
      /*headers: {
              "Access-Control-Allow-Origin": "*",
            },*/
    })
    .then((data) => console.log(data));
};
</script>

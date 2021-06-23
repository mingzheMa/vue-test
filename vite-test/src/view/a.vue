<template>
  <iframe
    src="http://192.168.31.75:8080/shared-tools/all-funds"
    width="100%"
    height="100%"
    frameborder="0"
  ></iframe>
</template>

<script lang="ts">
  export default {
    name: "a",
    created() {
      window.onmessage = function (a) {
        console.log("a",a);
      };
    }
  };
</script>

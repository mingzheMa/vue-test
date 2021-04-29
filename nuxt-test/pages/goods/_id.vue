<template>
  <div>goods-{{ $route.params.id }}</div>
</template>

<script>
export default {
  name: "goods-id",

  validate({ params, query }) {
    console.log(params, query);
    return true;
  }
};
</script>

<style></style>

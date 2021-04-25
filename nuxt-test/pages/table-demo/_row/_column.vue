<template>
  <div>
    this is table {{ $route.params.row || 1 }} row, {{ $route.params.column || 1 }} column
  </div>
</template>

<script lang="ts">
export default {
  name: "table-demo-row-column",

  validate({ params }) {
    const reg = /^\d+$/;
    return reg.test(params.row) && reg.test(params.column);
  }
};
</script>

<style lang="less" scoped></style>

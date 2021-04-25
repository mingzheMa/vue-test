<template>
  <div>
    <h1>table list</h1>
    <br />
    <h1>cloumn:{{column}}</h1>

    <RadioGroup v-model="column">
      <template v-for="num in 10">
        <Radio :label="`${num}`" :key="num">{{ num }}</Radio>
      </template>
    </RadioGroup>

    <h1>row:{{row}}</h1>

    <RadioGroup v-model="row">
      <template v-for="num in 10">
        <Radio :label="`${num}`" :key="num">{{ num }}</Radio>
      </template>
    </RadioGroup>

    <nuxt-link :to="`/table-demo/${column}/${row}`">next&gt;</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "table-demo",

  data() {
    return { column: "1", row: "1" };
  },

  methods: {}
};
</script>

<style lang="less" scoped></style>

<template>
  <div>
    <HelloWorld str="123123" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HelloWorld from "./components/HelloWorld.vue"

@Component({
  components: {
    HelloWorld
  }
})
export default class CompName extends Vue {}
</script>

<style lang="scss" scoped></style>

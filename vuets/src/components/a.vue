<template>
  <div>2</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({})
export default class CompName extends Vue {
  @Prop()
  str!: string

  selfStr = "selfStr"
}
</script>

<style lang="scss" scoped></style>

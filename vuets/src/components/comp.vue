<template>
  <div>comp：hellow {{msg}}</div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class CompName extends Vue {
  @Prop()
  msg!: string
}
</script>

<style lang='scss' scoped>
</style>
<template>
  <div>
    1
    {{ str }}
    {{ selfStr }}
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator"
import A from "./a.vue"

@Component({})
export default class CompName extends A {}
</script>

<style lang="scss" scoped></style>

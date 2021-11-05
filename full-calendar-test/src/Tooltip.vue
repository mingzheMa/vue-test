<template>
  <div class="tooltip">
    <div class="tooltip__l"></div>
    <div class="tooltip__r"></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style>
.tooltip {
  padding: 24px;
}
</style>

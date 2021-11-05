<template>
  <div class="tooltip">
    <p>测试自定义tooltip组件</p>
    <p>
      {{ data }}
    </p>
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

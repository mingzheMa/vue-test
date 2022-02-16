<!-- 
  方案1
  通过css使按钮溢出隐藏，但是无法动态判断更多下拉选择器中的剩余按钮
 -->
<template>
  <div class="content">
    <div class="content__inner">
      <template v-for="(name, i) in mock">
        <div class="content__inner-btn" :key="i">{{ name }}</div>
      </template>
    </div>

    <div class="content__more-btn">更多</div>
  </div>
</template>

<script>
import Mock from "mockjs"

export default {
  name: "App",

  data() {
    return {
      mock: new Array(100).fill().map(() => Mock.Random.name())
    }
  },

  methods: {}
}
</script>

<style lang="scss">
body {
  margin: 0;
}

.content {
  height: 28px;
  display: flex;
  align-items: center;

  &__inner {
    width: calc(100% - 46px);
    height: 100%;
    overflow: hidden;
  }

  &__inner-btn,
  &__more-btn {
    display: inline-block;
    border: 1px solid #000;
    padding: 2px 6px;
    margin-right: 12px;

    &:last-child {
      margin-right: 0px;
    }
  }

  &__more-btn {
  }
}
</style>

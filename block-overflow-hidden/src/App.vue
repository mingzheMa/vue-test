<template>
  <div class="content">
    <div ref="contentInnerRef" class="content__inner">
      <template v-for="(name, index) in mock">
        <el-button
          v-if="name !== 'MORE'"
          ref="contentInnerBtnRef"
          class="content__inner-btn"
          :data-name="name"
          :data-index="index"
          :key="name"
        >
          {{ name }}
        </el-button>

        <span v-if="name === 'MORE'" :key="name">更多</span>
        <!-- <el-dropdown
          class="content__inner-btn"
          :key="i"
        >
          <el-button type="primary">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(name, i) in more">
              <el-dropdown-item :key="i">{{ name }}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown> -->
      </template>
    </div>
  </div>
</template>

<script>
import Mock from "mockjs"

export default {
  name: "App",

  data() {
    return {
      mock: new Array(10).fill().map(() => Mock.Random.name()),
      more: [1],
      ob: null
    }
  },

  mounted() {
    this.ob = this.domsIntersection(
      this.$refs.contentInnerBtnRef,
      this.domsIntersectionCb,
      {
        root: this.$refs.contentInnerRef,
        threshold: [0, 1]
      }
    )
  },

  methods: {
    // 元素交叉观察器 vue elems或elems元素数组 cb回调函数 options Intersection配置
    domsIntersection(elems, cb, options) {
      if (!elems.length) return

      const ob = new IntersectionObserver(cb, options)
      elems.forEach(c => {
        ob.observe(c.$el || c)
      })

      return ob
    },

    // 交叉观察器
    domsIntersectionCb(observable) {
      console.log(this.mock, observable)
      this.hiddenDom(observable)
      this.spliceMore(observable)
    },

    // 隐藏不完全在视图内的元素
    hiddenDom(observable) {
      observable.forEach(o => {
        if (o.intersectionRatio === 1) {
          // o.target.style.opacity = 1
          o.target.style.background = "#f0f"
        } else {
          // o.target.style.opacity = 0
          o.target.style.background = "#ff0"
        }
      })
    },

    // 插入更多按钮位置
    spliceMore(observable) {
      observable.forEach(o => {
        // 如果退出观察视口元素为更多，说明视口在变窄，需要将更多按钮向前挪动一个
        if (o.target.dataset.name === "MORE") {
          this.mock = this.mock.filter(m => m !== "MORE")
          this.mock.splice(o.target.dataset.index - 1, 0, "MORE")
        }

        // 如果有元素进入观察视口并且交叉值为1时，说明观察视口变大，需要将更多按钮向后挪动一个
        if (o.intersectionRatio === 1) {
          this.mock = this.mock.filter(m => m !== "MORE")
          this.mock.splice(o.target.dataset.index, 0, "MORE")
        }
      })
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

.content {
  height: 40px;
  display: flex;

  &__inner {
    height: 100%;
    overflow: hidden;
    white-space: nowrap;

    &-btn {
      margin-right: 12px;
      // flex: 0 0 auto;
    }
  }
}
</style>

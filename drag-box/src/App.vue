<template>
  <div class="page">
    <ul class="options">
      <li
        class="options__item"
        v-for="option in options"
        draggable="true"
        :key="option"
        @dragstart="dragstart(option)"
      >
        {{ option }}
      </li>
    </ul>

    <Drag ref="dragRef" class="drag" :dragField="dragField" />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator"
import Drag from "./components/Drag/index.vue"

@Component({
  components: {
    Drag
  }
})
export default class App extends Vue {
  @Ref()
  dragRef!: Drag

  options = ["aaa", "bbb", "ccc"]

  dragField = {} // 拖拽元素配置

  mounted() {
    this.dragRef.updatePaletteConfig([
      {
        img: "//static.xinrenxinshi.com/unicorn/img/无形财产及保密协议/无形财产及保密协议_00.png",
        fields: [
          {
            key: "3",
            name: "固定大小",
            pos: [20, 20],
            w: 150,
            h: 28,
            minW: 28,
            minH: 28,
            directions: ["nw", "w", "ws", "s", "es", "e", "ne", "n"]
          }
        ]
      },
      {
        img: "//static.xinrenxinshi.com/unicorn/img/无形财产及保密协议/无形财产及保密协议_01.png",
        fields: []
      },
      {
        img: "//static.xinrenxinshi.com/unicorn/img/无形财产及保密协议/无形财产及保密协议_02.png",
        fields: []
      }
    ])
  }

  dragstart(option: string) {
    this.dragField = {
      key: `${Date.now()}${Math.random()}`,
      name: option,
      pos: [0, 0],
      w: 150,
      h: 100,
      minW: 28,
      minH: 28,
      directions: ["nw", "w", "ws", "s", "es", "e", "ne", "n"]
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

.page {
  display: flex;
}

.drag {
  width: 70%;
}

.options {
  width: 30%;
  border-right: 1px solid #000;
}
</style>

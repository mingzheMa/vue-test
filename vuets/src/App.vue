<template>
  <div>
    app.vue:
    <input type="text" v-model="msg">
    <div id="box">box</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Comp from "./components/comp.vue"

@Component({})
export default class CompName extends Vue {
  msg = "word"

  comp = null

  @Watch("msg")
  watchMsg(val){
    this.comp.msg = val
  }

  mounted() {
    this.comp = new Comp({
      propsData:{
        msg: this.msg
      }
    }).$mount("#box")
    console.log(this.comp)
  }
}
</script>

<style lang="scss" scoped></style>

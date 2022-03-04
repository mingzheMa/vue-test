<template>
  <div class="pdf-pages" ref="scrollContentRef">
    <div class="pdf-pages-box">
      <template v-for="(page, index) in paletteConfig">
        <div
          class="pdf-page-container"
          ref="pdfPageRefs"
          :style="{
            backgroundImage: `url(${page.img})`
          }"
          :key="index"
          @dragover="e => e.preventDefault()"
          @drop="handleFieldDrop($event, page, index)"
        >
          <!-- 辅助线 -->
          <template v-if="moveField && moveData.pageIndex === index">
            <span
              class="page-line page-line-x"
              :style="{ top: moveField.pos[1] + 'px' }"
            />
            <span
              class="page-line page-line-y"
              :style="{ left: moveField.pos[0] + 'px' }"
            />
          </template>
          <ul>
            <!-- 已拖入字段 -->
            <li
              class="page-inner-field"
              v-for="(field, fIndex) in page.fields"
              :key="fIndex"
              :style="{
                left: field.pos[0] + 'px',
                top: field.pos[1] + 'px',
                width: field.w + 'px',
                height: field.h + 'px'
              }"
              @mousedown="handleFieldMovestart($event, field, index)"
            >
              <!-- 改变大小方向点 -->
              <i
                v-for="point in field.directions"
                :key="point"
                class="field-point"
                :class="['field-point-' + point]"
                @mousedown.stop="
                  handleFieldDotMousedown($event, field, point, index)
                "
              ></i>
              <!-- 删除按钮 -->
              <div
                class="inner-field-delete"
                @click.stop="handleFieldDelete(page, fIndex)"
              >
                <span class="delete-icon-wrap">×</span>
              </div>
              {{ field.name }}
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator"

import * as selfTypes from "./index.type"
import * as selfUtils from "./index.utils"
import _ from "lodash"

@Component
export default class Drag extends Vue {
  @Ref()
  scrollContentRef!: HTMLElement

  @Ref()
  pdfPageRefs!: HTMLElement[]

  @Prop({
    default: () => ({})
  })
  dragField!: selfTypes.TemplateFiled

  pageWidth = 800.67
  pageHeight = 1130

  // 画板配置
  paletteConfig: selfTypes.TemplatePage[] = []

  // 当前移动/改变大小所选字段
  moveField: selfTypes.TemplateFiled | null = null
  moveData: selfTypes.TemplateMoveData = {
    pageIndex: 0,
    maxX: 0,
    maxY: 0,
    x: 0,
    y: 0,
    type: 1,
    d: ""
  }

  mounted() {
    //添加全局鼠标抬起事件监控
    document.addEventListener("mouseup", this.handleFieldMoveend)
  }

  destroyed() {
    //页面销毁时清楚鼠标抬起事件监控
    document.removeEventListener("mouseup", this.handleFieldMoveend)
  }

  /**
   * 拖动鼠标抬起事件
   * @param e
   */
  handleFieldMoveend(e: any) {
    this.moveField = null
    this.moveData = {
      pageIndex: 0,
      maxX: 0,
      maxY: 0,
      x: 0,
      y: 0,
      type: 1,
      d: ""
    }
    document.removeEventListener("mousemove", this.moveListener, true)
  }

  /**
   * 鼠标移动事件处理
   * 移动：跟随鼠标轨迹改变元素相对位置
   * 改变大小：根据鼠标轨迹加上一系列的边界判断，改变元素大小和相对位置
   * @param e
   */
  moveListener(e: any) {
    if (this.moveField) {
      const diffX = e.pageX - this.moveData.x
      const diffY = e.pageY - this.moveData.y
      this.moveData.x = e.pageX
      this.moveData.y = e.pageY
      const pos = this.moveField.pos || [0, 0]
      let x = pos[0]
      let y = pos[1]
      let w = this.moveField.w
      let h = this.moveField.h
      const minW = this.moveField.minW
      const minH = this.moveField.minH
      const maxX = this.moveData.maxX
      const maxY = this.moveData.maxY
      if (this.moveData.type === 1) {
        // 移动模式
        x = x + diffX
        //最小为0
        x = x < 0 ? 0 : x
        //最大为页总宽度-字段宽度
        x =
          x > this.pageWidth - this.moveField.w
            ? this.pageWidth - this.moveField.w
            : x
        y = y + diffY
        y = y < 0 ? 0 : y
        y =
          y > this.pageHeight - this.moveField.h
            ? this.pageHeight - this.moveField.h
            : y
      } else {
        //改变大小模式
        const xf = w + x
        const yf = h + y
        switch (this.moveData.d) {
          case "nw":
            //n
            y = y + diffY < 0 ? 0 : y + diffY
            y = y > maxY ? maxY : y
            h = yf - y
            //w
            x = x + diffX < 0 ? 0 : x + diffX
            x = x > maxX ? maxX : x
            w = xf - x
            break
          case "n":
            y = y + diffY < 0 ? 0 : y + diffY
            y = y > maxY ? maxY : y
            h = yf - y
            break
          case "w":
            x = x + diffX < 0 ? 0 : x + diffX
            x = x > maxX ? maxX : x
            w = xf - x
            break
          case "ws":
            //w
            x = x + diffX < 0 ? 0 : x + diffX
            x = x > maxX ? maxX : x
            w = xf - x
            //s
            h = this.moveField.h + diffY
            h = h > this.pageHeight - y ? this.pageHeight - y : h
            h = h < minH ? minH : h
            break
          case "s":
            h = this.moveField.h + diffY
            h = h > this.pageHeight - y ? this.pageHeight - y : h
            h = h < minH ? minH : h
            break
          case "es":
            //e
            w = this.moveField.w + diffX
            w = w > this.pageWidth - x ? this.pageWidth - x : w
            w = w < minW ? minW : w
            //s
            h = this.moveField.h + diffY
            h = h > this.pageHeight - y ? this.pageHeight - y : h
            h = h < minH ? minH : h
            break
          case "e":
            w = this.moveField.w + diffX
            w = w > this.pageWidth - x ? this.pageWidth - x : w
            w = w < minW ? minW : w
            break
          case "ne":
            //n
            y = y + diffY < 0 ? 0 : y + diffY
            y = y > maxY ? maxY : y
            h = yf - y
            //e
            w = this.moveField.w + diffX
            w = w > this.pageWidth - x ? this.pageWidth - x : w
            w = w < minW ? minW : w
            break
          default:
            break
        }
        this.moveField.w = w
        this.moveField.h = h
      }
      this.moveField.pos = [x, y]
    }
  }

  /**
   * 字段拖动释放
   * 坐标计算：
   *    1.取当前页在屏幕中的绝对定位 pagePos
   *    2.取滚动的高度 scrollTop
   *    3.取释放时鼠标的位置 [e.pageX,e.pageY]
   *    4.进行计算 [e.pageX - pagePos.x - field.w/2, e.pageY - pagePos.y - field.h/2 + scrollTop]
   *    5.其中要减去拖动字段元素高度和宽度的一半，让元素拖进来后的字段中心点落于鼠标位置
   *    6.算出来的坐标就是相对当前页的坐标，同时也是提供给后端的坐标
   * @param e
   * @param page
   * @param index
   */
  handleFieldDrop(e: any, page: selfTypes.TemplatePage, index: number) {
    const curPage = this.pdfPageRefs[index]
    const scrollTop = this.scrollContentRef?.scrollTop || 0
    const pagePos = selfUtils.getElementPagePosition(curPage)
    const field = _.cloneDeep(this.dragField)

    let x = e.pageX - pagePos.x - field.w / 2
    let y = e.pageY - pagePos.y - field.h / 2 + scrollTop
    // 边界判断
    if (x < 0) x = 0 // 左
    if (y < 0) y = 0 // 上
    if (x > this.pageWidth - field.w) x = this.pageWidth - field.w // 右
    if (y > this.pageHeight - field.h) y = this.pageHeight - field.h // 下

    field.pos = [x, y]
    page.fields.push(field)
  }

  /**
   * 字段拖动鼠标按下事件
   * @param e
   * @param field
   * @param index
   */
  handleFieldMovestart(e: any, field: selfTypes.TemplateFiled, index: number) {
    this.moveData = {
      pageIndex: index,
      maxX: field.pos[0] + field.w - field.minW,
      maxY: field.pos[1] + field.h - field.minH,
      x: e.pageX,
      y: e.pageY,
      type: 1,
      d: ""
    }
    this.moveField = field
    document.addEventListener("mousemove", this.moveListener)
  }

  /**
   * 删除字段
   * @param page
   * @param index
   */
  handleFieldDelete(page: selfTypes.TemplatePage, index: number) {
    page.fields.splice(index, 1)
  }

  /**
   * 字段改变大小鼠标按下事件
   * @param e
   * @param field
   * @param d
   * @param index
   */
  handleFieldDotMousedown(
    e: any,
    field: selfTypes.TemplateFiled,
    d: string,
    index: number
  ) {
    this.moveData = {
      pageIndex: index,
      maxX: field.pos[0] + field.w - field.minW,
      maxY: field.pos[1] + field.h - field.minH,
      x: e.pageX,
      y: e.pageY,
      type: 2,
      d
    }
    this.moveField = field
    document.addEventListener("mousemove", this.moveListener)
  }

  // 外部调用
  // 更新画板配置
  updatePaletteConfig(config: selfTypes.TemplatePage[]) {
    this.paletteConfig = config
  }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

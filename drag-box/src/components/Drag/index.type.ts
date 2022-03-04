/**
 * interface-模板字段
 */
export interface TemplateFiled {
  //字段名
  name: string
  //字段唯一标识
  key: string
  //相对定位[x,y]
  pos: number[]
  //宽度
  w: number
  //高度
  h: number
  //最小宽度
  minW: number
  //最小高度
  minH: number
  //可改变大小方向,'nw': 左上, 'w': 左, 'ws': 左下, 's': 下, 'es': 右下, 'e': 右, 'ne': 右上, 'n': 上
  directions: string[]
}

/**
 * interface-模板单页
 */
export interface TemplatePage {
  // 背景图
  img: string
  // 已经拖入的字段
  fields: TemplateFiled[]
}

/**
 * interface-模板鼠标移动事件依赖数据
 */
export interface TemplateMoveData {
  // 页码
  pageIndex: number
  // 改变大小时最大横坐标
  maxX: number
  // 改变大小时最大纵坐标
  maxY: number
  // 鼠标位置横坐标
  x: number
  // 鼠标位置纵坐标
  y: number
  // 类型，1：字段移动；2：字段改变大小
  type: 1 | 2
  // 改变大小方向
  d: string
}

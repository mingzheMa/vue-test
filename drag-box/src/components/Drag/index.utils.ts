/**
 * 工具函数-获取元素在屏幕中的绝对定位
 * @param element
 */
export const getElementPagePosition = function (element: any) {
  //计算x坐标
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  while (current !== null) {
    actualLeft += current.offsetLeft + current.clientLeft
    current = current.offsetParent
  }
  //计算y坐标
  let actualTop = element.offsetTop
  current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop + current.clientTop
    current = current.offsetParent
  }
  //返回结果
  return { x: actualLeft, y: actualTop }
}

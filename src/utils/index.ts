const artistsShow = (arr: Array<{ name: string }>) => {
  const isHaveEllipsis = arr.length > 3
  return isHaveEllipsis ? arr.map(item => item.name).join('/') + '...' : arr.map(item => item.name).join('/')
}

/**
 * 防抖函数
 * @param fn 执行函数
 * @param wait 延迟时间 ms
 */
function debounce(fn: Function, wait: number) {
  let timeout: NodeJS.Timeout | number
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fn, wait)
  }
}

export { artistsShow, debounce }

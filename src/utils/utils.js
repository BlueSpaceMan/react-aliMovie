// -------------工具js文件---------------- //
// 获取中国时区的时间
export let getChinaTime = (utctime) => {
  let date = new Date(utctime)
  let h = date.getHours()
  let m = date.getMinutes()
  let s=  date.getSeconds()
  if (h >= 0 && h <= 9) {
    h = '0' + h
  }
  if (m >= 0 && m <= 9) {
    m = '0' + m
  }
  if (s >= 0 && s <= 9) {
    s = '0' + s
  }
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    h +
    ':' +
    m+':'+ s
  )
}

// 获取时分时间 例18:20
export let getHoursTime = (utctime) => {
  let date = new Date(utctime)
  let h = date.getHours()
  let m = date.getMinutes()
    // 修改时间样式
  if (h >= 0 && h <= 9) {
    h = '0' + h
  }
  if (m >= 0 && m <= 9) {
    m = '0' + m
  }
  return h + ':' + m
}

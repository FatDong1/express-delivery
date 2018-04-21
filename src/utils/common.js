/**
 * 时间戳转换时间格式
 *
 * @param {number} timestamp 时间戳
 * @param {string} [format='yy-MM-dd h:m:s'] 时间格式: yy(年份), MM(月份), dd(日期), h(小时), m(分), s(秒)
 * @returns {string} format
 */
function convertTimestamp (timestamp, format = 'yyyy-MM-dd hh:mm:ss') {
  let date = new Date(timestamp)

  let object = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  object['M+'] = object['M+'] > 9 ? '' + object['M+'] : '0' + object['M+']
  object['d+'] = object['d+'] > 9 ? '' + object['d+'] : '0' + object['d+']
  object['h+'] = object['h+'] > 9 ? '' + object['h+'] : '0' + object['h+']
  object['m+'] = object['m+'] > 9 ? '' + object['m+'] : '0' + object['m+']
  object['s+'] = object['s+'] > 9 ? '' + object['s+'] : '0' + object['s+']

  for (let key in object) {
    if (new RegExp('(' + key + ')').test(format)) {
      format = format.replace(RegExp.$1, object[key])
    }
  }

  return format
}

export {
  convertTimestamp
}
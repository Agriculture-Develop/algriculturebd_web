import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
export const formatTime = (apiTime) => {
  return dayjs(apiTime).format('YYYY年MM月DD日')
}

export const relTime = (strDate) => {
  // 实现获取相对时间逻辑  中文格式  相对时间-距离现在 strDate-字符串格式转时间格式
  return dayjs().locale('zh-cn').from(strDate)
}

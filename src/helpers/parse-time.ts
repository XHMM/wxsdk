import { parse as parseDate } from 'date-fns'

// 微信支付的回调通知里的time不是正常玩意儿...
// 醉了，支付结果通知和退款回调通知的时间返回的格式不一样啊，
// 支付通知返回的是 20141030133525
// 退款通知返回的是 2020-10-09 15:31:53
export function parseWXCallbackBodyTime(time: string) {
  let date = parseDate(time, 'yyyyMMddHHmmss', new Date())
  if (date.toString() === 'Invalid Date') {
    date = parseDate(time, 'yyyy-MM-dd HH:mm:ss', new Date())
  }
  if (date.toString() === 'Invalid Date') {
    throw new Error(`未知的date格式：${time}`)
  }
  return date
}

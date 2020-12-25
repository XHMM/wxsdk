import nodeFetch from 'node-fetch'

import { WXResponseBase } from '../types'

// https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Service_Center_messages.html#7
// 客服消息回复中的msgtype字段
// 空消息检测不会消耗20条次数，但是否消耗客服接口次数还不清楚
export type ServiceMessageReplyType =
  | 'text'
  | 'image'
  | 'voice'
  | 'video'
  | 'music'
  | 'news'
  | 'mpnews'
  | 'msgmenu'
  | 'wxcard'
  | 'miniprogrampage'

// 目前处理了text,voice类型声明
export async function wxSendServiceMessage(
  accessToken: string,
  openid: string,
  type: 'text',
  content: string
): Promise<WXResponseBase>
export async function wxSendServiceMessage(
  accessToken: string,
  openid: string,
  type: 'voice',
  mediaId: string
): Promise<WXResponseBase>
export async function wxSendServiceMessage(
  accessToken: string,
  openid: string,
  type: ServiceMessageReplyType,
  content: any
): Promise<WXResponseBase> {
  const url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${accessToken}`

  let data = content
  // 发送''用户无法接受到，发送'   '用户时候接收到一个空格消息的
  if (type === 'text')
    data = {
      content: content,
    }
  if (type === 'voice') {
    data = {
      media_id: content,
    }
  }

  // mock
  if (process.env.MOCK_WX === 'yes') {
    console.log('wx客服消息接口mock中..')
    return {
      errcode: 0,
      errmsg: 'mock接口ing',
    }
  }

  return await nodeFetch(url, {
    method: 'POST',
    body: JSON.stringify({
      touser: openid,
      msgtype: type,
      [type]: data,
    }),
  })
    .then((res) => res.json())
    .catch((err) => {
      throw err
    })
}

// https://developers.weixin.qq.com/doc/offiaccount/Message_Management/API_Call_Limits.html
// 接口清零
export async function wxResetAPICallLimit(
  accessToken: string,
  appid: string
): Promise<WXResponseBase> {
  const url = `https://api.weixin.qq.com/cgi-bin/clear_quota?access_token=${accessToken}`
  return await nodeFetch(url, {
    method: 'POST',
    body: JSON.stringify({
      appid,
    }),
  }).then((res) => res.json())
}

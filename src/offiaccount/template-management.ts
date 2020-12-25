import nodeFetch from 'node-fetch'

import { WXResponseBase } from '../types'

// 模板消息
// https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html

interface TemplateMessageBody {
  touser: string
  template_id: string
  url?: string
  miniprogram?: {
    appid: string
    pagepath: string
  }
  data: Record<string, { value: string; color?: string }>
}
interface TemplateMessageReturn extends WXResponseBase {
  msgid?: number
}
// 模板消息发送完毕后，微信服务器会推送一个发送结果的事件，据此判断用户到底接收到没，详见上面文档说明
export async function wxSendTemplateMessage(
  accessToken: string,
  body: TemplateMessageBody
): Promise<TemplateMessageReturn> {
  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`
  const { errcode, errmsg, msgid } = await nodeFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
  }).then((res) => res.json())
  return {
    errcode,
    errmsg,
    msgid,
  }
}

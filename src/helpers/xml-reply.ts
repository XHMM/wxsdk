import { WXResponseMsgType_PassiveReply } from '../types'
import { j2xParser } from 'fast-xml-parser'

// lazy load
let parser: j2xParser | null = null

function getParser() {
  if (parser) return parser
  else {
    parser = new j2xParser({})
    return parser
  }
}

function js2xml(json: Record<string, any>): string {
  return getParser().parse(json)
}

// 仅处理了文本消息的被动回复
export function normalizeForPassiveReply(
  openid: string,
  text: string,
  wechatid = process.env.WECHATID
): string {
  if (!wechatid)
    throw new Error('未从process.env中找到WECHATID值, 请手动提供微信公众号ID')
  const r = {
    xml: {
      ToUserName: openid,
      FromUserName: wechatid,
      CreateTime: Date.now(),
      MsgType: WXResponseMsgType_PassiveReply.text,
      Content: text,
    },
  }
  return js2xml(r)
}

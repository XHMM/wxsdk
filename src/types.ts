export type WXRequestMsgType =
  // https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html
  // 消息管理-接收普通消息请求中的MsgType字段
  | 'text'
  | 'image'
  | 'voice'
  | 'video'
  | 'shortvideo'
  | 'location'
  | 'link'
  // 事件上报类消息请求中的MsgType值
  | 'event'

export type WXRequestEventType =
  // https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_event_pushes.html
  // 事件推送请求中的Event字段：订阅取消订阅
  | 'subscribe'
  | 'unsubscribe'
  // 事件推送请求中的Event字段：其它类型事件
  | 'SCAN'
  | 'LOCATION'
  // https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Custom_Menu_Push_Events.html
  // 事件推送请求中的Event字段：自定义菜单相关
  | 'CLICK'
  | 'VIEW'
  | 'scancode_push'
  | 'scancode_waitmsg'
  | 'pic_sysphoto'
  | 'pic_photo_or_album'
  | 'pic_weixin'
  | 'location_select'
  | 'view_miniprogram'
  // https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html
  // 模板消息发送完成后会推送该event
  | 'TEMPLATESENDJOBFINISH'

// https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html
// 被动回复用户消息时响应中Response的MsgType字段
export enum WXResponseMsgType_PassiveReply {
  text = 'text',
  image = 'image',
  voice = 'voice',
  music = 'music',
  news = 'news',
}

export interface WXResponseBase {
  errcode: number
  errmsg: string
}

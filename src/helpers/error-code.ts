export enum WXErrorCode {
  OK = 0,

  // empty content hint: [GE05611295] 发送的文本消息是空，比如''
  EmptyContentSent = 44004,

  // response out of time limit or subscription is canceled 用户没有和公众号交互(48小时内)导致无法主动发送客服消息
  UserIsNotActive = 45015,
  // out of response count limit hint 给用户发送的消息超出了20条，你必须要等用户和你产生交互(点菜单or发消息)才能继续发
  MessageOverSent = 45047,
  // content size out of limit 消息内容过长
  MessageSizeOutOfLimit = 45002,
  // 接口调用上限 reach max api daily quota
  APIOutOfLimit = 45009,

  // 用户未关注，消息发送失败
  NotSubscribe = 43004,

  // invalid credential, access_token is invalid or not latest hints: [W.DFKi0gE-QzZaKA!] 这个报错原因网上也无很准确的结果。我碰到这个的问题感觉是停用服务器又启用导致的？重新获取下token就行了，所以这个码全当过期导致的来处理吧
  AccessTokenInvalid = 40001,
  // access_token超时，也就是过期了
  AccessTokenExpire = 42001,

  // code been used   导致改问题一般是由于用户刷新页面造成本该是用过让微信来跳转打开的页面被直接打开了，从而没有附带一个新的code，而是使用了上次的code
  CodeIsUsed = 40163,
  // invalid code 无效code或是 过期code(用过的code过期后也会返回此值)
  CodeIsInvalid = 40029,

  // invalid openid hint: [hYYziA05895658]
  InvalidOpenid = 40003,

  // require remove blacklist hint: [eCjJoa05408653]  给该用户发客服消息时，由于该用户被在微信后台里被拉入了黑名单，所以接收不到消息
  UserInBlacklist = 43019,

  // 下面的码是在公众号被封后触发的，目前未做啥处理
  // 50002, errmsg is user limited hints: [eIEAjawgE-5!]
  // 48004, errmsg is api forbidden for irregularities, view detail on mp.weixin.qq.com hints: [eIEADXyMe-CjdXfA!]
}

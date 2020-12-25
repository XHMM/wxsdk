import nodeFetch from 'node-fetch'
import { WXResponseBase } from '../types'

interface CodeToAccessTokenReturn extends WXResponseBase {
  access_token: string
  expires_in: number // 秒
  refresh_token: string
  openid: string
  scope: string
}
// 网页授权中，使用code获取accessToken，从而获取用户信息
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
export async function wxCodeToAccessToken(
  appid: string,
  secret: string,
  code: string
): Promise<CodeToAccessTokenReturn> {
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
  const json = await nodeFetch(url).then((res) => res.json())
  return {
    errcode: json.errcode || 0,
    errmsg: json.errmsg || '',
    ...json,
  }
}

import nodeFetch from 'node-fetch'
import { WXResponseBase } from '../types'

// https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
interface RequestAccessTokenReturn extends WXResponseBase {
  access_token: string
  expires_in: number // 秒
}
export async function wxRequestAccessToken(
  appid: string,
  appsecret: string
): Promise<RequestAccessTokenReturn> {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${appsecret}`
  const { access_token, expires_in, errcode, errmsg } = await nodeFetch(
    url
  ).then((res) => res.json())
  return {
    access_token,
    expires_in,
    errcode: errcode ?? 0, // 文档说的是0表示请求成功，但实际上请求成功后errcode和errmsg都是undefined
    errmsg: errmsg ?? '',
  }
}

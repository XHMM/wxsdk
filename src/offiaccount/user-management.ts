import nodeFetch from 'node-fetch'

import { WXResponseBase } from '../types'

interface RequestUserInfoResponse extends WXResponseBase {
  subscribe: 1 | 0 // 为0时无法拉取到其余信息

  openid: string
  nickname: string // 用户的昵称，非微信号
  sex: 1 | 2 | 0
  city: string
  country: string
  province: string
  language: string
  headimgurl: string
  subscribe_time: number
  unionid?: string
  remark: string
  groupid: number
  tagid_list: number[]
  subscribe_scene:
    | 'ADD_SCENE_SEARCH'
    | 'ADD_SCENE_ACCOUNT_MIGRATION'
    | 'ADD_SCENE_PROFILE_CARD'
    | 'ADD_SCENE_QR_CODE'
    | 'ADD_SCENE_PROFILE_LINK'
    | 'ADD_SCENE_PROFILE_ITEM'
    | 'ADD_SCENE_PAID'
    | 'ADD_SCENE_OTHERS'
  qr_scene: number
  qr_scene_str: string
}

// https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
// 若用户取关了，在openid正确的前提下，该函数仍会返回errcode:0
export async function wxRequestUserInfo(
  accessToken: string,
  openid: string
): Promise<RequestUserInfoResponse> {
  const url = `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${accessToken}&openid=${openid}&lang=zh_CN`
  const response = await nodeFetch(url, {
    method: 'GET',
    timeout: 4000,
  }).then((res) => res.json())

  return {
    // 该接口调用成功后不会包含errcode和errmsg字段，所有为了封装完整性只能手动处理
    ...response,
    errcode: response.errcode ?? 0,
    errmsg: response.errmsg ?? '',
  }
}

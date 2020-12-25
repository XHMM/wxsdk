import nodeFetch from 'node-fetch'
import { WXResponseBase } from '../types'

// https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
interface RequestCreateMenuReturn extends WXResponseBase {}
export async function wxRequestCreateMenu(
  accessToken: string,
  menu: any
): Promise<RequestCreateMenuReturn> {
  const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${accessToken}`
  const { errcode, errmsg } = await nodeFetch(url, {
    method: 'POST',
    body: JSON.stringify(menu),
  }).then((res) => res.json())
  return {
    errcode,
    errmsg,
  }
}

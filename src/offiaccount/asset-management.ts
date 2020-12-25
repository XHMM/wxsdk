import { Readable } from 'stream'
import nodeFetch from 'node-fetch'
import { WXResponseBase } from '../types'

type GetTemporaryAssetReturn = Readable | WXResponseBase

export async function wxGetTemporaryAsset(
  accessToken: string,
  mediaId: string
): Promise<GetTemporaryAssetReturn> {
  const url = `https://api.weixin.qq.com/cgi-bin/media/get?access_token=${accessToken}&media_id=${mediaId}`
  const response = await nodeFetch(url)
  const type = response.headers.get('content-type')
  if (type === 'application/json') return await response.json()
  else return response.body as Readable
}

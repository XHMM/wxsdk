// 参数二token是配置面板里自己的令牌token值
import { createHash } from 'crypto'

export function verifyWeChatGetRequest(
  query: { [key: string]: any },
  token: string
): boolean {
  if (
    !['signature', 'echostr', 'timestamp', 'nonce'].every((i) =>
      Object.keys(query).includes(i)
    )
  ) {
    return false
  }
  const str = [token, query.timestamp, query.nonce].sort().join('')
  const hash = createHash('sha1').update(str).digest('hex')
  return query.signature === hash
}

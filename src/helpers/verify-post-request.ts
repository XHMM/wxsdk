import { createHash } from 'crypto'

export function verifyWeChatPostRequest(
  query: { [key: string]: any },
  bodyEncrypt: string,
  token: string
) {
  if (
    ![
      'signature',
      'timestamp',
      'nonce',
      'openid',
      'encrypt_type',
      'msg_signature',
    ].every((i) => Object.keys(query).includes(i))
  ) {
    return false
  }

  const str = [token, query.timestamp, query.nonce, bodyEncrypt].sort().join('')
  const hash = createHash('sha1').update(str).digest('hex')
  return query.msg_signature === hash
} /*
// 解密消息待做 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Message_Encryption/Technical_Plan.html
export function decryptWeChatPostRequest(encrypt: string, key:string) {
  const base64Decoded = Buffer.from(encrypt, 'base64').toString('hex')
  const decipher = createDecipheriv('aes-256-cbc', key, null)
  const hash = decipher.update(base64Decoded, 'hex', 'utf8') + decipher.final();
}*/

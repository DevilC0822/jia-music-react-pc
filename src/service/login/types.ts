export interface ILoginByPhone {
  phone: number
  countrycode?: number // 国家码，用于国外手机号登录，例如美国传入：1
  password?: string
  md5_password?: string // md5 加密后的密码,传入后 password 参数将失效
  captcha?: number // 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效
}

export interface ILoginByEmail {
  email: string
  password?: string
  md5_password?: string
}
export interface IGetQRCode {
  key: number
  qrimg?: boolean
}
// 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export interface ICheckQRCode {
  key: string
}
export interface ISentCaptcha {
  phone: number
}
export interface IVerifyCaptcha {
  phone: number
  captcha: number
}



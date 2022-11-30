import service from '@/service'
import type * as T from './types'

// 获取登录状态
const getLoginStatus = () => {
  return service.post('/login/status')
}

const loginByPhone = (params: T.ILoginByPhone) => {
  return service.post('/login/cellphone', params)
}
const loginByEmail = (params: T.ILoginByEmail) => {
  return service.post('/login', params)
}

const getQRKey = () => {
  return service.post('/login/qr/key')
}
const getQRCode = (params: T.IGetQRCode) => {
  return service.post('/login/qr/create', params)
}
const QRCodeCheck = (params: T.ICheckQRCode) => {
  return service.post('/login/qr/check', params)
}

// 验证码
const sentCaptcha = (params: T.ISentCaptcha) => {
  return service.post('/captcha/sent', params)
}
const verifyCaptcha = (params: T.IVerifyCaptcha) => {
  return service.post('/captcha/verify', params)
}

const logout = () => {
  return service.post('/logout')
}

export default {
  getLoginStatus,
  loginByPhone,
  loginByEmail,
  getQRKey,
  getQRCode,
  QRCodeCheck,
  sentCaptcha,
  verifyCaptcha,
  logout,
}

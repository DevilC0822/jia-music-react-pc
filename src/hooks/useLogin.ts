import { useState } from 'react'
import loginApi from '@/service/login'
import md5 from 'blueimp-md5'

const useLogin = () => {
  const [loginStatus, setLoginStatus] = useState(false)
  // 更新登录状态
  const updateLoginStatus = () => {
    loginApi.getLoginStatus().then(res => {
      if (res.data.profile) {
        window.localStorage.setItem('profile', JSON.stringify(res.data.profile))
        setLoginStatus(true)
      } else {
        window.localStorage.removeItem('profile')
        setLoginStatus(false)
      }
    })
  }

  const phonePasswordLogin = (phone: number, password: string) => {
    const md5Password = md5(password)
    return new Promise(resolve => {
      loginApi
        .loginByPhone({
          phone,
          md5_password: md5Password,
        })
        .then(res => {
          if (res.profile) {
            // updateLoginStatus()
            location.reload()
            resolve({
              data: true,
              msg: '',
            })
          }
          resolve({
            data: false,
            msg: res.message,
          })
        })
    })
  }

  const emailPasswordLogin = (email: string, password: string) => {
    const md5Password = md5(password)
    return new Promise(resolve => {
      loginApi
        .loginByEmail({
          email,
          md5_password: md5Password,
        })
        .then(res => {
          if (res.cookie) {
            // updateLoginStatus()
            location.reload()
            setLoginStatus(true)
            resolve({
              data: true,
              msg: '',
            })
          }
          resolve({
            data: false,
            msg: res.message,
          })
        })
    })
  }

  const sentCaptcha = (phone: number) => {
    return new Promise(resolve => {
      loginApi
        .sentCaptcha({
          phone,
        })
        .then(res => {
          if (!res.data) {
            resolve({
              data: false,
              msg: res.message,
            })
          }
          resolve({
            data: true,
            msg: '',
          })
        })
    })
  }

  const captchaLogin = (phone: number, captcha: number) => {
    return new Promise(async resolve => {
      const verifyRes = await loginApi.verifyCaptcha({
        phone,
        captcha,
      })
      if (!verifyRes.data) {
        resolve({
          data: false,
          msg: verifyRes.message,
        })
        return
      }
      const loginRes = await loginApi.loginByPhone({
        phone,
        captcha,
      })
      if (loginRes.profile) {
        // updateLoginStatus()
        location.reload()
        resolve({
          data: true,
          msg: '',
        })
      }
      resolve({
        data: false,
        msg: loginRes.message,
      })
    })
  }

  const getQRCode = async () => {
    const qrKeyRes = await loginApi.getQRKey()
    const qrImgRes = await loginApi.getQRCode({
      key: qrKeyRes.data.unikey,
      qrimg: true,
    })
    return new Promise(resolve => {
      resolve({
        qrImg: qrImgRes.data.qrimg,
        qrKey: qrKeyRes.data.unikey,
      })
    })
  }

  const checkQRCode = (qrKey: string) => {
    return new Promise(resolve => {
      loginApi
        .QRCodeCheck({
          key: qrKey,
        })
        .then(res => {
          if (res.code === 803) {
            // updateLoginStatus()
            location.reload()
          }
          resolve(res)
        })
    })
  }

  const logout = () => {
    loginApi.logout().then(() => {
      updateLoginStatus()
    })
  }
  return {
    loginStatus,
    updateLoginStatus,
    phonePasswordLogin,
    emailPasswordLogin,
    sentCaptcha,
    captchaLogin,
    getQRCode,
    checkQRCode,
    logout,
  }
}

export default useLogin

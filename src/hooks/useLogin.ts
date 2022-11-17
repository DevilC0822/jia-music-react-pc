import loginApi from '@/service/login'

const useLogin = () => {
  // 获取歌曲详细信息
  const getLoginStatus = () => {
    return new Promise(resolve => {
      loginApi.getLoginStatus().then(res => {
        if (res.data.profile) {
          window.localStorage.setItem('profile', JSON.stringify(res.data.profile))
          resolve(true)
        } else {
          window.localStorage.removeItem('profile')
          resolve(false)
        }
      })
    })
  }

  const phonePasswordLogin = (phone: number, password: string) => {
    return new Promise(resolve => {
      loginApi
        .loginByPhone({
          phone,
          password,
        })
        .then(res => {
          if (res.profile) {
            resolve(true)
          }
          resolve(false)
        })
    })
  }

  const logout = () => {
    loginApi.logout().then(res => {})
  }
  return {
    getLoginStatus,
    phonePasswordLogin,
    logout,
  }
}

export default useLogin

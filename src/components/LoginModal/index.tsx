import { useEffect, useState, useContext } from 'react'
import { Form, Toast, Modal, Button, Dropdown, ButtonGroup, useFormApi, Image } from '@douyinfe/semi-ui'
import { IconRefresh } from '@douyinfe/semi-icons'
import useLogin from '@/hooks/useLogin'
import { UserContext } from '@/layout'

interface ILoginVal {
  phone?: number
  password?: string
  email?: string
  captcha?: number
}

interface IProps {
  loginModalVisible: boolean
  setLoginModalVisible: Function
}

const LoginModal = (Props: IProps) => {
  const { phonePasswordLogin, emailPasswordLogin, sentCaptcha, captchaLogin, getQRCode, checkQRCode } = useLogin()
  const { loginModalVisible, setLoginModalVisible } = Props
  const [loginMethod, setLoginMethod] = useState(0)
  const [qrCode, setQRCode] = useState('')
  const [isScanCode, setIsScanCode] = useState(false)

  const phonePasswordLoginBtnClick = async (values: ILoginVal) => {
    if (!values.phone) {
      Toast.error('请输入手机号')
      return
    }
    if (!values.password) {
      Toast.error('请输入密码')
      return
    }
    const res: any = await phonePasswordLogin(values.phone, values.password)
    if (!res.data) {
      Toast.error(res.msg)
    }
    Toast.success('登录成功')
    setLoginModalVisible(false)
  }
  const emailPasswordBtnClick = async (values: ILoginVal) => {
    if (!values.email) {
      Toast.error('请输入邮箱')
      return
    }
    if (!values.password) {
      Toast.error('请输入密码')
      return
    }
    const res: any = await emailPasswordLogin(values.email, values.password)
    if (!res.data) {
      Toast.error(res.msg)
      return
    }
    Toast.success('登录成功')
    setLoginModalVisible(false)
  }

  const captchaBtnClick = async (values: ILoginVal) => {
    if (!values.phone) {
      Toast.error('请输入手机号')
      return
    }
    if (!values.captcha) {
      Toast.error('请输入验证码')
      return
    }
    const res: any = await captchaLogin(values.phone, values.captcha)
    if (!res.data) {
      Toast.error(res.msg)
      return
    }
    Toast.success('登录成功')
    setLoginModalVisible(false)
  }

  const ComponentUsingFormApi = () => {
    const formApi = useFormApi()

    const sentCaptchaBtnClick = () => {
      const phone = formApi.getValue('phone')
      if (!phone) {
        Toast.error('手机号不能为空')
        return
      }
      sentCaptcha(phone).then((res: any) => {
        if (!res.data) {
          Toast.error(res.msg)
          return
        }
        Toast.success('发送成功')
      })
    }
    return (
      <Button style={{ marginBottom: 12 }} onClick={sentCaptchaBtnClick}>
        发送
      </Button>
    )
  }

  const initQRCode = () => {
    getQRCode().then((res: any) => {
      if (!res.qrImg) {
        Toast.error('二维码获取失败, 请重试')
        return
      }
      setQRCode(res.qrImg)
      const timer = setInterval(async () => {
        const statusRes = await checkQRCode(res.qrKey)
        if ((statusRes as { code: number }).code === 800) {
          Toast.error('二维码已过期, 请重新获取')
          clearInterval(timer)
        }
        if ((statusRes as { code: number }).code === 802) {
          setIsScanCode(true)
        }
        if ((statusRes as { code: number }).code === 803) {
          // 这一步会返回cookie
          clearInterval(timer)
          Toast.success('授权登录成功')
          setLoginModalVisible(false)
        }
      }, 1000)
    })
  }

  useEffect(() => {
    if (loginMethod === 2) {
      initQRCode()
    }
  }, [loginMethod])

  return (
    <>
      <Modal
        title="登录"
        visible={loginModalVisible}
        maskClosable={false}
        onCancel={() => {
          setLoginModalVisible(false)
        }}
        footer={<></>}
      >
        {loginMethod === 0 && (
          <Form onSubmit={phonePasswordLoginBtnClick}>
            <Form.InputNumber
              hideButtons
              field="phone"
              label="手机号"
              style={{ width: '100%' }}
              placeholder="请输入你的手机号"
            ></Form.InputNumber>
            <Form.Input
              mode="password"
              field="password"
              label="密码"
              style={{ width: '100%' }}
              placeholder="输入你的密码"
            ></Form.Input>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(1)
                        }}
                      >
                        邮箱登录
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(2)
                        }}
                      >
                        二维码登录
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(3)
                        }}
                      >
                        手机验证码登录
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button
                    theme="borderless"
                    style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}
                  >
                    换种方式登录
                  </Button>
                </Dropdown>
              </p>
              <Button htmlType="submit">登录</Button>
            </div>
          </Form>
        )}
        {loginMethod === 1 && (
          <Form onSubmit={emailPasswordBtnClick}>
            <Form.Input field="email" label="邮箱" style={{ width: '100%' }} placeholder="请输入你的邮箱"></Form.Input>
            <Form.Input
              mode="password"
              field="password"
              label="密码"
              style={{ width: '100%' }}
              placeholder="输入你的密码"
            ></Form.Input>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(0)
                        }}
                      >
                        手机号密码
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(2)
                        }}
                      >
                        二维码登录
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(3)
                        }}
                      >
                        手机验证码登录
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button
                    theme="borderless"
                    style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}
                  >
                    换种方式登录
                  </Button>
                </Dropdown>
              </p>
              <Button htmlType="submit">登录</Button>
            </div>
          </Form>
        )}
        {loginMethod === 2 && (
          <>
            <div style={{ textAlign: 'center' }}>
              <p>打开网易云app 扫码登录</p>
              <Image
                width={200}
                height={200}
                src={qrCode}
                fallback={<IconRefresh style={{ fontSize: 50, cursor: 'pointer' }} onClick={initQRCode} />}
              />
              {isScanCode && <p>已扫码，请授权登录</p>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(0)
                        }}
                      >
                        手机号密码
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(1)
                        }}
                      >
                        邮箱登录
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(3)
                        }}
                      >
                        手机验证码登录
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button
                    theme="borderless"
                    style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}
                  >
                    换种方式登录
                  </Button>
                </Dropdown>
              </p>
            </div>
          </>
        )}
        {loginMethod === 3 && (
          <Form onSubmit={captchaBtnClick}>
            <Form.InputNumber
              hideButtons
              field="phone"
              label="手机号"
              style={{ width: '100%' }}
              placeholder="请输入你的手机号"
            ></Form.InputNumber>
            <ButtonGroup style={{ justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
              <Form.InputNumber
                hideButtons
                field="captcha"
                label="验证码"
                style={{ width: 340 }}
                placeholder="输入验证码"
              ></Form.InputNumber>
              <ComponentUsingFormApi></ComponentUsingFormApi>
            </ButtonGroup>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(0)
                        }}
                      >
                        手机号密码
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(1)
                        }}
                      >
                        邮箱登录
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setLoginMethod(2)
                        }}
                      >
                        二维码登录
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button
                    theme="borderless"
                    style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}
                  >
                    换种方式登录
                  </Button>
                </Dropdown>
              </p>
              <Button htmlType="submit">登录</Button>
            </div>
          </Form>
        )}
      </Modal>
    </>
  )
}
export default LoginModal

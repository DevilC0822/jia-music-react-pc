import { Form, Toast, Modal, Button, Dropdown } from '@douyinfe/semi-ui'
import {useState} from 'react'
import useLogin from '@/hooks/useLogin'

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
  const { phonePasswordLogin } = useLogin()
  const { loginModalVisible, setLoginModalVisible } = Props
  const [loginMethod, setLoginMethod] = useState(0)

  const loginBtnClick = async (values: ILoginVal) => {
    if (!values.phone) {
      Toast.error('请输入手机号')
      return
    }
    if (!values.phone) {
      Toast.error('请输入密码')
      return
    }
    let res
    if (values.phone && values.password) {
      res = await phonePasswordLogin(values.phone, values.password)
    }
    console.log(res)
    if (res) {
      Toast.success('登录成功')
    }
  }
  const handleCancel = () => {
    setLoginModalVisible(false)
  }

  return (
    <>
      <Modal
        title="登录"
        visible={loginModalVisible}
        maskClosable={false}
        onCancel={() => {setLoginModalVisible(false)}}
        footer={<></>}
      >
        {
          loginMethod === 0 && <Form onSubmit={loginBtnClick}>
            <Form.InputNumber hideButtons field='phone' label='手机号' style={{ width: '100%' }} placeholder='请输入你的手机号'></Form.InputNumber>
            <Form.Input mode='password' field='password' label='密码' style={{ width: '100%' }} placeholder='输入你的密码'></Form.Input>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {setLoginMethod(1)}}>邮箱登录</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(2)}}>二维码登录</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(3)}}>手机验证码登录</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}>换种方式登录</Button>
                </Dropdown>
              </p>
              <Button htmlType='submit'>登录</Button>
            </div>
          </Form>
        }
        {
          loginMethod === 1 && <Form onSubmit={loginBtnClick}>
            <Form.Input field='email' label='邮箱' style={{ width: '100%' }} placeholder='请输入你的邮箱'></Form.Input>
            <Form.Input field='password' label='密码' style={{ width: '100%' }} placeholder='输入你的密码'></Form.Input>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {setLoginMethod(0)}}>手机号密码</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(2)}}>二维码登录</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(3)}}>手机验证码登录</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}>换种方式登录</Button>
                </Dropdown>
              </p>
              <Button htmlType='submit'>登录</Button>
            </div>
          </Form>
        }
        {
          loginMethod === 2 && <>
            <>二维码</>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {setLoginMethod(0)}}>手机号密码</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(1)}}>邮箱登录</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(3)}}>手机验证码登录</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}>换种方式登录</Button>
                </Dropdown>
              </p>
            </div>
          </>
        }
        {
          loginMethod === 3 && <Form onSubmit={loginBtnClick}>
            <Form.InputNumber field='phone' label='手机号' style={{ width: '100%' }} placeholder='请输入你的手机号'></Form.InputNumber>
            <Form.Input field='captcha' label='验证码' style={{ width: '100%' }} placeholder='输入验证码'></Form.Input>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>
                <span>Or</span>
                <Dropdown
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {setLoginMethod(0)}}>手机号密码</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(1)}}>邮箱登录</Dropdown.Item>
                      <Dropdown.Item onClick={() => {setLoginMethod(2)}}>二维码登录</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' }}>换种方式登录</Button>
                </Dropdown>
              </p>
              <Button htmlType='submit'>登录</Button>
            </div>
          </Form>
        }
      </Modal>
    </>
  )
}
export default LoginModal

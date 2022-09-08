import React, { Component } from 'react'
import './login.scss'
import { Flex, WhiteSpace, WingBlank, InputItem, Button,Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { api_login } from '../../api/apis'

export default class Login extends Component {
  state = {
    acc:'',
    pwd:'',
    errorText: 'none'
  }
  render() {
    let { acc,pwd,errorText } = this.state
    return (
      <div className="login-container">
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <Flex justify="center">
          {/* 本地图片需要使用require */}
          <img
            src={require('../../assets/imgs/logo.webp')}
            alt=""
            className="login-img"
          />
        </Flex>
        <WhiteSpace size="xl" />
        <WingBlank size='md'>
          <InputItem placeholder="请输入账户" clear value={acc} onChange={(val)=>{
            this.setState({acc:val})
          }}>
            <div
              style={{
                backgroundImage: `url(${require('../../assets/imgs/icon_user.png')})`,
                backgroundSize: 'cover',
                height: '22px',
                width: '22px',
              }}
            />
          </InputItem>
          <WhiteSpace size="xs" />

          <InputItem type="password" placeholder="请输入密码" clear value={pwd} onChange={(val)=>{
            this.setState({pwd:val})
          }}>
            <div
              style={{
                backgroundImage: `url(${require('../../assets/imgs/icon_pwd.png')})`,
                backgroundSize: 'cover',
                height: '22px',
                width: '22px',
              }}
            />
          </InputItem>

          <WhiteSpace size="md" />
            <p style={{display:errorText,color:'#990000'}}>账户名或密码错误！</p>
          <Button className="login-btn" onClick={this.clickLogin}>登录</Button>

          <WhiteSpace size="md" />

          <Flex justify="between">
            <Link to="/reg">前往注册</Link>
            <Link to="/">忘记密码</Link>
          </Flex>

          <Flex justify="center">
          <div className="login-text">登录/注册代表同意网站的用户协议</div>
        </Flex>
        </WingBlank>
      </div>
    )
    
  }

clickLogin = async ()=> {
    let { acc,pwd } = this.state
    let res = await api_login({ acc,pwd })
    sessionStorage.currentAcc = acc
    if(res.data.code === 1 ){
      // 成功
      Toast.success('登录成功，即将跳转首页', 2,()=>{
        window.location.href = '/#/'
      });
    }  else{
      // 失败
      this.setState({
        errorText:''
      })
    }
  }
}

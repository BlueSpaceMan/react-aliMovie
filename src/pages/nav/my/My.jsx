import React, { Component } from 'react'
import {Toast,List  } from 'antd-mobile'
import './My.scss'

export default class My extends Component {
  state={
    list:[{
      id:0,icon:'jf2.png',title:'电影票'
    },
    {id:1,icon:'my-dy.png',title:'小食'},
    {id:2,icon:'lxr.png',title:'演出票',type: 'mb5'},
    {id:3,icon:'jsq.png',title:'优惠券'},
    {id:4,icon:'wdfz.png',title:'发起的讨论',type: 'mb5'},
    {id:5,icon:'jl.png',title:'我的小剧场'},
    {id:6,icon:'my-wd.png',title:'影票查验',type: 'mb5'},
    {id:7,icon:'sz.png',title:'设置'},
  ]
  }
  componentDidMount(){
    if(sessionStorage.currentAcc === ''){
      Toast.info('请先登录', 0)
      window.location.href = '/#/login'
    }
    // console.log(sessionStorage.currentAcc)
  }
  render() {
    return (
      <div className='my-box'>
        {/* 头像 */}
          <div className='userInfo'>
            <img src={require('../../../assets/imgs/icon_head.jpg')} alt="" />
            <p>{sessionStorage.currentAcc}</p>
          </div>

          {/* 功能选项 */}
          <div className='my-list'>
            {this.state.list.map(obj => (
               <List.Item
               thumb={require('../../../assets/imgs/'+obj.icon)}
               arrow="horizontal"
               onClick={() => {}}
               className={obj.type}
               key={obj.id}
             >{obj.title}</List.Item>
          ))
          }
          </div>
      </div>
    )
  }
}

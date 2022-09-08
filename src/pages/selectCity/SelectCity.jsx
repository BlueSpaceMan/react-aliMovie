import React, { Component } from 'react'
import citysJson from '../../json/citys.json'
import './SelectCity.scss'
import BScroll from 'better-scroll'

export default class SelectCity extends Component {
  componentDidMount() {
   this.scroll =  new BScroll('#selectCity-box',{
		click:true,
		tap:true	
	})

  // console.log(this.scroll)
  }

  render() {
    return (
      <div className='selectCity-container'>
        <div id="selectCity-box" className="selectCity-box">
          {/* 固定高度 */}
          <div>
            {/* 渲染热门城市 */}
            <div className="city-title">热门城市</div>
            <div>
              {citysJson.hotCity.map((name) => (
                <div className="city-item" key={name}>
                  {name}
                </div>
              ))}
            </div>

            {/* 渲染所有城市 */}
            {this.getCitys()}
          </div>
        </div>

        {/* 侧边选择栏 */}
        <div className="sliderCity-box">{this.getSlierBar()}</div>
      </div>
    )
  }
  // 获取城市
  getCitys() {
    let array = []
    for (let key in citysJson.allCity) {
      array.push(
        <div key={key} id={key}>
          {/* 标题 */}
          <div className="city-title">{key}</div>
          {/* 对应城市 */}
          <div>
            {citysJson.allCity[key].map((childname, index) => (
              <div className="city-item" key={childname + index}>
                {childname}
              </div>
            ))}
          </div>
        </div>,
      )
    }
    return array
  }
// 获取侧边栏城市首字母
  getSlierBar() {
    let arr = []
    for (let key in citysJson.allCity) {
      arr.push(<div key={'slider' + key} onClick={this.clickCity.bind(this,key)}>{key}</div>)
    }
    return arr
  }
// 点击首字母跳转相应城市
  clickCity(key) {
    console.log('#'+key)
    this.scroll.scrollToElement('#'+key,1000)
  }
}

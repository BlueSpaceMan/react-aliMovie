import React, { Component } from 'react'
import './CinemaList.scss'
import { Flex, WingBlank, Icon } from 'antd-mobile'
import { api_cinemaList } from '../../../api/apis'

export default class CinemaList extends Component {
  state = {
    cityName: '定位中',
    // 影院信息
    cinemaList: [],
  }
  componentDidMount() {
    // 初始化获取城市名
    this.getCityName()

    api_cinemaList().then((res) => {
      // console.log(res)
      this.setState({
        cinemaList: res.data.data
      })
    })

  }
  render() {
    let { cityName, cinemaList } = this.state
    return (
      <div className="cinema-container">
        <Flex justify="between">
          <div className="cityName" onClick={this.clickSelectCity.bind()}>{cityName}▼</div>
          <Icon type="search" size="sm" style={{marginRight:'12px'}}/>
        </Flex>

        {cinemaList.map((data) => (
          <div className="cityCinema-item" key={data.name} onClick={this.clickCinema.bind(this,data)}>
            <WingBlank size="lg">
              <Flex justify="between">
                <h3 className="cityCinema-item-name">{data.name}</h3>
                <div className="cityCinema-item-price">￥{data.price}起</div>
              </Flex>
              <div>{data.address}</div>
              <div className="cityCinema-item-type">{data.type}</div>
            </WingBlank>
          </div>
        ))}
      </div>
    )
  }

  //获取用户所在城市信息
  getCityName() {
    let _this = this
     //实例化城市查询类
     var citysearch = new window.AMap.CitySearch();
     //自动获取用户IP，返回当前城市
     citysearch.getLocalCity(function(status, result) {

         if (status === 'complete' && result.info === 'OK') {
             if (result && result.city && result.bounds) {
                 var cityinfo = result.city;
                //  var citybounds = result.bounds;
                 _this.setState({
                  cityName: cityinfo
              })
                 console.log(cityinfo)
             }
             
         } else {
         
            // console.log(result.info)
         }
     });

}
  // 点击影院跳转相应的影院
  clickCinema(data){
    // 将当前的data数据存储到sessionStorage中
    sessionStorage.cinemaData = JSON.stringify(data)
    // console.log(sessionStorage.cinemaData)
    window.location.href = '/#/cinema'
  }

  // 点击跳转选择城市
  clickSelectCity(){
    window.location.href = '/#/selectcity'

  }
}

import React, { Component } from 'react'
import { Tabs, WhiteSpace, WingBlank, Button, Flex } from 'antd-mobile'
import { api_searchMovieList, SERVER_IP } from '../../../api/apis'
import './HotMovie.scss'

const tabs = [{ title: '正在热映' }, { title: '即将上映' }]
export default class HotMovie extends Component {
  state = {
    // 热映
    hotList: [],
    // 即将上映
    movieList: [],
  }
  async componentDidMount() {
    // let divHeight = document.getElementsByClassName("hotMovieBox").clientHeight;
    // console.log(this.divHeight)
    let res = await api_searchMovieList({ state:1 })
    console.log(res)

    this.setState({
      hotList: res.data.data,
    })
  }

  render() {
    return (
      <div style={{height:'100%',backgroundColor:'#eee'}}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor="#FF2F66"
          tabBarInactiveTextColor="#949494"
          tabBarUnderlineStyle={{ borderColor: '#FF2F66' }}
          onChange={this.changeTab}
          destroyInactiveTab="true"
        >
          {/* 正在热映 */}
          <div className="hotMovieBox" >
            {this.state.hotList.map((obj,index) => (
              <div key={index} style={{backgroundColor:"#fff",marginBottom:'5px'}}>
                <WingBlank size="lg">
                  <WhiteSpace size="sm" />

                  <Flex align="center">
                    <img
                      src={SERVER_IP + obj.image}
                      alt=""
                      style={{ width: 100 }}
                      onClick={this.clickMovieInfo.bind(this,obj.id)}
                    />
                    <div className="movieText">
                      <p>{obj.name}</p>
                      <label>
                        淘票票评分
                        <span style={{ color: '#FFA025' }}>{obj.point}</span>
                      </label>
                      <br />
                      <label>导演：{obj.director}</label>
                      <br />
                      <label>主角：{obj.actors}</label>
                    </div>

                    <Button
                      size="small"
                      inline
                      style={{
                        backgroundColor: '#FF2E62',
                        color: '#FFF',
                        fontSize: '14px',
                       
                      }}
                    >
                      购票
                    </Button>
                  </Flex>
                  <WhiteSpace size="sm" />
                </WingBlank>
              </div>
            ))}
          </div>
          {/* 即将上映 */}
          <div className="movieBox">
            {this.state.movieList.map((obj,index) => (
              <div key={index} style={{backgroundColor:"#fff",marginBottom:'5px'}}>
                <WingBlank size="lg">
                  <WhiteSpace size="sm" />

                  <Flex align="center">
                    <img
                      src={SERVER_IP + obj.image}
                      alt=""
                      style={{ width: 100 }}
                    />
                    <div className="movieText">
                      <p>{obj.name}</p>
                      <label>
                        类型：
                        <span style={{ color: '#FFA025' }}>{obj.type}</span>
                      </label>
                      <br />
                      <label>导演：{obj.director}</label>
                      <br />
                      <label>主角：{obj.actors}</label>
                    </div>

                    <Button
                      size="small"
                      inline
                      style={{
                        backgroundColor: '#FF2E62',
                        color: '#FFF',
                        fontSize: '14px',
                        marginRight: '10px'
                      }}
                    >
                      预约
                    </Button>
                  </Flex>
                  <WhiteSpace size="sm" />
                </WingBlank>
              </div>
            ))}
              
          </div>
        </Tabs>
      </div>
    )
  }

  changeTab = async (tab,index) => {
    if (index === 1) { 

      let res = await api_searchMovieList({ state:2 })
      console.log(res)
      this.setState({
        movieList: res.data.data
    })
    }
  }

  clickMovieInfo(movieid){
    sessionStorage.movieid = movieid
    window.location.href = '/#/movieInfo'
  }
}

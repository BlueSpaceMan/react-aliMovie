import React, { Component } from 'react'
import { WingBlank, NoticeBar,Button } from 'antd-mobile'
import './Cinema.scss'
import { api_cinemaMovieInfo, api_cinemaInfo, SERVER_IP } from '../../api/apis'
import { getHoursTime } from '../../utils/utils'

export default class Cinema extends Component {
  state = {
    // 影院数据
    cinemaData: {},
    // 当前影院的电影数据
    movieList: [],
    // 当前点击的电影信息
    currentMovie: [],

    // 当前影院排片信息（修改后的数据）
    changeCinemaMovieList: [],
    // 具体时间的排片信息
    cinemaMovieChildList: []
  }
  componentDidMount() {
    let cinemaData = JSON.parse(sessionStorage.cinemaData)
    
    api_cinemaInfo({ cid: cinemaData.cid }).then((res) => {
      this.setState({
        movieList: res.data.data,
        cinemaData,
        currentMovie: res.data.data[0],
      })
    })
  }
  render() {
    let {
      cinemaData,
      movieList,
      currentMovie,
      changeCinemaMovieList,
      cinemaMovieChildList
    } = this.state
    return (
      <div className="cinema-info">
        {/* 影院详情 */}
        <div className="cinema-item" key={cinemaData.name}>
          <NoticeBar
            marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}
          >
            {cinemaData.name + cinemaData.address + cinemaData.type}
          </NoticeBar>
          <WingBlank size="lg">
            <h3 style={{ fontSize: '16px' }}>{cinemaData.name}</h3>

            <div>{cinemaData.address}</div>
            <div style={{ color: '#C6C6C6', padding: '8px 0' }}>
              {cinemaData.type}
            </div>
          </WingBlank>
        </div>

        {/* 影院在线电影 */}
        <div className="movie-box">
          {movieList.map((data) => (
            <img
              alt=""
              src={SERVER_IP + data.image}
              onClick={this.clickMovieImg.bind(this, data)}
              style={{
                marginRight: '10px',
                height: data.name === currentMovie.name ? '180px' : '160px',
                width: data.name === currentMovie.name ? '180px' : '160px',
              }}
              key={data.image}
            ></img>
          ))}
        </div>

        {/* 影片信息 */}
        <div className="movie-text">
          {/* 标题、评分 */}
          <div className="movie-text-title-box">
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '16px',
                marginRight: '8px',
              }}
            >
              {currentMovie.name}
            </span>
            <span style={{ color: '#C6C6C6', fontSize: '12px' }}>评分：</span>
            <span style={{ color: '#FFA025', fontSize: '16px' }}>
              {currentMovie.point}
            </span>
          </div>
          {/* 时长、类型 */}
          <div className="movie-text-time-box">
            <span>{currentMovie.time}分钟 /</span>
            <span>{currentMovie.type}/</span>
            <span>{currentMovie.actors}</span>
          </div>
        </div>

        {/* 选择时间 */}
        <div className="choose-time-box">
          {changeCinemaMovieList.map((movieObj) => (
            <div
              style={{ width: '20%'}}
              onClick={this.clickChangeDate.bind(this, movieObj.child)}
              
              key={movieObj.movieDate}
            >
              <WingBlank size='lg'>
              <p style={{fontSize:'16px'}}>{movieObj.movieDate}</p>
              <p>{movieObj.isToday ? '今日' : ''}</p>
              </WingBlank>
            </div>
          ))}
        </div>

        {/* 渲染对应的场次信息 */}
        <div className='session-info'>
          {cinemaMovieChildList.map((obj) => (
            <div className='session-info-item' key={obj.id}>
              <div style={{width:'25%'}}>
                <p style={{ fontSize:'20px',fontWeight:'bold' }}>{getHoursTime(obj.starttime)}</p>
                <p style={{color:'#C6C6C6',fontSize:'16px'}}>{getHoursTime(obj.endtime)}散场</p>

              </div>
              <div style={{color:'#666',width:'25%'}}>
                <p>{obj.name}</p>
                <p>{obj.type}</p>
              </div>
              <p style={{color:'#FF2F66',fontSize:'20px',fontWeight:'bold',width:'25%'}}>￥{obj.price}</p>
              <Button
                      size="small"
                      inline
                      onClick={this.clickBuyTicket.bind(this,obj)}
                      style={{
                        backgroundColor: '#FFF',
                        color: '#FF2E62',
                        fontSize: '14px',
                        marginRight: '10px',
                        borderRadius:'15%',
                        border:'1px solid #FF2E62'
                      }}
                    >
                      购票
                    </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }
  // 点击电影图片
  clickMovieImg(data) {
    api_cinemaMovieInfo({
      cid: this.state.cinemaData.cid,
      mid: data.id,
    }).then((res) => {
      let cinemaMovieList = res.data.data
      // 定义新的数组，存放所有日期数据
      let arr = []
      // 定义日期数组，用于去重
      let dateArr = []
      // 定义当前时间
      let currentDate = new Date()

      // 复杂数组去重，获取排片日期
      for (let obj of cinemaMovieList) {
        // 定义转换时间
        let startDate = new Date(obj.starttime)
        // 定义电影开始时间
        let movieDate = startDate.getMonth() + 1 + '-' + startDate.getDate()
        if (!dateArr.includes(movieDate)) {
          // 数组去重
          arr.push({
            movieDate,
            isToday:
              currentDate.getMonth() === startDate.getMonth &&
              currentDate.getDate() === startDate.getDate(),
            child: [],
          })
          dateArr.push(movieDate)
        }
      }

      // 将数据放入对应的日期数据中
      for (let item of cinemaMovieList) {
        let startDate = new Date(item.starttime)
        // 获取当前电影的放映时间
        let currentMovieTime =
          startDate.getMonth() + 1 + '-' + startDate.getDate()

        for (let objArr of arr) {
          // 循环检测，如果月、日都相等，则放入arr数组中
          if (objArr.movieDate === currentMovieTime) {
            objArr.child.push(item)
            break
          }
          // console.log(arr)
        }
      }

      this.setState({
        changeCinemaMovieList: arr,
      })
    })
    // console.log('change:'+this.state.changeCinemaMovieList)

    this.setState({
      currentMovie: data,
    })
    // console.log(data)
  }

  // 点击日期更换具体信息
  clickChangeDate(childarr) {
    this.setState({
      cinemaMovieChildList: childarr,
    })
    // console.log(this.cinemaMovieChildList)
  }

  // 点击购票
  clickBuyTicket(obj){
    sessionStorage.currentMovieData = JSON.stringify(obj)
    // console.log(sessionStorage.currentMovieData)
    window.location.href = '/#/seats'
  }
}

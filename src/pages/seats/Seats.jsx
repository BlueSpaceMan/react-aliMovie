import React, { Component } from 'react'
import { api_getScreenRoomInfo, api_getBuyTicket } from '../../api/apis'
import { Flex, WhiteSpace, Toast, Button,WingBlank } from 'antd-mobile'
import './Seats.scss'
import { getHoursTime } from '../../utils/utils'

export default class Seats extends Component {
  state = {
    // 座位数组
    seats: [],
    // 选中的座位数组
    selectSeats: [],
  }
  async componentDidMount() {
    let buyTicketInfo = JSON.parse(sessionStorage.currentMovieData)
    console.log(buyTicketInfo)

    let res = await api_getScreenRoomInfo({ sid: buyTicketInfo.id })

    console.log(res)
    this.setState({
      seats: res.data.seats,
    })
  }
  render() {
    let { seats, selectSeats } = this.state
    let moiveInfo = JSON.parse(sessionStorage.currentMovieData)
    return (
      <div className="seats-container">
        <Flex justify="center">
          {/* <WhiteSpace size="lg" /> */}
          <img
            src={require('../../assets/imgs/img_seat.png')}
            alt=""
            style={{ margin: '8px' }}
          />
        </Flex>
        <WhiteSpace></WhiteSpace>
        {/* 座位表 */}
        <Flex justify="center">
          <div>{this.getSeats()}</div>
        </Flex>

        {/* 排数 */}
        <div className="rowNum-box">
          {seats.map((arr, index) => (
            <div className="rowNum-item" key={index}>
              {index + 1}
            </div>
          ))}
        </div>

        {/* 选座 */}

        <div
          style={{
            position: 'fixed',
            bottom: 60,
            width: '100vw',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}
        ><WingBlank> <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom:'1px #ccc solid',
          marginBottom:5
        }}
      >

        <h3>{moiveInfo.name + '      ' + moiveInfo.type}</h3>
        {
          <span style={{ color: '#FF2E62' }}>
            {getHoursTime(moiveInfo.starttime)}-
            {getHoursTime(moiveInfo.endtime)}
          </span>
        }
      </div>
      <div style={{ display: 'flex',flexWrap:'wrap' }}>
        {selectSeats.map((obj) => (
          <div key={obj.rowIndex} style={{ margin: 8,color:'#C6C6C6',fontSize:14 }}>
            {obj.rowIndex + 1}排{obj.colIndex + 1}座
          </div>
        ))}
      </div></WingBlank>

         
        </div>
        {/* 购票 */}
        {/* <WingBlank size='lg'>  */}
        <Button
          onClick={this.clickBuyBtn.bind(this)}
          style={{
            backgroundColor: '#FF2E62',
            color: '#FFF',
            position: 'fixed',
            bottom: 0,
            width: '100%',
          }}
        >
          购买
        </Button>
        {/* </WingBlank> */}
      </div>
    )
  }

  // 获取座位数组
  getSeats() {
    let { seats } = this.state
    let arr = []
    // 定义行的索引
    let rowIndex = 0
    for (let rowArr of seats) {
      arr.push(
        <div style={{ display: 'flex' }} key={arr.length}>
          {rowArr.map((obj,index) => {
            if (obj.seat === 1)
              return obj.buy === 1 ? (
                <img
                  key={obj.id}
                  alt=""
                  src={require('../../assets/imgs/icon_2.png')}
                  style={{ width: 30, height: 30 }}
                  onClick={this.clickBoughtTicket.bind(
                    this,
                    obj.userSelect,
                    rowIndex,
                    index,
                    obj.id,
                  )}
                ></img>
              ) : (
                <img
                  key={obj.id + index + obj.buy + obj.seat}
                  alt=""
                  src={require('../../assets/imgs/icon_1.png')}
                  style={{ width: 30, height: 30 }}
                  onClick={this.clickSeats.bind(this, rowIndex, index, obj.id)}
                ></img>
              )
            else
              return (
                <div
                  style={{ width: 30, height: 30 }}
                  key={index + obj.id}
                ></div>
              )
          })}
        </div>,
      )
      rowIndex++
      console.log(arr)
    }

    return arr
  }

  // 点击座位,并获取信息
  clickSeats(rowIndex, colIndex, id) {
    let currentSeat = this.state.seats[rowIndex][colIndex]

    // 当前座位的数据对象
    currentSeat.buy = currentSeat.buy === 1 ? 0 : 1
    currentSeat.userSelect = true

    // 增加或者删除
    if (currentSeat.buy === 1) {
      this.setState({
        selectSeats: [...this.state.selectSeats, { rowIndex, colIndex, id }],
      })
    } else {
      this.setState({
        selectSeats: this.state.selectSeats.filter(
          (obj) => !(obj.rowIndex === rowIndex && obj.colIndex === colIndex),
        ),
      })
    }
  }

  // 已购买电影票
  clickBoughtTicket(userSelect, rowIndex, colIndex) {
    if (userSelect) {
      // 手动选择
      this.clickSeats(rowIndex, colIndex)
    } else Toast.info('当前座位已被购买，请换一个', 1)
  }

  clickBuyBtn() {
    let arr = this.state.selectSeats
    if (arr.length === 0) {
      Toast.info('请选择座位！', 1)
      return
    }
    api_getBuyTicket({
      sid: JSON.parse(sessionStorage.currentMovieData).id,
      seatsidarr: arr.map((obj) => obj.id),
    }).then((res) => {
      console.log(res)
    })
  }
}

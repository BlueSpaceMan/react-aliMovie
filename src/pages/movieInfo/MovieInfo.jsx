import React, { Component } from 'react'
import { SERVER_IP, api_getMovieInfo } from '../../api/apis'
import { WhiteSpace, WingBlank, Flex } from 'antd-mobile'
import './MovieInfo.scss'
import { getChinaTime } from '../../utils/utils'

export default class MovieInfo extends Component {
  state = {
    movieInfo: {},
  }

  componentDidMount() {
    api_getMovieInfo({ movieid: sessionStorage.movieid }).then((res) => {
      this.setState({
        movieInfo: res.data.data,
      })
      console.log(res)
    })
  }
  render() {
    let { movieInfo } = this.state
    return (
      <div className="movieInfoBox">
        <video src={movieInfo.video} controls></video>
        <WhiteSpace size="md" />
        <WingBlank size="md">
          <Flex>
            <img
              src={SERVER_IP + movieInfo.image}
              alt=""
              style={{ width: 100, marginRight: '10px' }}
            />
            <div className="movieText">
              <p style={{ fontSize: '18px' }}>{movieInfo.name}</p>
              <span>
                {movieInfo.time}分钟/{movieInfo.type}
              </span>
              <br />
              <span>{getChinaTime(movieInfo.activetime)}上映</span>
              <br />
              <span>导演：{movieInfo.director}</span>
              <br />

              <span>评价：{movieInfo.evaluates}</span>
            </div>
          </Flex>
          <WhiteSpace size="md" />

          <p>简介：</p>
          <label>{movieInfo.info}</label>
          <WhiteSpace size="md" />
        </WingBlank>
      </div>
    )
  }
}

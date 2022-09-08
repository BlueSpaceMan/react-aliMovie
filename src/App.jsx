import React, { Component } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

// 一级页面
import Login from './pages/login/Login.jsx'
import Reg from './pages/reg/Reg.jsx'
import Nav from './pages/nav/Nav.jsx'
import Cinema from './pages/cinema/Cinema.jsx'
import Seats from './pages/seats/Seats.jsx'
import SelectCity from './pages/selectCity/SelectCity.jsx'
import MovieInfo from './pages/movieInfo/MovieInfo.jsx'
import Error404 from './pages/error404/Error404.jsx'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Routes>
            {/* exact精准匹配 */}
            <Route path="/" element={<Nav/>} exact></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/reg" element={<Reg/>}></Route>
            <Route path="/cinema" element={<Cinema/>}></Route>
            <Route path="/seats" element={<Seats/>}></Route>
            <Route path="/selectCity" element={<SelectCity/>}></Route>
            <Route path="/movieInfo" element={<MovieInfo/>}></Route>

            {/* 默认路由（放在最后，没有path的route） */}
            <Route element={<Error404/>}></Route>
          </Routes>
        </HashRouter>
      </div>
    )
  }
}

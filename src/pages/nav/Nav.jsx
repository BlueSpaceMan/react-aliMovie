import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
// 引入二级页面
import HotMovie from './hotMovie/HotMovie.jsx'
import Cinema from './cinemaList/CinemaList.jsx'
import My from './my/My.jsx'


export default class Nav extends Component {
  state = {
    selectedTab: 0,
    list: [
    { id: 0, icon: 'icon_main.png',icon_s:'icon_main_s.png',title: '热映',page: <HotMovie/>},
    { id: 1, icon: 'icon_chat.png',icon_s:'icon_chat_s.png',title: '影院',page: <Cinema/> },
    { id: 2, icon: 'icon_history.png',icon_s:'icon_history_s.png',title: '我的',page: <My/> }],
  }
  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#FF2F66"
          barTintColor="white"
        >
          { this.state.list.map(obj =>  <TabBar.Item
            icon={{
              uri: require('../../assets/imgs/'+ obj.icon),
            }}
            selectedIcon={{
              uri: require('../../assets/imgs/'+ obj.icon_s),
            }}
            title={obj.title}
            key={obj.id}
            selected={this.state.selectedTab === obj.id}
            onPress={() => {
              this.setState({
                selectedTab: obj.id,
              })
            }}
          >
            {obj.page}
          </TabBar.Item>)}
          
        </TabBar>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { View, Button, Text, Image, ScrollView, Navigator } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.styl'
import logo from '../../assets/images/sys/scp.jpg'

export default class Index extends Component {
  state = {
    list: [],
    cursor: 0
  }

  componentDidMount () {
    this.fetch()
  }

  onScrollToLower () {
    if (this.state.cursor === -1) {
      Taro.showToast({
        title: '到底了~',
        icon: 'none'
      })
      return
    }
    this.fetch()
  }

  fetch = () => {
    Taro.showLoading()
    Taro.request({
      url: 'https://golang.wall-e.club/scp/list',
      data: {
        id: this.state.cursor,
        page_size: 20
      },
      success: res => {
        if (res.statusCode === 200) {
          this.setState({
            list: [...this.state.list, ...res.data],
            cursor: res.data.length > 0 ? res.data[res.data.length - 1].id : -1
          })
        }
        Taro.hideLoading()
      }
    })
  }

  bilibiliVideo = id => {
    return { appID: 'wx7564fd5313d24844', path: 'pages/video/video?avid=' + id }
  }

  txVideo = id => {
    return { appID: 'wxa75efa648b60994b', path: 'pages/play/index?vid=' + id }
  }

  getVideo = type => {
    return type === 'tx' ? this.txVideo : this.bilibiliVideo
  }

  getSlogan = () => {
    const k = Math.floor(Math.random() * 10)
    const list = [
      '我们控制，我们收容，我们保护',
      '人类到如今已经繁衍了250000年，只有最近的4000年是有意义的',
      '我们在将近250000年中在干嘛?我们躲在山洞中，围坐在小小的篝火边，畏惧那些我们不懂得的事物',
      '当我们恐惧的事物越来越少，我们开始更理智的看待这个世界',
      '不能解释的事物并没有消失，好像宇宙故意要表现出荒谬与不可思议一样',
      '人类不能再生活在恐惧中',
      '没有东西能保护我们，我们必须保护我们自己',
      '当其他人在阳光下生活时，我们必须在阴影中和它们战斗',
      '防止它们暴露在大众眼中，这样其他人才能生活在一个理智的，普通的世界中',
      '我们称他们为“神”和“恶魔”，并向他们祈求宽恕和祈祷拯救'
    ]

    return list[k]
  }
  
  render () {
    return (
      <ScrollView
        className='scrollview'
        onScrollToLower={this.onScrollToLower.bind(this)}
        lowerThreshold={20}
        scrollY
        scrollWithAnimation
      >
        <View className='logo'><Image mode='widthFix' src={logo} /></View>
        <View className='slogan'><Text>{this.getSlogan()} -- The Administrator</Text></View>

        {this.state.list.map((item, key) => {
          const content = JSON.parse(item.content)
          const { appID, path } = this.getVideo(content.type)(content.id)

          return <Navigator target='miniProgram' key={key} app-id={appID} path={path} open-type='navigate'>
              <View className='card'>
                <View className='card-image'>
                  <Image mode='widthFix' src={content.image} />
                </View>
                <View className='card-title'>{item.name}</View>
                <View className='card-from'>{content.type === 'tx' ? '腾讯视频' : 'bilibili'}</View>
              </View>
            </Navigator>
        })}

        {/* <View className='card'>
          <View className='card-image'>
            <Image mode="widthFix" src='https://puui.qpic.cn/qqvideo_ori/0/z0972qsuce1_496_280/0' />
          </View>
          <View className='card-title'>一个不存在的SCP</View>
        </View>

        <View className='card'>
          <View className='card-image'>
            <Image mode="widthFix" src='https://puui.qpic.cn/qqvideo_ori/0/g3113sdpbys_496_280/0' />
          </View>
          <View className='card-title'>遭遇警笛头</View>
        </View>

        <View className='card'>
          <View className='card-image'>
            <Image mode="widthFix" src='https://puui.qpic.cn/qqvideo_ori/0/n30619f38v0_496_280/0' />
          </View>
          <View className='card-title'>SCP基金会微电影scp173大战sco096</View>
        </View> */}

        <View className='bottom'>
          {this.state.cursor === -1 ? <Text>到底了~</Text> : <Button onClick={this.fetch}>more~</Button>}
        </View>


      </ScrollView>
    )
  }
}

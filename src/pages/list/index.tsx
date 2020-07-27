import React, { Component } from 'react'
import { View, Text, Navigator } from '@tarojs/components'
import './index.styl'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello list</Text>
        {/* <Navigator target='miniProgram' app-id='wx91d27dbf599dff74' path='pages/cate/cate' open-type='navigate'>
   跳转京东
</Navigator>

<Navigator target='miniProgram' app-id='wx7564fd5313d24844' path='pages/video/video?avid=328762934' open-type='navigate'>
   跳转bilibili
</Navigator> */}
      </View>
    )
  }
}

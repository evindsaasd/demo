import Mock from 'mockjs'
import MyInfo from './Myinfo.js'

Mock.mock('/home', 'get', () => {
  return MyInfo.page1
})


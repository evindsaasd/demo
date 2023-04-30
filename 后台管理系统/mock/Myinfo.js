import Mock from 'mockjs'

const page1 = [

  {
    title: Mock.mock('@ctitle()'),
    paragraph: Mock.mock('@cparagraph(50,100)'),
    time: Mock.mock('@now()'),
    img: Mock.mock("@image('200x200', '#50B347', '#FFF', 'Mock.js')")
  },
  {
    title: Mock.mock('@ctitle()'),
    paragraph: Mock.mock('@cparagraph(50,100)'),
    time: Mock.mock('@now()'),
    img: Mock.mock('@image()')
  },
  {
    title: Mock.mock('@ctitle()'),
    paragraph: Mock.mock('@cparagraph(50,100)'),
    time: Mock.mock('@now()'),
    img: Mock.mock('@image()')
  },
  {
    title: Mock.mock('@ctitle()'),
    paragraph: Mock.mock('@cparagraph(50,100)'),
    time: Mock.mock('@now()'),
    img: Mock.mock('@image()')
  },
  {
    title: Mock.mock('@ctitle()'),
    paragraph: Mock.mock('@cparagraph(50,100)'),
    time: Mock.mock('@now()'),
    img: Mock.mock('@image()')
  }

]
const res = {
  page1
}
export default res


import Mock from 'mockjs'
import { config } from 'vue/types/umd'
//get请求从config.url获取参数。post从config.body中获取参数
function param20bj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            number: Mock.Random.number(),
            name: Mock.Random.cname(),
            classify: Mock.Random.classify(),
            descript: Mock.Random.descript(),
            starte: Mock.Random.starte(已上架, 未上架, 已售空),
            total: Mock.Random.total(),
            time: Mock.Random.date()
        })
    )
}

export default {
    /**获取列表
     * 要带参数 name，page，limt；name可以不填，page，limit有默认值。
     * @param name，page，limit
     * @return{{code：number，count：number，data：*[]}}
     */
    getGoodList: config => {
        const { name, page = 1, limit = 10 } = param20bj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
        // const mockList = List.filter(good => {
        //     if (name && good.name.indexOf(name) === -1 && good.number.indexOf(name) === -1) return false
        // })
        // const pageList=mockList.filter((item,index) => index < limit * page && index >= limit*(item,index)); 
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },
    /**
     * 增加商品
     * @param name，number，classify,descript,starte,total,time
     * @return {{code:number,data:{message:string}}}
     */
    createGood: config => {
        const { number, name, classify, descript, starte, total, time } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            number: Mock.Random.number(),
        })
    }
}
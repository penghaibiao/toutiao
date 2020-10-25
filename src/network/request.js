import axios from 'axios'
import store from '@/store'

import JSONbig from 'json-bigint'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://ttapi.research.itcast.cn',
        timeout: 5000,
        transformResponse: [function (data) {
            // Do whatever you want to transform the data
            // console.log(data)

            // 后端返回的数据可能不是 JSON 格式字符串
            // 如果不是的话，那么 JSONbig.parse 调用就会报错
            // 所以我们使用 try-catch 来捕获异常，处理异常的发生
            try {
                // 如果转换成功，则直接把结果返回
                return JSONbig.parse(data)
            } catch (err) {
                console.log('转换失败', err)
                // 如果转换失败了，则进入这里
                // 我们在这里把数据原封不动的直接返回给请求使用
                return data
            }

            // axios 默认在内部使用 JSON.parse 来转换处理原始数据
            // return JSON.parse(data)
        }]
    })
    instance.interceptors.request.use(config => {
        const { user } = store.state
        if (user) {
            config.headers.Authorization = `Bearer ${user.token}`
        }
        return config
    }, err => {
        // console.log(err)
    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })
    //发送真正的网络请求
    return instance(config)
}
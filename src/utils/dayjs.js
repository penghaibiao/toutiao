
import Vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'




import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter("relativeTime", value => {
    return dayjs(value).to(dayjs())
})

Vue.filter("daytime", value => {
    return dayjs(value).format('YYYY-MM-DD HH:mm')
})
dayjs.locale('zh-cn')
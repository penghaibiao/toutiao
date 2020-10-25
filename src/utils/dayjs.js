
import Vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'




import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter("relativeTime", value => {
    return dayjs(value).to(dayjs())
})
dayjs.locale('zh-cn')
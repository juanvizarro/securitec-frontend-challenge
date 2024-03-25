import Antd from 'ant-design-vue'
import STable from '@surely-vue/table'
import type { Plugin } from 'vue'
// import '@surely-vue/table/src/style/antdv.less'
import '@surely-vue/table/dist/index.less'

export default <Plugin>{
    install(app) {
        app.use(Antd)
        app.use(STable)
    },
}
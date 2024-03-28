import Antd from 'ant-design-vue'
import type { Plugin } from 'vue'

export default <Plugin>{
    install(app) {
        app.use(Antd)
    }
}
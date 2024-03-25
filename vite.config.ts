import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    })
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(resolve(__dirname), "src"),
      },
      {
        find: "~bootstrap",
        replacement: "bootstrap",
      },
    ],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", "yaml"],
  },
  css:{
    preprocessorOptions: {
      less: {
        math: 'always',
        relativeUrls: true,
        javascriptEnabled: true
      }
    }
  }
})

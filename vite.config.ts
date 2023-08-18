import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8111/',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src')//设置别名
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      eslintrc: {
        enabled: true
      },
      imports: ["vue", "vue-router", 'pinia'],
      dts: "./auto-import.d.ts",
      resolvers: [ElementPlusResolver(), IconsResolver({ prefix: 'Icon' }),],
    }),
    Components({
      resolvers: [ElementPlusResolver(), IconsResolver({ prefix: 'Icon' }),],
    }),
    Icons({ autoInstall: true }),
  ],
})

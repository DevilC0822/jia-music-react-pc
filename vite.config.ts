import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    https: false,
    proxy: {
      // 正则表达式写法
      '^/api': {
        target: 'http://175.24.198.84:3000/', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
})

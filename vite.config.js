import { defineConfig } from 'vite';
const path = require('path');
// 为vue单文件进行支持
import vue from '@vitejs/plugin-vue';
// 为jsx、tsx语法进行支持
import vueJsx from '@vitejs/plugin-vue-jsx';
// 为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy';
// 系统设置
import { setting } from './src/config/setting';
// 处理svg的方法
import { svgBuilder } from './src/plugin/svgBuilder';
// 坚持动态分析的依赖关系优化，输出为package.json的optimizeDeps
import OptimizationPersist from 'vite-plugin-optimize-persist';
// 从你的package.json vite领域扩展Vite配置
import PkgConfig from 'vite-plugin-package-config';
// vue国际化插件
import vueI18n from '@intlify/vite-plugin-vue-i18n';
// Vue的按需组件自动导入，默认以src/component
import Components from 'unplugin-vue-components/vite';
// 普遍地按需访问数以千计的图标作为组件
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

const {
  base,
  publicDir,
  outDir,
  assetsDir,
  sourcemap,
  cssCodeSplit,
  host,
  port,
  strictPort,
  open,
  brotliSize,
  logLevel,
  clearScreen,
  drop_console,
  drop_debugger,
  chunkSizeWarningLimit,
} = setting;

const isDev = process.env.NODE_ENV === 'development';

const loadI18n = isDev ? vueI18n({ include: path.resolve(__dirname, './src/locales/**') }) : '';
// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base,
  publicDir,
  logLevel,
  clearScreen,
  plugins: [
    vue(),
    vueJsx(),
    PkgConfig(),
    OptimizationPersist(),
    loadI18n,
    legacy({
      // 设置为一个字符串的列表，以明确控制包括哪些polyfills。设置为false以避免生成polyfills并自己处理它。默认值是true
      polyfills: ['es.promise.finally', 'es/map', 'es/set'],
      // 设置为一个字符串列表，以明确控制要包括哪些polyfills
      modernPolyfills: ['es.promise.finally'],
    }),
    Components({
      // 默认是这个文件夹自动导入
      // dirs: ['src/components'],
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          // 注册elementplus的图标，ep是缩写
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    svgBuilder('./src/icons/svg/'),
  ],

  server: {
    host,
    port,
    strictPort,
    open,
    fs: {
      strict: false,
    },
    proxy: {
      // [import.meta.env.VITE_BASE_API]: {
      //   target: `http://192.168.0.222:8081`,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(new RegExp(`^${import.meta.env.VITE_BASE_API}`), ''),
      // },
      '/dev-api': {
        // target: `http://192.168.0.127:8080`,
        // target: `http://192.168.0.222:8081`,
        // target: `http://192.168.0.221:8081`,
        target: `http://192.168.0.221:8087`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      }
    }
  },

  resolve: {
    // 设置别名
    alias: {
      views: path.resolve(__dirname, 'src/views'),
      styles: path.resolve(__dirname, 'src/styles'),
      '@': path.resolve(__dirname, 'src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // 引入全局scss变量
        additionalData: `@use "@/styles/index.scss" as *;`,
        charset: false,
      },
    },
  },

  corePlugins: {
    preflight: false,
  },

  build: {
    target: 'es2015',
    outDir,
    assetsDir,
    sourcemap,
    cssCodeSplit,
    brotliSize,
    // rollupOptions: {
    //   output: {
    //     // chunkFileNames: 'static/js/[name]-[hash].js',
    //     // entryFileNames: 'static/js/[name]-[hash].js',
    //     // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
    //   },
    // },
    minify: 'terser',
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console,
        drop_debugger,
      },
    },
    chunkSizeWarningLimit,
  },

  optimizeDeps: {
    // 检测需要预构建的依赖项
    include: [],
  },
});

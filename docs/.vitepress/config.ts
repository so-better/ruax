import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/ruax/',
  title: 'ruax',
  description: '一个轻量级的Javascript异步数据请求库',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://www.so-better.cn/ico.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no' }]
  ],
  outDir: 'ruax',
  cleanUrls: true,
  themeConfig: {
    logo: {
      src: 'https://www.so-better.cn/logo.png'
    },
    outline: {
      label: '本页目录',
      level: [2, 5]
    },
    nav: [
      { text: '指南', link: '/guide/introduction', activeMatch: '/guide' },
      { text: '反馈', link: 'https://www.so-better.cn/feedback', target: '_blank' },
      { text: '更新日志', link: '/changelog' }
    ],
    sidebar: {
      '/guide': [
        {
          text: '开始使用',
          items: [
            {
              text: '简介',
              link: '/guide/introduction'
            },
            {
              text: '安装',
              link: '/guide/install'
            },
            {
              text: '快速上手',
              link: '/guide/quick-start'
            }
          ]
        },
        {
          text: '配置和方法',
          items: [
            {
              text: '配置属性',
              link: '/guide/attrs'
            },
            {
              text: '请求方法',
              link: '/guide/apis'
            }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/ruax' },
      { icon: 'gitee', link: 'https://gitee.com/so-better/ruax' },
      { icon: 'github', link: 'https://github.com/so-better/ruax' }
    ],
    search: { provider: 'local' },
    lastUpdated: {
      text: '上次更新'
    },
    docFooter: {
      prev: 'Prev',
      next: 'Next'
    },
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchLabel: '主题风格切换',
    sidebarMenuLabel: '菜单目录',
    returnToTopLabel: '返回顶部',
    externalLinkIcon: true
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    theme: {
      dark: 'github-dark',
      light: 'github-light'
    },
    codeCopyButtonTitle: '复制代码'
  },
  vite: {
    server: {
      port: 5405
    }
  }
})

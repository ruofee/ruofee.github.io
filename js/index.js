const vm = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'Ruofee',
      img: 'http://img.ruofee.cn/headImage?imageslim',
      signature: '我逆着光，砥砺前行'
    },
    links: [
      {
        name: '博客',
        src: 'http://www.ruofee.cn'
      },
      {
        name: '知乎',
        src: 'https://www.zhihu.com/people/chen-ruo-feng-e/activities'
      },
      {
        name: 'Github',
        src: 'https://github.com/ruofee'
      }
    ]
  }
});
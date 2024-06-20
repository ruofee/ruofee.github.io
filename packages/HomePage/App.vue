<script lang="ts" setup>
const user = {
  name: 'Ruofee',
  img: 'https://picx.zhimg.com/v2-4c5ca22f5ccae388125dc991956ae1cd_xl.jpg?source=32738c0c',
  signature: '我逆着光，砥砺前行'
}

const links = [
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
</script>

<template>
  <div class="app">
    <div class="content">
      <div class="img-wrap">
        <img class="img" :src="user.img" alt="头像">
      </div>
      <div class="content-user">
        <div class="info">
          <h2 class="name">{{ user.name }}</h2>
          <p class="signature">{{ user.signature }}</p>
        </div>
        <div class="links">
          <div class="link-wrap" v-for="link of links" :key="link.src">
            <a class="link" :href="link.src" target="_blank" rel="noopener noreferrer">{{ link.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    align-items: center;
    padding: 50px 20px;
    width: 500px;
    box-sizing: border-box;
    .img-wrap {
      flex-basis: 150px;
      height: 150px;
      border-radius: 8px;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .content-user {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 0 55px;
      height: 150px;
      box-sizing: border-box;
      .info {
        flex: 1;
        .name {
          margin-bottom: 10px;
        }
        .signature {
          font-size: .8em;
          color: #999;
        }
      }
      .links {
        display: flex;
        .link-wrap {
          margin-left: 10px;
          .link {
            color: #5495d5;
            text-decoration: none;
          }
        }
        .link-wrap:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>

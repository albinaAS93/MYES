<template>
  <header class="main-header">
    <div class="container nav">
      <img alt="MyES logo" class="logo" src="../assets/LogoMyes_145px.png">
      <div class="nav-menu" id="my-nav" v-on:click="myNav()">
        <a href="{{ link.href }}" v-for="(link, i) in menu" :key="i">{{ link.title }}</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
  data () {
    return {
      menu: [
        {
          title: 'obiettivi',
          href: '#'
        },
        {
          title: 'corsi',
          href: '#'
        },
        {
          title: 'scuole',
          href: '#'
        },
        {
          title: 'corporate',
          href: '#'
        },
        {
          title: 'iniziative',
          href: '#'
        },
        {
          title: 'viaggi studio',
          href: '#'
        },
        {
          title: 'login',
          href: '#'
        }
      ]
    }
  },
  props: {
  },
  methods: {
    myNav () {
      const x = document.getElementById('my-nav')
      if (x.className === 'nav-menu') {
        x.className += ' responsive'
      } else {
        x.className = 'nav-menu'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.main-header {
  background-color: rgb(35, 35, 97);
}
.nav {
  display: flex;
  padding: 1.5rem;
  width: 70%;
  justify-content: space-between;
  .nav-menu {
    overflow: hidden;
    a {
      display: inline-block;
      text-transform: uppercase;
      text-decoration: none;
      font-size: 1.5rem;
      color: #FFF;
      padding: 1.5rem 1rem 1rem 1rem;
    }
    a:hover {
      text-decoration: underline;
    }
    .icon {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .nav-menu a:not(:first-child) {display: none;}
    .nav-menu a.icon {
      float: right;
      display: block;
  }
}

  @media screen and (max-width: 600px) {
    .nav-menu.responsive {position: relative;}
    .nav-menu.responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .nav-menu.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
  }
}
</style>

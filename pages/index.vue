<template>
  <div>
    <header class="css-g1d4iy e1k2d9zh0">
      <button class="e1k2d9zh3 css-15nidrm">
        <span
          class="ttfont ttfont-hamburger css-9ynm7a e1oc5ub40"
          aria-label="menu"
        >
          <img :src="require('@/assets/top/bars_24.png')" width="10%" />
        </span>
      </button>
      <title>
        <img :src="require('@/assets/top/EmoMee_logo.png')" width="20%" />
      </title>
    </header>
    <!-- <div>
      <RoomFrame :tiny-model="false" />
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {}
</script>

<style>
button {
  /* position: relative; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* text-align: center; */
}

title {
  /* position: relative; */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* text-align: center; */
}

/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
} */

/* .title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
} */

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

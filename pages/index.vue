<template>
  <div>
    <header class="css-g1d4iy e1k2d9zh0">
      <button class="e1k2d9zh3 css-15nidrm">
        <span aria-label="menu">
          <img :src="require('@/assets/top/bars_24.png')" width="20%%" />
        </span>
      </button>
      <h1>
        <img :src="require('@/assets/top/EmoMee_logo.png')" width="200px" />
      </h1>
    </header>
    <main>
      <div data-content-style="dark" class="css-11apsez eeucsiq6">
        <div class="eeucsiq5 css-1b7y32o e19mb7dd3">
          <video
            class="e19mb7dd0 css-1vd2dbe e1yswsx0"
            playsinline
            autoplay
            loop
            src="@/assets/top/top_movie.mp4"
          ></video>
        </div>
      </div>
    </main>
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
.css-g1d4iy {
  z-index: 100;
  position: fixed;
  left: 24px;
  top: 0;
  width: 100%;
  height: 65px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  color: #fff;
  -webkit-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
  transition-property: background-color, box-shadow, color;
  pointer-events: none;
  margin-top: 8px;
}
.css-15nidrm {
  border-radius: 4px;
  display: inline-block;
  /* padding: 0.75rem 1.125rem; */
  /* font-size: 0.75rem; */
  line-height: 2;
  border: solid 1px transparent;
  color: #fff;
  -webkit-transition: none;
  transition: none;
  position: absolute;
  left: 16px;
  top: 50%;
  margin-top: -28px;
  pointer-events: auto;
}
button {
  -webkit-tap-highlight-color: initial;
}

/* title {
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  text-align: center;
} */
/* main */
.css-11apsez {
  height: 100vh;
}
.css-11apsez {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: calc(100vw * 1.4814);
}
/* video */
.css-1b7y32o {
  position: relative;
  width: 100%;
  height: 100%;
}
.css-1b7y32o video {
  position: absolute;
  top: 23%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
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

<template>
  <div class="font-family">
    <header class="css-g1d4iy">
      <h1>
        <img :src="require('@/assets/top/EmoMee_logo.png')" width="200px" />
      </h1>
      <button
        class="css-15nidrm css-11eqmph hover:bg-black hover:bg-opacity-40"
      >
        <span aria-label="create">
          <nuxt-link to="/create"><h1>create room</h1></nuxt-link>
        </span>
      </button>
    </header>
    <main>
      <div data-content-style="dark" class="css-11apsez">
        <div class="css-1b7y32o">
          <video
            class="css-1vd2dbe"
            playsinline
            autoplay
            loop
            src="@/assets/top/top_movie.mp4"
            type="video/mp4"
            muted
          ></video>
        </div>
      </div>
      <section class="css-1ahkxzr">
        <div data-gatsby-image-wrapper class="gatsby-image-wrapper css-fjkzxp">
          <div aria-hidden="true" style="padding-top: 62.5%"></div>
          <picture>
            <img :src="require('@/assets/top/PCwindow_image.png')" />
          </picture>
        </div>
      </section>
      <section id="about EmoMee">
        <header class="css-1k7gt20 slide">
          <h2 class="css-11pvt2h">--<b>EmoMeeとは</b>--</h2>
          <h3 class="css-1cmp5qk">
            表情を検知し、感情(Emotion)を絵文字(Emoji)で共有できるMeeting用Webアプリケーション
          </h3>
          <p class="css-g79a2p">
            EmoMeeは、「ビデオ通話はちょっと、、」といった【カメラに顔を映したくない】【周りはどんな感情で聞いているのかわからない】などの声にお応えしました！ボイスチャットでの会話が増えた今、声だけでは伝わりにくいニュアンスをカメラをオンをせず、手軽に相手の表情を見ながら会話したいときに「EmoMee」‼
          </p>
        </header>
        <article class="css-1sf2xcr">
          <div class="css-1ezjlpa slide">
            <h2 class="css-11pvt2h"><b>表情伝達</b></h2>
            <h3 class="css-0cmp5qk"><b>POPなアイコンで表情を伝えよう</b></h3>
            <p class="css-g79a2p">
              カメラから表情の検出が行われ、その表情に応じたアイコンがあなたの表情を伝えてくれます。それぞれの表情をアイコンをカスタマイズすることで、あなたらしい表情を使えることができます。
              感情が伝えられることで、<b>コミュニケーションをより円滑に楽しく</b>行うことができます。
            </p>
          </div>
          <div class="css-18ypf3t">
            <div class="css-zxsb69">
              <!-- <a
                class="css-9r1sq9"
                role="button"
                aria-label="replay"
                aria-hidden="true"
              ></a> -->
              <video
                class="css-1vd2dbe"
                src="@/assets/top/top_movie.mp4"
                type="video/mp4"
                playsinline
                autoplay
                muted
              ></video>
            </div>
          </div>
        </article>
        <article class="css-1sf2xcr">
          <div class="css-18ypf4t">
            <div class="css-zxsb69">
              <!-- <a
                class="css-9r1sq9"
                role="button"
                aria-label="replay"
                aria-hidden="true"
              ></a> -->
              <video
                class="css-1vd2dbe"
                src="@/assets/top/top_movie.mp4"
                type="video/mp4"
                playsinline
                autoplay
                muted
              ></video>
            </div>
          </div>
          <div class="css-2ezjlpa slide">
            <h2 class="css-11pvt2h"><b>手軽</b></h2>
            <h3 class="css-2cmp5qk"><b>面倒な手順は不要</b></h3>
            <p class="css-g79a2p">
              EmoMeeはブラウザベースのアプリケーションのため、ダウンロードやインストール、ユーザ認証なしで利用することができます。
              普段のオンラインコミュニケーションからオンライン発表など、様々なオンラインコミュニケーション場面で簡単に使うことができます。
            </p>
          </div>
        </article>
        <article class="css-1sf2xcr">
          <div class="css-1ezjlpa slide">
            <h2 class="css-11pvt2h"><b>連携</b></h2>
            <h3 class="css-0cmp5qk">
              <b>いつものオンラインコミュニケーションツールと共に</b>
            </h3>
            <p class="css-g79a2p">
              日頃のオンラインコミュにきエーションにemotionを追加することができます。
              連帯用のDiscode
              Botが用意されているので、Botを自身のサーバに追加することで、DiscodeでのコミュニケーションにEmotionをプラスすることができます。
            </p>
          </div>
          <div class="css-18ypf3t">
            <div class="css-zxsb69">
              <!-- <a
                class="css-9r1sq9"
                role="button"
                aria-label="replay"
                aria-hidden="true"
              ></a> -->
              <video
                class="css-1vd2dbe"
                src="@/assets/top/top_movie.mp4"
                type="video/mp4"
                playsinline
                autoplay
                muted
              ></video>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style>
.font-family {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
    'Hiragino Sans', '游ゴシック Medium', YuGothic, YuGothicM, 'メイリオ',
    Meiryo, sans-serif;
}
/* header */
.css-g1d4iy {
  z-index: 100;
  position: fixed;
  left: 24px;
  top: 15px;
  width: 100%;
  height: 65px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  color: #fff;
  -webkit-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
  transition-property: background-color, box-shadow, color;
  pointer-events: none;
  margin-top: 8px;
}
/* button */
.css-15nidrm {
  font-size: 20px;
  display: inline-block;
  color: inherit;
  transition: none;
  position: absolute;
  right: 65px;
  top: 50%;
  margin-top: -36px;
  pointer-events: auto;
}
.css-11eqmph {
  border-radius: 4px;
  display: inline-block;
  padding: 0.5rem 2.25rem;
  line-height: 2;
  border: solid 1px rgb(63, 68, 87);
  color: rgb(255, 255, 255);
  background: rgba(63, 68, 87, 0.3);
  -webkit-transition: none;
  transition: none;
}
/* main */
.css-11apsez {
  position: relative;
  overflow: hidden;
  width: 100vw;
}
/* EmoMee-image video */
.css-1b7y32o {
  position: relative;
  width: 100%;
  height: auto;
}
.css-1vd2dbe {
  display: block;
  width: 100%;
  height: 100%;
}
/* first picture */
.gatsby-image-wrapper {
  position: relative;
  overflow: hidden;
}
.gatsby-image-wrapper [data-main-image] {
  opacity: 0;
  transform: translateZ(0);
  transition: opacity 0.25s linear;
  will-change: opacity;
}
.gatsby-image-wrapper img {
  bottom: 0;
  height: 100%;
  left: 0;
  margin: 0;
  /* max-width: none; */
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
}
.css-1ahkxzr {
  height: 800px;
  position: relative;
  background-color: #f7f7f7;
}
.css-fjkzxp {
  height: 100%;
}

/* explanation -EmoMee- */
.slide {
  /* overflow: hidden; */
  animation: slideIn 1s 1;
}
@keyframes slideIn {
  from {
    transform: translateX(180px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
  }
  40%,
  100% {
    opacity: 1;
  }
}

.css-1k7gt20 {
  margin: 224px auto 0;
  margin-bottom: 100px auto 0;
  /* width: 84vw; */
}
.css-11pvt2h {
  line-height: 1;
  text-align: center;
  font-size: 0.85rem;
  line-height: 2;
}
.css-1cmp5qk {
  margin: 16px auto 0;
  text-align: center;
  font-size: 1.85rem;
  line-height: 1.3;
  font-weight: 700;
  width: 650px;
}
.css-g79a2p {
  margin: 16px auto 0;
  font-size: 1rem;
  line-height: 2;
  width: 420px;
}
/* explanation -point1、3- */
.css-1sf2xcr {
  margin: 224px auto 0;
  margin-bottom: 180px;
  margin-left: auto 0;
  margin-right: auto 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 84vw;
}
.css-1ezjlpa {
  flex: 1;
  margin-top: 0;
  margin-right: 24px;
  margin-left: 64px;
}
.css-0cmp5qk {
  margin: 10px auto 0;
  text-align: center;
  font-size: 1.85rem;
  line-height: 1.3;
}
/* explanation -point2- */
.css-2ezjlpa {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-top: 0;
  margin-right: 64px;
  margin-left: 24px;
}
.css-2cmp5qk {
  margin: 10px auto 0;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.3;
}
/* video */
.css-18ypf3t {
  flex: 1;
  margin: 0 auto;
  margin-top: auto;
  /* justify-content: center; */
  /* margin-left: 20px; */
}
.css-18ypf4t {
  flex: 1;
  margin: 0 auto;
  margin-top: auto;
  /* justify-content: center; */
  margin-right: 0%;
  /* right: 20px; */
}
.css-18ypf3t > div {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 13px 20px 67px 0 rgb(0 0 0 / 40%);
}
.css-18ypf4t > div {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 13px 20px 67px 0 rgb(0 0 0 / 40%);
}
/* .css-9r1sq9 {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: url(@/assets/top/replay.png) center center / 90px 90px no-repeat;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  animation-play-state: running;
  z-index: 1;
  cursor: pointer;
  opacity: 1;
} */

.css-zxsb69 {
  position: relative;
  max-width: 680px;
  min-width: 420px;
}

.links {
  padding-top: 15px;
}
</style>

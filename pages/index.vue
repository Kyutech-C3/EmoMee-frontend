<template>
  <div>
    <header class="css-g1d4iy">
      <h1>
        <img :src="require('@/assets/top/EmoMee_logo.png')" width="200px" />
      </h1>
      <button
        class="css-15nidrm css-11eqmph hover:bg-white hover:bg-opacity-40"
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
            class="e19mb7dd0 css-1vd2dbe e1yswsx0"
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
        <header class="css-1k7gt20">
          <h2 class="css-11pvt2h">--EmoMeeとは--</h2>
          <h3 class="css-1cmp5qk">
            表情を検知し、感情(Emotion)を絵文字(Emoji)で共有できるMeeting用Webアプリケーション
          </h3>
          <p class="css-g79a2p">
            EmoMeeは、「ビデオ通話はちょっと、、」といった【カメラに顔を映したくない】【周りはどんな感情で聞いているのかわからない】などの声にお応えしました！ボイスチャットでの会話が増えた今、声だけでは伝わりにくいニュアンスをカメラをオンをせず、手軽に相手の表情を見ながら会話したいときに「EmoMee」‼
          </p>
        </header>
        <article class="css-1sf2xcr">
          <div class="css-1ezjlpa">
            <h2 class="css-11pvt2h">表情伝達</h2>
            <h3 class="css-0cmp5qk">POPなアイコンで表情を伝えよう</h3>
            <p class="css-g79a2p">
              カメラから表情の検出が行われ、その表情に応じたアイコンがあなたの表情を伝えてくれます。それぞれの表情をアイコンをカスタマイズすることで、あなたらしい表情を使えることができます。
              感情が伝えられることで、<b>コミュニケーションをより円滑に楽しく</b>行うことができます。
            </p>
          </div>
        </article>
        <article class="css-2sf2xcr">
          <div class="css-2ezjlpa">
            <h2 class="css-11pvt2h">手軽</h2>
            <h3 class="css-2cmp5qk">面倒な手順とさよなら</h3>
            <p class="css-g79a2p">
              EmoMeeはブラウザベースのアプリケーションのため、ダウンロードやインストール、ユーザ認証なしで利用することができます。
              普段のオンラインコミュニケーションからオンライン発表など、様々なオンラインコミュニケーション場面で簡単に使うことができます。
            </p>
          </div>
        </article>
        <article class="css-1sf3xcr">
          <div class="css-1ezjlpa">
            <h2 class="css-11pvt2h">連携</h2>
            <h3 class="css-0cmp5qk">
              いつものオンラインコミュニケーションツールと共に
            </h3>
            <p class="css-g79a2p">
              日頃のオンラインコミュにきエーションにemotionを追加することができます。
              連帯用のDiscode
              Botが用意されているので、Botを自身のサーバに追加することで、DiscodeでのコミュニケーションにEmotionをプラスすることができます。
            </p>
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
  color: #fff;
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
  border: solid 1px #fff;
  color: #fff;
  background: rgba(255, 255, 255, 0.3);
  -webkit-transition: none;
  transition: none;
}
/* main */
.css-11apsez {
  position: relative;
  overflow: hidden;
  width: 100vw;
}
/* video */
.css-1b7y32o {
  position: relative;
  width: 100%;
  height: auto;
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
.css-1k7gt20 {
  margin: 64px auto 0;
  width: 84vw;
}
.css-11pvt2h {
  line-height: 1;
  text-align: center;
  font-size: 1rem;
  line-height: 2;
  font-weight: 700;
}
.css-1cmp5qk {
  margin: 16px auto 0;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.3;
  font-weight: 700;
  width: 510px;
}
.css-g79a2p {
  margin: 16px auto 0;
  font-size: 1rem;
  line-height: 2;
  width: 420px;
}
/* explanation -point1、3- */
.css-1sf2xcr {
  /* point1 */
  margin-top: 145px;
  width: calc(100% -45px);
  max-width: 65%;
}
.css-1sf3xcr {
  /* point3 */
  margin-top: 145px;
  margin-bottom: 145px;
  width: calc(100% -45px);
  max-width: 65%;
}
.css-1ezjlpa {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-top: 0;
  margin-right: 64px;
  margin-left: 64px;
}
.css-0cmp5qk {
  margin: 10px auto 0;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.3;
  font-weight: 700;
  /* width: 510px; */
}
/* explanation -point2- */
.css-2sf2xcr {
  margin-top: 145px;
  width: calc(100% -45px);
  max-width: 65%;
}
.css-2ezjlpa {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-top: 0;
  margin-right: 64px;
  margin-left: 64px;
}
.css-2cmp5qk {
  margin: 10px auto 0;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.3;
  font-weight: 700;
  /* width: 510px; */
}

.links {
  padding-top: 15px;
}
</style>

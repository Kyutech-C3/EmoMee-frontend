<template>
  <div class="overflow-x-hidden">
    <div class="h-screen overflow-hidden">
      <video
        class="h-full max-w-none"
        playsinline
        autoplay
        loop
        src="@/assets/top/top_movie.mp4"
        type="video/mp4"
        muted
      />
      <div class="w-100 absolute top-1/2 left-1/2">
        <img
          src="@/assets/top/EmoMee_logo.png"
          alt="logo"
          class="-translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
    <div class="h-screen overflow-hidden">
      <img class="h-full max-w-none" src="@/assets/emomee-pc.jpg" />
    </div>
    <div
      class="text-center h-screen flex flex-col justify-center items-center"
      :class="visible0 ? 'right-slide' : 'opacity-0'"
    >
      <p class="text-sm">--<b>EmoMeeとは</b>--</p>
      <p class="text-3xl font-bold m-5">
        表情を検知し、感情(Emotion)を絵文字(Emoji)で<br />共有できるMeeting用Webアプリケーション
      </p>
      <p class="w-100 mx-auto leading-8 text-left">
        EmoMeeは、「ビデオ通話はちょっと、、」といった【カメラに顔を映したくない】【周りはどんな感情で聞いているのかわからない】などの声にお応えしました！<br />
        ボイスチャットでの会話が増えた今、声だけでは伝わりにくいニュアンスをカメラをオンをせず、手軽に相手の表情を見ながら会話したいときに「EmoMee」！！
      </p>
    </div>
    <div class="absolute w-full">
      <img
        src="@/assets/face/pigeon/neutral.gif"
        class="w-28 mx-auto -translate-y-1/2"
        alt="pigeon neutral"
      />
    </div>
    <div class="h-screen flex items-center justify-evenly">
      <div
        class="text-center h-screem flex flex-col justify-center items-center"
        :class="visible1 ? 'left-slide' : 'opacity-0'"
      >
        <p class="text-sm text-bold">表情伝達</p>
        <p class="text-3xl font-bold m-5">POPなアイコンで表情を伝えよう</p>
        <p class="w-100 mx-auto leading-8 text-left">
          カメラから表情の検出が行われ、その表情に応じたアイコンがあなたの表情を伝えてくれます。それぞれの表情をアイコンをカスタマイズすることで、あなたらしい表情を使えることができます。<br />
          感情が伝えられることで、<b>コミュニケーションをより円滑に楽しく</b>行うことができます。
        </p>
      </div>
      <video
        class="h-80 border-0 rounded-xl overflow-hidden shadow-2xl"
        src="@/assets/top/top_movie.mp4"
        type="video/mp4"
        playsinline
        autoplay
        muted
      />
    </div>
    <div class="absolute w-full">
      <img
        src="@/assets/face/pigeon/happy.gif"
        class="w-28 mx-auto -translate-y-1/2"
        alt="pigeon happy"
      />
    </div>
    <div class="h-screen flex items-center justify-evenly">
      <video
        class="h-80 border-0 rounded-xl overflow-hidden shadow-2xl"
        src="@/assets/top/top_movie.mp4"
        type="video/mp4"
        playsinline
        autoplay
        muted
      />
      <div
        class="text-center h-screem flex flex-col justify-center items-center"
        :class="visible2 ? 'right-slide' : 'opacity-0'"
      >
        <p class="text-sm text-bold">手軽</p>
        <p class="text-3xl font-bold m-5">面倒な手順は不要</p>
        <p class="w-100 mx-auto leading-8 text-left">
          日頃のオンラインコミュニケーションにEmotionを追加することができます。<br />
          連携用のDiscordBotが用意されているので、Botを自身のサーバに追加することで、DiscordでのコミュニケーションにEmotionをプラスすることができます。
        </p>
      </div>
    </div>
    <div class="absolute w-full">
      <img
        src="@/assets/face/pigeon/sleep.gif"
        class="w-28 mx-auto -translate-y-1/2"
        alt="pigeon sleep"
      />
    </div>
    <div class="h-screen flex items-center justify-evenly">
      <div
        class="text-center h-screem flex flex-col justify-center items-center"
        :class="visible3 ? 'left-slide' : 'opacity-0'"
      >
        <p class="text-sm text-bold">連携</p>
        <p class="text-3xl font-bold m-5">
          いつものオンライン<br />コミュニケーションツールと共に
        </p>
        <p class="w-100 mx-auto leading-8 text-left">
          EmoMeeはブラウザベースのアプリケーションのため、ダウンロードやインストール、ユーザ認証なしで利用することができます。<br />
          普段のオンラインコミュニケーションからオンライン発表など、様々なオンラインコミュニケーションの場面で簡単に使うことができます。
        </p>
      </div>
      <video
        class="h-80 border-0 rounded-xl overflow-hidden shadow-2xl"
        src="@/assets/top/top_movie.mp4"
        type="video/mp4"
        playsinline
        autoplay
        muted
      />
    </div>
    <div class="text-center h-screen flex flex-col justify-center items-center">
      <p class="my-6 text-4xl font-bold">さあ、はじめよう</p>
      <nuxt-link
        to="/create"
        class="my-6 text-3xl text-white bg-slate-500 px-9 py-2 hover:bg-slate-600 border border-slate-600 rounded"
      >
        ルーム作成
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'top',
  data() {
    return {
      visible0: false,
      visible1: false,
      visible2: false,
      visible3: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollY, innerHeight } = window

      if (!this.visible0) {
        this.visible0 = scrollY > innerHeight * 1.5
      } else if (scrollY <= innerHeight * 1.5) {
        this.visible0 = !this.visible0
      }

      if (!this.visible1) {
        this.visible1 = scrollY > innerHeight * 2.5
      } else if (scrollY <= innerHeight * 2.5) {
        this.visible1 = !this.visible1
      }

      if (!this.visible2) {
        this.visible2 = scrollY > innerHeight * 3.5
      } else if (scrollY <= innerHeight * 3.5) {
        this.visible2 = !this.visible2
      }

      if (!this.visible3) {
        this.visible3 = scrollY > innerHeight * 4.5
      } else if (scrollY < innerHeight * 4.5) {
        this.visible3 = !this.visible3
      }
    },
  },
}
</script>

<style scoped>
.right-slide {
  animation-delay: 1s;
  animation: right-animation 2s 1;
}
@keyframes right-animation {
  0% {
    transform: translateX(180px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
.left-slide {
  animation-delay: 1s;
  animation: left-animation 2s 1;
}
@keyframes left-animation {
  0% {
    transform: translateX(-180px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

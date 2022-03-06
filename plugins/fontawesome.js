import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 1. 利用したいアイコンを以下にてimportする
import {
  faCirclePlus,
  faCopy,
  faMicrophoneSlash,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons'

import {
  faYoutube,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

import { faHeart, faSave } from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false

// 2. 利用したいアイコンを以下にてlibrary.addする
library.add(
  faYoutube,
  faHeart,
  faTwitter,
  faSave,
  faGithub,
  faCirclePlus,
  faCopy,
  faMicrophoneSlash,
  faVideoSlash
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

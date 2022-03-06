import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 1. 利用したいアイコンを以下にてimportする
import {
  faCopy,
  faMicrophoneSlash,
  faVideoSlash,
  faEllipsisVertical,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'

import {} from '@fortawesome/free-brands-svg-icons'

import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'

config.autoAddCss = false

// 2. 利用したいアイコンを以下にてlibrary.addする
library.add(
  faCopy,
  faMicrophoneSlash,
  faVideoSlash,
  faEllipsisVertical,
  faFaceSmile,
  faCircle
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)

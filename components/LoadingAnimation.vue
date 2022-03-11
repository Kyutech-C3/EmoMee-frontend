<template>
  <div class="loader" :class="fontSize">Loading...</div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      fontSize: 'text-[10px]',
    }
  },
  created() {
    switch (this.size) {
      case 'sm':
        this.fontSize = 'text-[8px]'
        break
      case 'xs':
        this.fontSize = 'text-[6px]'
        break
    }
  },
}
</script>

<style scoped>
.loader {
  /* font-size: 10px; */
  margin: 25px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #949494;
  background: -moz-linear-gradient(
    left,
    #949494 10%,
    rgba(148, 148, 148, 0) 42%
  );
  background: -webkit-linear-gradient(
    left,
    #949494 10%,
    rgba(148, 148, 148, 0) 42%
  );
  background: -o-linear-gradient(left, #949494 10%, rgba(148, 148, 148, 0) 42%);
  background: -ms-linear-gradient(
    left,
    #949494 10%,
    rgba(148, 148, 148, 0) 42%
  );
  background: linear-gradient(
    to right,
    #949494 10%,
    rgba(148, 148, 148, 0) 42%
  );
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #949494;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #ffffff;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

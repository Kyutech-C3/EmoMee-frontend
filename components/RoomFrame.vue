<template>
    <div>
        {{ emotion_list }} 
    </div>
</template>

<script>
import * as faceapi from 'face-api.js'

export default {
    data() {
        return {
            emotion_list: {}
        }
    },
    methods: {
        async analysys(img) {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/weights");
            await faceapi.nets.faceExpressionNet.loadFromUri("/weigths");

            const detectionWithExpression = await faceapi.detectSingleFace(img,
                new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

            this.emotion_list = detectionWithExpression.expressions;
            var pairs = Object.entries(this.emotion_list);
            pairs.sort((p1, p2) => {
                var p1Val = p1[1], p2Val = p2[1];
                return p2Val - p1Val;
            });
            this.emotion_list = Object.fromEntries(pairs);
        }
    },
    mounted() {
       var video = document.createElement("video");
       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
           navigator.mediaDevices.getUserMedia({video:true}).then((stream) => {
               video.srcObject = stream;
               video.play();
               setInterval(this.analysys(video), 100);
           });
       } 
    }
}
</script>

<template>
  <div class='recruit-canvas'>
    <div class="canvas-box" ref="canvasRef" v-show="!previewImage">
      <canvas ref="canvasMapRef" id="canvas-map" width="100" height="100"></canvas>
    </div>

    <div class="btn-box flex-row">
      <span class="del-btn" @click="clearCanvasHandle">清除</span>
      <span class="sure-btn" @click="makeCanvasHandle">确认</span>
    </div>


    <img v-show="previewImage" class="preview-image" :src="previewImage" alt="生成预览">
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'
import { rotateBase64Img } from '@/utils/common'

export default {
  name: 'signNameCanvas',
  data () {
    return {
      canvasNode: null,
      previewImage: null
    }
  },
  mounted () {
    this.initalHandle()
    window.addEventListener('resize', this.initalHandle, false)
  },
  methods: {
    initalHandle () {
      const _canvasBox = this.$refs.canvasRef
      const _canvas = this.$refs.canvasMapRef
      if (!_canvasBox || !_canvas) {
        return false
      }

      _canvas.width = _canvasBox.clientWidth
      _canvas.height = _canvasBox.clientHeight

      this.clearCanvasHandle()
      this.canvasNode = new SignaturePad(_canvas, {
        minWidth: 2,
        maxWidth: 2,
        penColor: 'rgb(0, 0, 0)'
      })
    },

    clearCanvasHandle () {
      if (this.canvasNode) {
        this.canvasNode.clear()
        this.previewImage = null
      }
    },

    makeCanvasHandle () {
      const canvasNode = this.canvasNode
      // 重新初始化画布
      if (!canvasNode) {
        this.initalHandle()
      }

      // 是否签字
      if (canvasNode.isEmpty()) {
        this.$toast('您还没有签名')
        return false
      }

      // 图像旋转二次处理
      const _boxWidth = window.innerWidth
      const _boxHeight = window.innerHeight
      const _signImg = canvasNode.toDataURL('image/png', 0.6)
      if (_boxWidth < _boxHeight) {
        rotateBase64Img(_signImg, -90, (imgUrlRes) => {
          this.previewImage = imgUrlRes
        })
      } else {
        this.previewImage = _signImg
      }

      // upload ajax
      // do something here
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.initalHandle, false)
  }
}
</script>

<style lang='css' scoped>
.recruit-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.recruit-canvas .preview-image {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
}

.recruit-canvas .canvas-box,
.recruit-canvas .btn-box {
  position: absolute;
  top: 50%;
  z-index: 100;
}

.recruit-canvas .btn-box {
  left: -22%;
  z-index: 1000;
  text-align: center;
  transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

.recruit-canvas .btn-box .del-btn,
.recruit-canvas .btn-box .sure-btn {
  display: inline-block;
  width: 100px;
  height: 24px;
  margin: 0 10px;
  line-height: 24px;
  border-radius: 6px;
  background-color: #fff;
}

.recruit-canvas .btn-box .del-btn {
  color: #FF5E00;
}

.recruit-canvas .btn-box .sure-btn {
  color: #fff;
  background: linear-gradient(100deg, #FF4E01 0%, #FFBC01 100%);
}


.recruit-canvas .canvas-box {
  left: 22%;
  height: 80vh;
  width: 70vw;
  overflow: hidden;
  border: 1px dashed #D4D4D4;
  transform: translateY(-50%);
  background-color: #fff;
}

.recruit-canvas .canvas-box #canvas-map {
  width: 100%;
  height: 100%;
}



@media screen and (orientation: portrait) {
  /*竖屏 css*/
}

@media screen and (orientation: landscape) {
  /*横屏 css*/
  .recruit-canvas .canvas-box {
    top: 20px;
    left: 10%;
    width: 80vw;
    height: 70vh;
    transform: translateY(0);
  }

  .recruit-canvas .btn-box {
    width: 60%;
    left: 20%;
    top: 86%;
    transform: rotate(0);
  }
}
</style>

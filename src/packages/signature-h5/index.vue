<template>
  <div class='recruit-canvas'>
    <div class="canvas-box" ref="canvasRef">
      <canvas ref="canvasMapRef" id="canvas-map" width="100" height="100" />
    </div>

    <slot name="default" :signatrue="canvasNode">
      <div class="btn-box flex-row">
        <span class="del-btn" @click="clearHandle">清除</span>
        <span class="sure-btn" @click="confirmHandle">确认</span>
      </div>
    </slot>
  </div>
</template>

<script lang="js">
import SignaturePad from 'signature_pad'
import { rotateBase64Img } from '@/utils/common'

export default {
  name: 'signatureH5',
  props: {
    options: Object
  },
  data () {
    return {
      canvasNode: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.initalHandle()
      window.addEventListener('resize', this.initalHandle, false)
    })
  },
  methods: {
    initalHandle () {
      const _canvasBox = this.$refs.canvasRef
      const _canvas = this.$refs.canvasMapRef
      if (!_canvasBox || !_canvas) {
        console.warn('DOM节点初始化失败')
        return false
      }


      _canvas.width = _canvasBox.clientWidth
      _canvas.height = _canvasBox.clientHeight
      const computedOpt = Object.assign({}, {
        minWidth: 2,
        maxWidth: 2,
        penColor: 'rgb(0, 0, 0)'
      }, this.options)

      this.clearHandle()
      this.canvasNode = new SignaturePad(
        _canvas,
        computedOpt
      )
    },

    clearHandle () {
      const hasNode = this.canvasNode
      if (hasNode) {
        hasNode.clear()
        this.$emit('cancelEvent', hasNode)
      }
    },

    confirmHandle () {
      // 重新初始化画布
      const canvasNode = this.canvasNode
      if (!canvasNode) {
        this.initalHandle()
      }

      // 是否签字
      if (canvasNode.isEmpty()) {
        console.warn('您还没有签名');
        this.$emit('confirmEvent', canvasNode);
        return false
      }

      // 图像旋转二次处理
      const _boxWidth = window.innerWidth
      const _boxHeight = window.innerHeight
      const _signImg = canvasNode.toDataURL('image/png', 0.6) || null
      if (_boxWidth < _boxHeight) {
        rotateBase64Img(_signImg, -90, (imgUrlRes) => {
          this.$emit('confirmEvent', imgUrlRes);
        })
      } else {
        this.$emit('confirmEvent', _signImg);
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.initalHandle, false)
  }
}
</script>

<style lang="less" scoped>
@import './signature-h5.less';
</style>
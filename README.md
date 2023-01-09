# vue-h5-signature
基于 SignaturePad 实现的移动端手写签名组件，

支持横竖屏，自定义生成图片旋转角度(旋转角度需为90的倍数，默认生成横向)，返回dataURL。

更多配置项可参考 [SignaturePad 配置Api](https://github.com/szimek/signature_pad)


![横](https://github.com/Jensonhui/vueh5_canvas_signname/blob/master/src/assets/row.png?raw=true)

![竖](https://github.com/Jensonhui/vueh5_canvas_signname/blob/master/src/assets/col.png?raw=true)



### 安装
```
yarn add @jensonhui/signature-h5

or

npm install @jensonhui/signature-h5
```

### Attributes
|  参数   |          说明          |  类型  |
| :-----: | :--------------------: | :----: |
| options | 配置参数(SignaturePad) | Object |


### Events
|     参数     | 说明 |      返回值       |
| :----------: | :--: | :---------------: |
| cancelEvent  | 取消 | SignaturePad 实例 |
| confirmEvent | 确认 |      dataURL      |


### Slots
|  参数   |    说明     |      返回值       |
| :-----: | :---------: | :---------------: |
| default | 底部 button | SignaturePad 实例 |

使用方式
```
<signature>
  <template v-slot:default="{ signatrue }">
    <button @click="onClickHandle(signatrue)">自定义button，获取实例</button>
  </template>
</signature>
```

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "MobileSignature": function() { return /* reexport */ canvas_signature; },
  "install": function() { return /* reexport */ install; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./packages/canvas-signature/src/index.vue?vue&type=template&id=f8315e1c&
var render = function render(){var _vm=this,_c=_vm._self._c;return _c('div',{staticClass:"recruit-canvas"},[_c('div',{ref:"canvasRef",staticClass:"canvas-box"},[_c('canvas',{ref:"canvasMapRef",attrs:{"id":"canvas-map","width":"100","height":"100"}})]),_c('div',{staticClass:"btn-box flex-row"},[_c('span',{staticClass:"del-btn",on:{"click":_vm.clearHandle}},[_vm._v("清除")]),_c('span',{staticClass:"sure-btn",on:{"click":_vm.confirmHandle}},[_vm._v("确认")])])])
}
var staticRenderFns = []


;// CONCATENATED MODULE: ./node_modules/signature_pad/dist/signature_pad.js
/*!
 * Signature Pad v4.0.2 | https://github.com/szimek/signature_pad
 * (c) 2022 Szymon Nowak | Released under the MIT license
 */

class Point {
    constructor(x, y, pressure, time) {
        if (isNaN(x) || isNaN(y)) {
            throw new Error(`Point is invalid: (${x}, ${y})`);
        }
        this.x = +x;
        this.y = +y;
        this.pressure = pressure || 0;
        this.time = time || Date.now();
    }
    distanceTo(start) {
        return Math.sqrt(Math.pow(this.x - start.x, 2) + Math.pow(this.y - start.y, 2));
    }
    equals(other) {
        return (this.x === other.x &&
            this.y === other.y &&
            this.pressure === other.pressure &&
            this.time === other.time);
    }
    velocityFrom(start) {
        return this.time !== start.time
            ? this.distanceTo(start) / (this.time - start.time)
            : 0;
    }
}

class Bezier {
    constructor(startPoint, control2, control1, endPoint, startWidth, endWidth) {
        this.startPoint = startPoint;
        this.control2 = control2;
        this.control1 = control1;
        this.endPoint = endPoint;
        this.startWidth = startWidth;
        this.endWidth = endWidth;
    }
    static fromPoints(points, widths) {
        const c2 = this.calculateControlPoints(points[0], points[1], points[2]).c2;
        const c3 = this.calculateControlPoints(points[1], points[2], points[3]).c1;
        return new Bezier(points[1], c2, c3, points[2], widths.start, widths.end);
    }
    static calculateControlPoints(s1, s2, s3) {
        const dx1 = s1.x - s2.x;
        const dy1 = s1.y - s2.y;
        const dx2 = s2.x - s3.x;
        const dy2 = s2.y - s3.y;
        const m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
        const m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };
        const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const dxm = m1.x - m2.x;
        const dym = m1.y - m2.y;
        const k = l2 / (l1 + l2);
        const cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
        const tx = s2.x - cm.x;
        const ty = s2.y - cm.y;
        return {
            c1: new Point(m1.x + tx, m1.y + ty),
            c2: new Point(m2.x + tx, m2.y + ty),
        };
    }
    length() {
        const steps = 10;
        let length = 0;
        let px;
        let py;
        for (let i = 0; i <= steps; i += 1) {
            const t = i / steps;
            const cx = this.point(t, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x);
            const cy = this.point(t, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
            if (i > 0) {
                const xdiff = cx - px;
                const ydiff = cy - py;
                length += Math.sqrt(xdiff * xdiff + ydiff * ydiff);
            }
            px = cx;
            py = cy;
        }
        return length;
    }
    point(t, start, c1, c2, end) {
        return (start * (1.0 - t) * (1.0 - t) * (1.0 - t))
            + (3.0 * c1 * (1.0 - t) * (1.0 - t) * t)
            + (3.0 * c2 * (1.0 - t) * t * t)
            + (end * t * t * t);
    }
}

class SignatureEventTarget {
    constructor() {
        try {
            this._et = new EventTarget();
        }
        catch (error) {
            this._et = document;
        }
    }
    addEventListener(type, listener, options) {
        this._et.addEventListener(type, listener, options);
    }
    dispatchEvent(event) {
        return this._et.dispatchEvent(event);
    }
    removeEventListener(type, callback, options) {
        this._et.removeEventListener(type, callback, options);
    }
}

function throttle(fn, wait = 250) {
    let previous = 0;
    let timeout = null;
    let result;
    let storedContext;
    let storedArgs;
    const later = () => {
        previous = Date.now();
        timeout = null;
        result = fn.apply(storedContext, storedArgs);
        if (!timeout) {
            storedContext = null;
            storedArgs = [];
        }
    };
    return function wrapper(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        storedContext = this;
        storedArgs = args;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = fn.apply(storedContext, storedArgs);
            if (!timeout) {
                storedContext = null;
                storedArgs = [];
            }
        }
        else if (!timeout) {
            timeout = window.setTimeout(later, remaining);
        }
        return result;
    };
}

class SignaturePad extends SignatureEventTarget {
    constructor(canvas, options = {}) {
        super();
        this.canvas = canvas;
        this._handleMouseDown = (event) => {
            if (event.buttons === 1) {
                this._drawningStroke = true;
                this._strokeBegin(event);
            }
        };
        this._handleMouseMove = (event) => {
            if (this._drawningStroke) {
                this._strokeMoveUpdate(event);
            }
        };
        this._handleMouseUp = (event) => {
            if (event.buttons === 1 && this._drawningStroke) {
                this._drawningStroke = false;
                this._strokeEnd(event);
            }
        };
        this._handleTouchStart = (event) => {
            event.preventDefault();
            if (event.targetTouches.length === 1) {
                const touch = event.changedTouches[0];
                this._strokeBegin(touch);
            }
        };
        this._handleTouchMove = (event) => {
            event.preventDefault();
            const touch = event.targetTouches[0];
            this._strokeMoveUpdate(touch);
        };
        this._handleTouchEnd = (event) => {
            const wasCanvasTouched = event.target === this.canvas;
            if (wasCanvasTouched) {
                event.preventDefault();
                const touch = event.changedTouches[0];
                this._strokeEnd(touch);
            }
        };
        this._handlePointerStart = (event) => {
            this._drawningStroke = true;
            event.preventDefault();
            this._strokeBegin(event);
        };
        this._handlePointerMove = (event) => {
            if (this._drawningStroke) {
                event.preventDefault();
                this._strokeMoveUpdate(event);
            }
        };
        this._handlePointerEnd = (event) => {
            this._drawningStroke = false;
            const wasCanvasTouched = event.target === this.canvas;
            if (wasCanvasTouched) {
                event.preventDefault();
                this._strokeEnd(event);
            }
        };
        this.velocityFilterWeight = options.velocityFilterWeight || 0.7;
        this.minWidth = options.minWidth || 0.5;
        this.maxWidth = options.maxWidth || 2.5;
        this.throttle = ('throttle' in options ? options.throttle : 16);
        this.minDistance = ('minDistance' in options ? options.minDistance : 5);
        this.dotSize = options.dotSize || 0;
        this.penColor = options.penColor || 'black';
        this.backgroundColor = options.backgroundColor || 'rgba(0,0,0,0)';
        this._strokeMoveUpdate = this.throttle
            ? throttle(SignaturePad.prototype._strokeUpdate, this.throttle)
            : SignaturePad.prototype._strokeUpdate;
        this._ctx = canvas.getContext('2d');
        this.clear();
        this.on();
    }
    clear() {
        const { _ctx: ctx, canvas } = this;
        ctx.fillStyle = this.backgroundColor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this._data = [];
        this._reset();
        this._isEmpty = true;
    }
    fromDataURL(dataUrl, options = {}) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            const ratio = options.ratio || window.devicePixelRatio || 1;
            const width = options.width || this.canvas.width / ratio;
            const height = options.height || this.canvas.height / ratio;
            const xOffset = options.xOffset || 0;
            const yOffset = options.yOffset || 0;
            this._reset();
            image.onload = () => {
                this._ctx.drawImage(image, xOffset, yOffset, width, height);
                resolve();
            };
            image.onerror = (error) => {
                reject(error);
            };
            image.crossOrigin = 'anonymous';
            image.src = dataUrl;
            this._isEmpty = false;
        });
    }
    toDataURL(type = 'image/png', encoderOptions) {
        switch (type) {
            case 'image/svg+xml':
                return this._toSVG();
            default:
                return this.canvas.toDataURL(type, encoderOptions);
        }
    }
    on() {
        this.canvas.style.touchAction = 'none';
        this.canvas.style.msTouchAction = 'none';
        this.canvas.style.userSelect = 'none';
        const isIOS = /Macintosh/.test(navigator.userAgent) && 'ontouchstart' in document;
        if (window.PointerEvent && !isIOS) {
            this._handlePointerEvents();
        }
        else {
            this._handleMouseEvents();
            if ('ontouchstart' in window) {
                this._handleTouchEvents();
            }
        }
    }
    off() {
        this.canvas.style.touchAction = 'auto';
        this.canvas.style.msTouchAction = 'auto';
        this.canvas.style.userSelect = 'auto';
        this.canvas.removeEventListener('pointerdown', this._handlePointerStart);
        this.canvas.removeEventListener('pointermove', this._handlePointerMove);
        document.removeEventListener('pointerup', this._handlePointerEnd);
        this.canvas.removeEventListener('mousedown', this._handleMouseDown);
        this.canvas.removeEventListener('mousemove', this._handleMouseMove);
        document.removeEventListener('mouseup', this._handleMouseUp);
        this.canvas.removeEventListener('touchstart', this._handleTouchStart);
        this.canvas.removeEventListener('touchmove', this._handleTouchMove);
        this.canvas.removeEventListener('touchend', this._handleTouchEnd);
    }
    isEmpty() {
        return this._isEmpty;
    }
    fromData(pointGroups, { clear = true } = {}) {
        if (clear) {
            this.clear();
        }
        this._fromData(pointGroups, this._drawCurve.bind(this), this._drawDot.bind(this));
        this._data = clear ? pointGroups : this._data.concat(pointGroups);
    }
    toData() {
        return this._data;
    }
    _strokeBegin(event) {
        this.dispatchEvent(new CustomEvent('beginStroke', { detail: event }));
        const newPointGroup = {
            dotSize: this.dotSize,
            minWidth: this.minWidth,
            maxWidth: this.maxWidth,
            penColor: this.penColor,
            points: [],
        };
        this._data.push(newPointGroup);
        this._reset();
        this._strokeUpdate(event);
    }
    _strokeUpdate(event) {
        if (this._data.length === 0) {
            this._strokeBegin(event);
            return;
        }
        this.dispatchEvent(new CustomEvent('beforeUpdateStroke', { detail: event }));
        const x = event.clientX;
        const y = event.clientY;
        const pressure = event.pressure !== undefined
            ? event.pressure
            : event.force !== undefined
                ? event.force
                : 0;
        const point = this._createPoint(x, y, pressure);
        const lastPointGroup = this._data[this._data.length - 1];
        const lastPoints = lastPointGroup.points;
        const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
        const isLastPointTooClose = lastPoint
            ? point.distanceTo(lastPoint) <= this.minDistance
            : false;
        const { penColor, dotSize, minWidth, maxWidth } = lastPointGroup;
        if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
            const curve = this._addPoint(point);
            if (!lastPoint) {
                this._drawDot(point, {
                    penColor,
                    dotSize,
                    minWidth,
                    maxWidth,
                });
            }
            else if (curve) {
                this._drawCurve(curve, {
                    penColor,
                    dotSize,
                    minWidth,
                    maxWidth,
                });
            }
            lastPoints.push({
                time: point.time,
                x: point.x,
                y: point.y,
                pressure: point.pressure,
            });
        }
        this.dispatchEvent(new CustomEvent('afterUpdateStroke', { detail: event }));
    }
    _strokeEnd(event) {
        this._strokeUpdate(event);
        this.dispatchEvent(new CustomEvent('endStroke', { detail: event }));
    }
    _handlePointerEvents() {
        this._drawningStroke = false;
        this.canvas.addEventListener('pointerdown', this._handlePointerStart);
        this.canvas.addEventListener('pointermove', this._handlePointerMove);
        document.addEventListener('pointerup', this._handlePointerEnd);
    }
    _handleMouseEvents() {
        this._drawningStroke = false;
        this.canvas.addEventListener('mousedown', this._handleMouseDown);
        this.canvas.addEventListener('mousemove', this._handleMouseMove);
        document.addEventListener('mouseup', this._handleMouseUp);
    }
    _handleTouchEvents() {
        this.canvas.addEventListener('touchstart', this._handleTouchStart);
        this.canvas.addEventListener('touchmove', this._handleTouchMove);
        this.canvas.addEventListener('touchend', this._handleTouchEnd);
    }
    _reset() {
        this._lastPoints = [];
        this._lastVelocity = 0;
        this._lastWidth = (this.minWidth + this.maxWidth) / 2;
        this._ctx.fillStyle = this.penColor;
    }
    _createPoint(x, y, pressure) {
        const rect = this.canvas.getBoundingClientRect();
        return new Point(x - rect.left, y - rect.top, pressure, new Date().getTime());
    }
    _addPoint(point) {
        const { _lastPoints } = this;
        _lastPoints.push(point);
        if (_lastPoints.length > 2) {
            if (_lastPoints.length === 3) {
                _lastPoints.unshift(_lastPoints[0]);
            }
            const widths = this._calculateCurveWidths(_lastPoints[1], _lastPoints[2]);
            const curve = Bezier.fromPoints(_lastPoints, widths);
            _lastPoints.shift();
            return curve;
        }
        return null;
    }
    _calculateCurveWidths(startPoint, endPoint) {
        const velocity = this.velocityFilterWeight * endPoint.velocityFrom(startPoint) +
            (1 - this.velocityFilterWeight) * this._lastVelocity;
        const newWidth = this._strokeWidth(velocity);
        const widths = {
            end: newWidth,
            start: this._lastWidth,
        };
        this._lastVelocity = velocity;
        this._lastWidth = newWidth;
        return widths;
    }
    _strokeWidth(velocity) {
        return Math.max(this.maxWidth / (velocity + 1), this.minWidth);
    }
    _drawCurveSegment(x, y, width) {
        const ctx = this._ctx;
        ctx.moveTo(x, y);
        ctx.arc(x, y, width, 0, 2 * Math.PI, false);
        this._isEmpty = false;
    }
    _drawCurve(curve, options) {
        const ctx = this._ctx;
        const widthDelta = curve.endWidth - curve.startWidth;
        const drawSteps = Math.ceil(curve.length()) * 2;
        ctx.beginPath();
        ctx.fillStyle = options.penColor;
        for (let i = 0; i < drawSteps; i += 1) {
            const t = i / drawSteps;
            const tt = t * t;
            const ttt = tt * t;
            const u = 1 - t;
            const uu = u * u;
            const uuu = uu * u;
            let x = uuu * curve.startPoint.x;
            x += 3 * uu * t * curve.control1.x;
            x += 3 * u * tt * curve.control2.x;
            x += ttt * curve.endPoint.x;
            let y = uuu * curve.startPoint.y;
            y += 3 * uu * t * curve.control1.y;
            y += 3 * u * tt * curve.control2.y;
            y += ttt * curve.endPoint.y;
            const width = Math.min(curve.startWidth + ttt * widthDelta, options.maxWidth);
            this._drawCurveSegment(x, y, width);
        }
        ctx.closePath();
        ctx.fill();
    }
    _drawDot(point, options) {
        const ctx = this._ctx;
        const width = options.dotSize > 0
            ? options.dotSize
            : (options.minWidth + options.maxWidth) / 2;
        ctx.beginPath();
        this._drawCurveSegment(point.x, point.y, width);
        ctx.closePath();
        ctx.fillStyle = options.penColor;
        ctx.fill();
    }
    _fromData(pointGroups, drawCurve, drawDot) {
        for (const group of pointGroups) {
            const { penColor, dotSize, minWidth, maxWidth, points } = group;
            if (points.length > 1) {
                for (let j = 0; j < points.length; j += 1) {
                    const basicPoint = points[j];
                    const point = new Point(basicPoint.x, basicPoint.y, basicPoint.pressure, basicPoint.time);
                    this.penColor = penColor;
                    if (j === 0) {
                        this._reset();
                    }
                    const curve = this._addPoint(point);
                    if (curve) {
                        drawCurve(curve, {
                            penColor,
                            dotSize,
                            minWidth,
                            maxWidth,
                        });
                    }
                }
            }
            else {
                this._reset();
                drawDot(points[0], {
                    penColor,
                    dotSize,
                    minWidth,
                    maxWidth,
                });
            }
        }
    }
    _toSVG() {
        const pointGroups = this._data;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const minX = 0;
        const minY = 0;
        const maxX = this.canvas.width / ratio;
        const maxY = this.canvas.height / ratio;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.canvas.width.toString());
        svg.setAttribute('height', this.canvas.height.toString());
        this._fromData(pointGroups, (curve, { penColor }) => {
            const path = document.createElement('path');
            if (!isNaN(curve.control1.x) &&
                !isNaN(curve.control1.y) &&
                !isNaN(curve.control2.x) &&
                !isNaN(curve.control2.y)) {
                const attr = `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(3)} ` +
                    `C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} ` +
                    `${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} ` +
                    `${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;
                path.setAttribute('d', attr);
                path.setAttribute('stroke-width', (curve.endWidth * 2.25).toFixed(3));
                path.setAttribute('stroke', penColor);
                path.setAttribute('fill', 'none');
                path.setAttribute('stroke-linecap', 'round');
                svg.appendChild(path);
            }
        }, (point, { penColor, dotSize, minWidth, maxWidth }) => {
            const circle = document.createElement('circle');
            const size = dotSize > 0 ? dotSize : (minWidth + maxWidth) / 2;
            circle.setAttribute('r', size.toString());
            circle.setAttribute('cx', point.x.toString());
            circle.setAttribute('cy', point.y.toString());
            circle.setAttribute('fill', penColor);
            svg.appendChild(circle);
        });
        const prefix = 'data:image/svg+xml;base64,';
        const header = '<svg' +
            ' xmlns="http://www.w3.org/2000/svg"' +
            ' xmlns:xlink="http://www.w3.org/1999/xlink"' +
            ` viewBox="${minX} ${minY} ${this.canvas.width} ${this.canvas.height}"` +
            ` width="${maxX}"` +
            ` height="${maxY}"` +
            '>';
        let body = svg.innerHTML;
        if (body === undefined) {
            const dummy = document.createElement('dummy');
            const nodes = svg.childNodes;
            dummy.innerHTML = '';
            for (let i = 0; i < nodes.length; i += 1) {
                dummy.appendChild(nodes[i].cloneNode(true));
            }
            body = dummy.innerHTML;
        }
        const footer = '</svg>';
        const data = header + body + footer;
        return prefix + btoa(data);
    }
}


//# sourceMappingURL=signature_pad.js.map

;// CONCATENATED MODULE: ./packages/canvas-signature/src/utils/common.js
// 图片旋转处理 => output(base64)
const rotateBase64Img = (src, edg, callback) => {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    let imgW = 0 // 图片宽度
    let imgH = 0 // 图片高度
    let size = 0 // canvas初始大小

    if (edg % 90 !== 0) {
      throw new Error('旋转角度必须是90的倍数!')
    }

    (edg < 0) && (edg = (edg % 360) + 360)
    const quadrant = (edg / 90) % 4 // 旋转象限
    const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 } // 裁剪坐标

    const image = new Image()
    image.src = src
    image.crossOrigin = 'anonymous'

    image.onload = function () {
      imgW = image.width
      imgH = image.height
      size = imgW > imgH ? imgW : imgH

      canvas.width = size * 2
      canvas.height = size * 2
      switch (quadrant) {
        case 0:
          cutCoor.sx = size
          cutCoor.sy = size
          cutCoor.ex = size + imgW
          cutCoor.ey = size + imgH
          break
        case 1:
          cutCoor.sx = size - imgH
          cutCoor.sy = size
          cutCoor.ex = size
          cutCoor.ey = size + imgW
          break
        case 2:
          cutCoor.sx = size - imgW
          cutCoor.sy = size - imgH
          cutCoor.ex = size
          cutCoor.ey = size
          break
        case 3:
          cutCoor.sx = size
          cutCoor.sy = size - imgW
          cutCoor.ex = size + imgH
          cutCoor.ey = size + imgW
          break
      }

      ctx.translate(size, size)
      ctx.rotate(edg * Math.PI / 180)
      ctx.drawImage(image, 0, 0)

      const imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey)
      if (quadrant % 2 === 0) {
        canvas.width = imgW
        canvas.height = imgH
      } else {
        canvas.width = imgH
        canvas.height = imgW
      }
      ctx.putImageData(imgData, 0, 0)

      if (typeof callback === 'function') {
        callback(canvas.toDataURL('image/png'))
      }
    }
  } catch (e) {
    console.log(e)
  }
}
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./packages/canvas-signature/src/index.vue?vue&type=script&lang=js&




/* harmony default export */ var srcvue_type_script_lang_js_ = ({
  name: 'MobileSignature',
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
      if (this.canvasNode) {
        this.canvasNode.clear()
        this.previewImage = ''
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
        return false
      }

      // 图像旋转二次处理
      const _boxWidth = window.innerWidth
      const _boxHeight = window.innerHeight
      const _signImg = canvasNode.toDataURL('image/png', 0.6) || null
      if (_boxWidth < _boxHeight) {
        rotateBase64Img(_signImg, -90, (imgUrlRes) => {
          this.$emit('confirmEvent', imgUrlRes)
        })
      } else {
        this.$emit('confirmEvent', _signImg)
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.initalHandle, false)
  }
});

;// CONCATENATED MODULE: ./packages/canvas-signature/src/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var canvas_signature_srcvue_type_script_lang_js_ = (srcvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./packages/canvas-signature/src/index.vue





/* normalize component */
;
var component = normalizeComponent(
  canvas_signature_srcvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var canvas_signature_src = (component.exports);
;// CONCATENATED MODULE: ./packages/canvas-signature/index.js


canvas_signature_src.install = function (Vue) {
  Vue.component(canvas_signature_src.name, canvas_signature_src);
}

/* harmony default export */ var canvas_signature = (canvas_signature_src);
;// CONCATENATED MODULE: ./packages/index.js


const components = [
  canvas_signature
]

const install = function (Vue) {
  if (install.installed) return

  components.map(item => {
    Vue.component(item.name, item)
  })
}


;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js



module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.common.js.map
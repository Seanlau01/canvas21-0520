var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
/*********/
autoSetCanvasSize(yyy)
/********/
listenToUser(yyy)
/*******************/
var eraserEnabled = false
eraser.onclick = function () {
eraserEnabled = true
actions.className = 'actions x'
}
brush.onclick = function () {
eraserEnabled = false
actions.className = 'actions'
}
/***************/
//hanshu1
function autoSetCanvasSize(canvas) {
setCanvasSize()

window.onresize = function () {
    setCanvasSize()
}
//hanshu2
function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}
}
//hanshu3
function drawCircle(x, y, radius) {

context.beginPath();
context.fillStyle = 'black'
context.arc(x, y, radius, 0, Math.PI * 2)
context.fill()
}
//hanshu4
function drawLine(x1, y1, x2, y2) {
context.beginPath();
context.strokeStyle = 'black'
context.moveTo(x1, y1) //起点
context.lineWidth = 5
context.lineTo(x2, y2) //终点
context.stroke()
context.closePath()
}
//hanshu5
function listenToUser(canvas) {

var using = false
var lastPoint = {
    x: undefined,
    y: undefined
}
//特性检测，判断设备支持触屏与否
if(document.body.ontouchstart !== undefined){
    //true是触屏设备
    canvas.ontouchstart=function(aaa){
        console.log('开始触摸')
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        console.log(x,y)
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    canvas.ontouchmove=function(aaa){
        console.log('边摸边动')
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        console.log(x,y)
        if (!using) {
            return
        }
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend=function(aaa){
        console.log('摸完了')
        using = false
    }
    
}else{
    //false是非触屏设备
    canvas.onmousedown = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
        }
    }
    
    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
    
        if (!using) {
            return
        }
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                "x": x,
                "y": y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        }
    }
    yyy.onmouseup = function (aaa) {
        using = false
      } 
    }    
}
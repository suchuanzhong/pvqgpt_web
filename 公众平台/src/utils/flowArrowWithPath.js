export function CreateFlowline(path, element, config) {
  var flow = new Object();
  var lines = [];
  var canvas = document.getElementById(element);
  canvas.width = config.canvas_w;
  canvas.height = config.canvas_h;
  const context = canvas.getContext("2d");
  path =
    path ||
    "M0, 300l200, 0 0, -300 500, 0 0, 900 -600, 0M200,300 l0, 300 500, 0";
  flow.begin = function() {
    const pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttributeNS(null, "d", path);
    const length = pathElement.getTotalLength();

    var jiange = config.jiange;
    var jiantouchang = config.changdu;

    var fromX = 0;
    var fromY = 0;
    for (let index = 0; index < length; index += jiange) {
      var x = parseInt(pathElement.getPointAtLength(index).x);
      var y = parseInt(pathElement.getPointAtLength(index).y);
      fromX = x;
      fromX = y;
      x = parseInt(pathElement.getPointAtLength(index + jiantouchang).x);
      y = parseInt(pathElement.getPointAtLength(index + jiantouchang).y);
      lines.push({
        fromX: fromX,
        fromY: fromY,
        toX: x,
        toY: y,
        index: index
      });
    }
    setInterval(function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        var index = line.index;
        var nextindex = index + jiantouchang;
        var x = parseInt(pathElement.getPointAtLength(index + jiantouchang).x);
        var y = parseInt(pathElement.getPointAtLength(index + jiantouchang).y);

        drawArrow(
          context,
          line.toX,
          line.toY,
          x,
          y,
          30,
          5,
          j % 5 == 0 ? 3 : 1,
          j % 5 == 0 ? config.color : "#ff8800"
        );
        line.fromX = line.toX;
        line.fromY = line.toY;
        line.toX = x;
        line.toY = y;

        if (nextindex > length) {
          nextindex = 0;
        }
        line.index = nextindex;
      }
    }, config.time);
  };

  function drawArrow(
    ctx,
    fromX,
    fromY,
    toX,
    toY,
    theta1,
    headlen1,
    width1,
    color1
  ) {
    var theta = theta1 || 30,
      headlen = headlen1 || 10,
      width = width1 || 1,
      color = color1 || "#000",
      angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
      angle1 = ((angle + theta) * Math.PI) / 180,
      angle2 = ((angle - theta) * Math.PI) / 180,
      topX = headlen * Math.cos(angle1),
      topY = headlen * Math.sin(angle1),
      botX = headlen * Math.cos(angle2),
      botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    var arrowX, arrowY;
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    // if(color!="#ff8800"){
    //     var gradient4 = ctx.createRadialGradient((fromX+toX)/2, (fromY+toY)/2, 2, (fromX+toX)/2, (fromY+toY)/2, 5);
    //     gradient4.addColorStop(0, 'hsla(32, 100%, 69%, .42)');
    //     gradient4.addColorStop(1, 'hsla(30, 70%, 74%, 1)');

    //     ctx.strokeStyle = gradient4;
    // }
    // else{
    //     ctx.strokeStyle = color;
    // }
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  }
  return flow;
}

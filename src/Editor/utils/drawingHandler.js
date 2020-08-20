const drawingHandler = (drawSelected) =>{
  var canvas = document.getElementById('my-canvas');
  if(drawSelected && canvas){
    var _strokeHelper=new strokeHelper();
    canvas.onmousedown = _strokeHelper.mousedown;
    canvas.onmousemove= _strokeHelper.mousemove;
    canvas.onmouseup = _strokeHelper.mouseup;
  }
  else if(canvas){
    canvas.onmousedown = undefined;
    canvas.onmousemove= undefined;
    canvas.onmouseup = undefined;
  }
};

function strokeHelper() {

	var canvas = document.getElementById('my-canvas');
	var context = canvas.getContext('2d');
	var img = new Image();
	
    var tool = this;
    this.started = false;

    var last_mousex = 0;
    var last_mousey = 0;
    var mousex = 0;
    var mousey = 0;

    this.mousedown = function (ev) {
      last_mousex = ev.offsetX;
      last_mousey = ev.offsetY;
      context.strokeStyle = 'black';
      context.lineWidth = '50';
      tool.started = true;
    };

    this.mousemove = function (ev) {
        if (tool.started) {
            mousex = ev.offsetX;
            mousey = ev.offsetY;
            // context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
            context.drawImage(img, 0, 0); // draw saved canvas (image)
			      context.beginPath();
            var width = mousex-last_mousex;
            var height = mousey-last_mousey;
            context.rect(last_mousex,last_mousey,width,height);
            context.stroke();
        }
    };

    this.mouseup = function (ev) {
        if (tool.started ) {
            tool.mousemove(ev);
            img.src = canvas.toDataURL(); // save canvas as image
            context.save();
            tool.started = false;
        }
    };
}

export {drawingHandler};
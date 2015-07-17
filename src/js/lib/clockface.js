function Clockface(canvasSelector, colors, sizes)
{
  this._ctx = document.querySelector(canvasSelector).getContext("2d");
  this._colors = colors;
  this._sizes = sizes;
}

Clockface.prototype = {
  init: function()
  {
    this.initCanvas();
  },

  draw: function()
  {
    this.clearCanvas();
    this.drawHourMarks();
    this.drawMinuteMarks();
    this.drawHourLineLabels();
    this.drawClockBorder();
  },

  clearCanvas: function()
  {
    this._ctx.clearRect(-this._sizes.clock.width, 0, this._sizes.clock.width*2, this._sizes.clock.height);
  },

  initCanvas: function()
  {
    this._ctx.translate(this._sizes.clock.height, this._sizes.clock.height);
    this._ctx.rotate(-Math.PI);
    this._ctx.lineCap = "butt";
    this._ctx.textAlign = "center";
  },

  drawHourMarks: function()
  {
    this._ctx.strokeStyle = this._colors.markers.hour;
    this._ctx.fillStyle = this._ctx.strokeStyle;
    this._ctx.lineWidth = this._sizes.markers.hour.line;

    this._ctx.save();
    for (var i=0; i<=24; i++) {
      this._ctx.beginPath();
      if(i % 2 !== 0) {
        this._ctx.moveTo(this._sizes.clock.height - this._sizes.markers.hour.shortHeight, 0);
      }
      else {
        this._ctx.moveTo(this._sizes.clock.height - this._sizes.markers.hour.height, 0);
      }
      this._ctx.lineTo(this._sizes.clock.height, 0);
      this._ctx.stroke();
      this._ctx.rotate(Math.PI / 24);
    }
    this._ctx.restore();
  },

  drawClockBorder: function()
  {
    this._ctx.strokeStyle = this._colors.markers.hour;
    this._ctx.fillStyle = this._ctx.strokeStyle;
    this._ctx.lineWidth = this._sizes.markers.hour.line;

    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.arc(0, 0, this._sizes.clock.height - (this._sizes.markers.hour.line/2), 0, Math.PI, false);
    this._ctx.stroke();
    this._ctx.restore();
  },

  drawHourLineLabels: function()
  {
    this._ctx.save();
    this._ctx.rotate(Math.PI/2);
    for (var i = 0; i <= 24; i++) {
      if((i > 0) && (i < 24)) {
        this._ctx.strokeStyle = this._colors.labels.hour;
        this._ctx.fillStyle = this._ctx.strokeStyle;
        this._ctx.font = 'normal ' + this._sizes.font.hour.size + 'px "OpenSans"';
        this._ctx.fillText(i, 0, -(this._sizes.clock.height - this._sizes.font.hour.margin));
        if((i*2.5) % 1 === 0) {
          this._ctx.strokeStyle = this._colors.labels.minute;
          this._ctx.fillStyle = this._ctx.strokeStyle;
          this._ctx.font = 'normal ' + this._sizes.font.minute.size + 'px "OpenSans"';
          this._ctx.fillText(i*2.5, 0, -(this._sizes.clock.height - (this._sizes.font.hour.margin + this._sizes.font.minute.margin)));
        }
      }
      this._ctx.rotate(Math.PI / 24);
    }
    this._ctx.restore();
  },

  drawMinuteMarks: function()
  {
    this._ctx.strokeStyle = this._colors.markers.minute;
    this._ctx.fillStyle = this._ctx.strokeStyle;
    this._ctx.lineWidth = this._sizes.markers.minute.line;

    this._ctx.save();
    for (var i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        this._ctx.beginPath();
        this._ctx.moveTo(this._sizes.clock.height - this._sizes.markers.minute.height, 0);
        this._ctx.lineTo(this._sizes.clock.height, 0);
        this._ctx.stroke();
      }
      this._ctx.rotate(Math.PI/60);
    }
    this._ctx.restore();
  }
};

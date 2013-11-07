function Clock(canvasSelector, colors, sizes)
{
  this._ctx = document.querySelector(canvasSelector).getContext("2d");
  this._colors = colors;
  this._sizes = sizes;
  this._time = {
    hour: 0,
    minute: 0,
    second: 0
  };
  this._secondInterval = null;
}

Clock.prototype = {
  init: function()
  {
    this.initCanvas();
    this.redraw();
  },

  redraw: function()
  {
    this.clearCanvas();
    this.drawCurrentHour();
    this.drawCurrentMinute();
    this.drawCurrentSecond();
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

  drawCurrentHour: function()
  {
    this._ctx.strokeStyle = this._colors.progress.hour;
    this._ctx.fillStyle = this._ctx.strokeStyle;
    this._ctx.lineWidth = this._sizes.progress.hour.line;

    this._ctx.save();
    this._ctx.beginPath();
    var radius = this._time.hour === 0 ? Math.PI : Math.PI * (this._time.hour / 24);
    this._ctx.arc(0, 0, this._sizes.clock.height - (this._sizes.progress.hour.line / 2), 0, radius, false);
    this._ctx.stroke();
    this._ctx.restore();
  },

  drawCurrentMinute: function()
  {
    this._ctx.strokeStyle = this._colors.progress.minute;
    this._ctx.fillStyle = this._ctx.strokeStyle;
    this._ctx.lineWidth = this._sizes.progress.minute.line;

    this._ctx.save();
    this._ctx.beginPath();
    var radius = this._time.minute === 0 ? Math.PI : Math.PI * (this._time.minute / 60);
    this._ctx.arc(0, 0, this._sizes.clock.height - ((this._sizes.progress.minute.line * 3) / 2), 0, radius, false);
    this._ctx.stroke();
    this._ctx.restore();
  },

  drawCurrentSecond: function()
  {
    this._ctx.strokeStyle = this._colors.progress.second;
    this._ctx.fillStyle = this._ctx.strokeStyle;
    this._ctx.lineWidth = this._sizes.progress.second.line;

    this._ctx.save();
    this._ctx.beginPath();
    var radius = this._time.second === 0 ? Math.PI : Math.PI * (this._time.second / 60);
    this._ctx.arc(0, 0, this._sizes.clock.height - ((this._sizes.progress.second.line * 5) / 2), 0, radius, false);
    this._ctx.stroke();
    this._ctx.restore();
  },

  setTime: function(hour, minute)
  {
    this._time.hour = parseInt(hour);
    this._time.minute = parseInt(minute);
    this.redraw();
  },

  tick: function()
  {
    this._time.second += 1;
    if(this._time.second > 59) this.stopTicking();
    this.redraw();
  },

  startTicking: function()
  {
    this._time.second = 0;
    this._secondInterval = window.setInterval(this.tick.bind(this), 1000);
  },

  stopTicking: function()
  {
    if(this._secondInterval) window.clearInterval(this._secondInterval);
    this._secondInterval = null;
  },

  restartTicking: function() {
    this.stopTicking();
    this.startTicking();
  }
};

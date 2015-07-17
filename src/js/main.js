//= require_self
//= require_tree ./lib

window.app = {
  settings: {
    colors: {
      clock: {
        progress: {
          hour: "rgb(15, 59, 82)",
          minute: "rgb(64, 125, 55)",
          second: "rgb(47, 82, 60)"
        }
      },
      clockface: {
        labels: {
          hour: "rgba(247, 236, 192, 0.3)",
          minute: "rgba(247, 236, 192, 0.2)",
        },
        markers: {
          hour: "rgb(247, 236, 192)",
          minute: "rgba(247, 236, 192, 0.5)"
        }
      }
    },
    sizes: {
      clock: {
        clock: {
          height: 500,
          width: 1000
        },
        progress: {
          hour: {
            line: 15
          },
          minute: {
            line: 15
          },
          second: {
            line: 15
          }
        }
      },
      clockface: {
        clock: {
          height: 500,
          width: 1000
        },
        font: {
          hour: {
            size: 16,
            margin: 80
          },
          minute: {
            size: 13,
            margin: 15
          }
        },
        markers: {
          hour: {
            line: 2,
            height: 60,
            shortHeight: 15
          },
          minute: {
            line: 1,
            height: 45
          }
        }
      }
    }
  },

  buffer: null,
  oldBuffer: null,

  bufferstrip: null,
  clock: null,
  clockface: null,
  oldbufferstrip: null,
  resultview: null,
  statusstrip: null,

  socketio: null,

  init: function()
  {
    this.bufferstrip = new Bufferstrip("#buffer");
    this.clock = new Clock("#clock", this.settings.colors.clock,
                           this.settings.sizes.clock);
    this.clockface = new Clockface("#clockface", this.settings.colors.clockface,
                                   this.settings.sizes.clockface);
    this.oldbufferstrip = new Bufferstrip("#oldBuffer");
    this.resultview = new Resultview("#errorContent", "#dataContent", "#error", {
      dow: "#dow",
      day: "#day",
      month: "#month",
      year: "#year",
      hour: "#hour",
      minute: "#minute",
      timezone: "#timezone",
      cest: "#cest",
      cet: "#cet",
      leaps: "#leaps"
    });
    this.statusstrip = new Statusstrip("#status");

    this.bufferstrip.clear();
    this.oldbufferstrip.clear();
    this.clock.init();
    this.clockface.init();
    this.resultview.setErrorNoData();
    this.statusstrip.setWaiting();

    this.newBuffer();
    this.oldBuffer = new Buffer();

    this.socketio = io.connect('http://thehiddentimemachine.schub.io');
    this.socketio.on('dcf77signal', this.buffer.receiveSignal.bind(this.buffer));

    // draw the clockface a half second after the object is initiated
    // to make sure the font is loaded
    // TODO find a better solution...
    window.setTimeout(this.clockface.draw.bind(this.clockface), 500);
  },

  newBuffer: function()
  {
    this.buffer = new Buffer();

    this.buffer.onMinuteMarker(function() {
      this.clock.restartTicking();
      this.bufferstrip.clear();
      this.statusstrip.setReceiving();

      if(this.oldBuffer.isFull()) {
        this.oldbufferstrip.fill(this.oldBuffer);
        if(this.oldBuffer.isValid()) {
          var bufferObject = this.oldBuffer.toObject(),
              hour = BCD.toDecimalR(bufferObject.hour),
              minute = BCD.toDecimalR(bufferObject.minute);
          this.clock.setTime(hour, minute);
          this.resultview.setData(bufferObject);
        } else {
          this.resultview.setErrorInvalidData();
        }
      }
    }.bind(this));

    this.buffer.onSignal(function(buffered, signal) {
      if (buffered) this.bufferstrip.append(signal.getValue());
    }.bind(this));

    this.buffer.onFull(function(buffer) {
      this.statusstrip.setWaiting();
      this.oldBuffer.fromString(buffer);
      buffer.reset();
    }.bind(this));
  }
};

document.addEventListener("DOMContentLoaded", function() {
  app.init();
});

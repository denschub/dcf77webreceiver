function Buffer()
{
  this.reset();
  this._onMinuteMarker = null;
  this._onSignal = null;
  this._onFull = null;
}

Buffer.prototype = {
  receiveSignal: function(signal)
  {
    signal = new Signal(signal);

    if(!this._initiated && signal.isMinuteMarker()) {
      this._initiated = true;
      if(this._onMinuteMarker) this._onMinuteMarker(this);
    }

    if(this._initiated && !this._full) {
      this._signals.push(signal);
      if(this._onSignal) this._onSignal(true, signal);

      if(this._signals.length >= 59) {
        this._full = true;
        if(this._onFull) this._onFull(this);
      }
    } else {
      if(this._onSignal) this._onSignal(false, signal);
    }
  },

  reset: function()
  {
    this._signals = [];
    this._initiated = false;
    this._full = false;
  },

  toString: function()
  {
    return this._signals.join("");
  },

  toObject: function()
  {
    var signalString = this._signals.join("");
    if(!signalString || signalString.length != 59) return false;

    var s = signalString.substr.bind(signalString);
    return {
      minuteMarker: s(0,1),
      weather: s(1,14),
      callingbit: s(15,1),
      timezone: s(16,1),
      cest: s(17,1),
      cet: s(18,1),
      leaps: s(19,1),
      timestart: s(20,1),
      minute: s(21,7),
      minuteP: s(28,1),
      hour: s(29,6),
      hourP: s(35,1),
      day: s(36,6),
      dow: s(42,3),
      month: s(45,5),
      year: s(50,8),
      dateP: s(58,1)
    };
  },

  isFull: function()
  {
    return this._signals.length == 59;
  },

  isValid: function()
  {
    var bufferObject = this.toObject();
    if(!bufferObject) return false;

    return (
      checkParity(bufferObject.minute, bufferObject.minuteP) &&
      checkParity(bufferObject.hour, bufferObject.hourP) &&
      checkParity(
        [
          bufferObject.day,
          bufferObject.dow,
          bufferObject.month,
          bufferObject.year
        ].join(""),
        bufferObject.dateP
       )
     );
  },

  /*
   * todo: maybe set real Signal objects here
   */
  fromString: function(signalString)
  {
    this.reset();
    this._signals = signalString.toString().split("");
    if(this._signals.length >= 59) this._full = true;
  },

  onMinuteMarker: function(callback)
  {
    this._onMinuteMarker = callback;
  },

  onSignal: function(callback)
  {
    this._onSignal = callback;
  },

  onFull: function(callback)
  {
    this._onFull = callback;
  }
};

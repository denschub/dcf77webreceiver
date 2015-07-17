function Signal(data)
{
  this._rawData = data;
  this.parseData();
}

Signal.prototype = {
  splitRegex: /^\[(\d*)\|(\d*)\]$/i,

  parseData: function()
  {
    var dataParts = this._rawData.match(this.splitRegex);
    this._signalBreak = dataParts[1];
    this._signalLength = dataParts[2];
  },

  getValue: function()
  {
    return (this._signalLength > 150 ? 1 : 0);
  },

  isMinuteMarker: function()
  {
    return (this._signalBreak > 1500 ? true : false);
  },

  toString: function()
  {
    return this.getValue().toString();
  }
};

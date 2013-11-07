function Statusstrip(selector)
{
  this._el = document.querySelector(selector);
}

Statusstrip.prototype = {
  setWaiting: function()
  {
    this._el.innerHTML = "Patience please... Waiting for a minute marker...";
  },

  setReceiving: function()
  {
    this._el.innerHTML = "Receiving data...";
  }
};

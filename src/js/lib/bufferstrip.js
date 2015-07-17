function Bufferstrip(selector)
{
  this._el = document.querySelector(selector);
}

Bufferstrip.prototype = {
  clear: function()
  {
    this._el.innerHTML = "";
  },

  append: function(content)
  {
    this._el.innerHTML += content.toString();
  },

  fill: function(content)
  {
    this._el.innerHTML = content.toString();
  }
};

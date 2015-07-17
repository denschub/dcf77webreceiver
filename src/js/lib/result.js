function Resultview(errorCSelector, contentCSelector, errorSelector, contentSelectors)
{
  this._errorContainerEl = document.querySelector(errorCSelector);
  this._contentContainerEl = document.querySelector(contentCSelector);
  this._errorEl = document.querySelector(errorSelector);
  ["dow", "day", "month", "year", "hour", "minute", "timezone", "cest", "cet", "leaps"].forEach(function(el) {
    this["_" + el + "El"] = document.querySelector(contentSelectors[el]);
  }.bind(this));
}

Resultview.prototype = {
  daysOfWeek: [,
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ],

  setData: function(data)
  {
    this._dowEl.innerHTML = this.daysOfWeek[BCD.toDecimalR(data.dow)];

    ["day", "month", "year", "hour", "minute"].forEach(function(el) {
      this["_" + el + "El"].innerHTML = padString(BCD.toDecimalR(data[el]), 2);
    }.bind(this));

    ["timezone", "cest", "cet", "leaps"].forEach(function(el) {
      this["_" + el + "El"].className = data[el] === "1" ? "active" : "";
    }.bind(this));

    this.showContentContainer();
  },

  setErrorNoData: function()
  {
    this.showErrorContainer();
    this._errorEl.innerHTML = "No dataset received so far...";
  },

  setErrorInvalidData: function()
  {
    this.showErrorContainer();
    this._errorEl.innerHTML = "Received an invalid dataset!";
  },

  showErrorContainer: function()
  {
    this._errorContainerEl.style.display = "block";
    this._contentContainerEl.style.display = "none";
  },

  showContentContainer: function()
  {
    this._contentContainerEl.style.display = "block";
    this._errorContainerEl.style.display = "none";
  }
};

var BCD = {
  toDecimal: function(bcd)
  {
    var digit, result = '';
    while((digit = parseInt(bcd.substr(-4), 2)) === (parseInt(digit))) {
      bcd = bcd.substr(0, bcd.length-4);
      if(digit > 9) digit = 9;
      result = digit.toString() + result;
    }
    return parseInt(result);
  },

  toDecimalR: function(bcdR)
  {
    return BCD.toDecimal(bcdR.split("").reverse().join(""));
  },

  toBcd: function(decimal)
  {
    var digit, result = '';
    decimal = decimal.toString().split('');
    decimal.forEach(function(digit) {
      digit = parseInt(digit).toString(2);
      while (digit.length < 4) {
        digit = '0' + digit;
      }
      result += digit;
    });
    return result;
  }
};

function checkParity(value, parityBit)
{
  return (((value + parityBit).split("1").length-1) % 2) === 0;
}

function padString(int, length)
{
  var string = int.toString();
  while (string.length < length) string = "0" + string;
  return string;
}

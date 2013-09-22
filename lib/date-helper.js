"use strict";

// SRC: http://stackoverflow.com/questions/17415579/how-to-iso-8601-format-a-date-with-timezone-offset-in-javascript
function pad(num) {
  var norm = Math.abs(Math.floor(num));
  return (norm < 10 ? '0' : '') + norm;
}

var CuantoDate = function(dateObj) {
  // Cuanto expect Datetime in localised ISO 8601
  return formatLocalDate(dateObj);
};

var formatLocalDate = function(local) {
  var tzo = -local.getTimezoneOffset();
  var sign = tzo >= 0 ? '+' : '-';
  return local.getFullYear() +
    '-' + pad(local.getMonth()+1) +
    '-' + pad(local.getDate()) +
    'T' + pad(local.getHours()) +
    ':' + pad(local.getMinutes()) +
    ':' + pad(local.getSeconds()) +
    sign + pad(tzo / 60) +
    pad(tzo % 60);
};

exports.CuantoDate = CuantoDate;
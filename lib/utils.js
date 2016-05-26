'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.min = min;
exports.split = split;
// like _.min
function min(arr) {
  return arr.map(function (item) {
    return +item;
  }).filter(function (item) {
    return Number.isInteger(item);
  }).reduce(function (current, next) {
    return current < next ? current : next;
  });
}

function merge(list) {
  return list.join(' ').trim();
}

// split by multiple keywords in a sentence, then return [content, keyword, content, ...]
function split(sentence, keys) {
  var _keys = keys;
  if (!(_keys instanceof Array)) {
    _keys = [_keys];
  }
  var result = [];
  var tmp = [];
  var words = sentence.split(' ');
  words.forEach(function (word) {
    if (_keys.indexOf(word) > -1) {
      result.push(merge(tmp));
      result.push(word);
      tmp = [];
    } else {
      tmp.push(word);
    }
  });
  result.push(merge(tmp));
  return result;
}
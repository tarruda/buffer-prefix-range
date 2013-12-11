var bufferPrefixRange = require('../');

assert = require('assert');
for (var k in assert) global[k] = assert[k];


runMocha({
  'Buffer prefix range': {
    'utf8 prefix': function() {
      var range = bufferPrefixRange('prefix-string');
      ok(range.contains('prefix-string'));
      ok(range.contains('prefix-string1'));
      ok(range.contains('prefix-string123'));
      ok(!range.contains('prefix-strinh'));
    },

    'byte prefix': function() {
      var range = bufferPrefixRange(new Buffer([1, 2, 3]));
      ok(range.contains(new Buffer([1, 2, 3])));
      ok(range.contains(new Buffer([1, 2, 3, 4])));
      ok(range.contains(new Buffer([1, 2, 3, 4, 4])));
      ok(!range.contains(new Buffer([1, 2, 2, 4, 4])));
    }
  }
});

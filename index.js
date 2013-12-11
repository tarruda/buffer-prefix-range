var classic = require('classic');
var is = require('is-type');


function compare(l, r) {
  var comp;
  var minLen = Math.min(l.length, r.length);

  for (var i = 0; i < minLen; i++) {
    comp = l[i] - r[i];
    if (comp > 0) return 1;
    else if (comp < 0) return -1;
  }

  return l.length - r.length;
}


var BufferPrefixRange = classic({
  constructor: function BufferPrefixRange(prefix) {
    if (!is.buffer(prefix))
      prefix = new Buffer(prefix.toString(), 'utf8');

    this.start = new Buffer(prefix.length);
    prefix.copy(this.start);
    // The end buffer is calculated from rangeStart by adding 1 to the last
    // byte, which is would make the buffer fall into a different prefix.
    // This may require increasing the end string length;
    var lastByte = prefix[prefix.length - 1];
    if (lastByte === 0xff) {
      // last byte is full, need one extra byte
      this.end = Buffer.concat([prefix, new Buffer([1])]);
    } else {
      this.end = new Buffer(prefix.length);
      prefix.copy(this.end);
      this.end[this.end.length - 1] += 1;
    }
  },

  contains: function(buffer) {
    if (!is.buffer(buffer))
      buffer = new Buffer(buffer.toString(), 'utf8');

    return compare(buffer, this.start) >= 0 && compare(buffer, this.end) < 0;
  }
  
});

module.exports = function bufferPrefixRange(prefix) {
  return new BufferPrefixRange(prefix);
};

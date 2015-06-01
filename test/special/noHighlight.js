'use strict';

var _ = require('lodash');

describe('no highlighting', function() {
  before(function() {
    var testHTML = document.querySelectorAll('#no-highlight pre');

    this.blocks = _.map(testHTML, _.property('children[0]'));
  });

  it('should keep block unchanged (nohighlight)', function() {
    var expected = '&lt;div id="contents"&gt;\n  ' +
                   '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
        actual   = this.blocks[0].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (no-highlight)', function() {
    var expected = '&lt;div id="contents"&gt;\n  ' +
                   '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
        actual   = this.blocks[1].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (plain)', function() {
    var expected = '&lt;div id="contents"&gt;\n  ' +
                   '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
        actual   = this.blocks[2].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (text)', function() {
    var expected = '&lt;div id="contents"&gt;\n  ' +
                   '&lt;p&gt;Hello, World!\n&lt;/div&gt;',
        actual   = this.blocks[3].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (unsupported language)', function() {
    var expected = 'for x in [1, 2, 3]: count(x)',
        actual   = this.blocks[5].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (unsupported lang)', function() {
    var expected = 'for x in [1, 2, 3]: count(x)',
        actual   = this.blocks[6].innerHTML;

    actual.should.equal(expected);
  });

  it('should keep block unchanged (unsupported prefixed language)', function() {
    var expected = 'for x in [1, 2, 3]: count(x)',
        actual   = this.blocks[7].innerHTML;

    actual.should.equal(expected);
  });

  it('should skip pre tags without a child code tag', function() {
    var expected = 'Computer output',
        actual   = this.blocks[4].innerHTML;

    actual.should.equal(expected);
  });
});

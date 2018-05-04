import classnames from './helper';

const { module, test } = QUnit;

module('Helper: classnames', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(classnames([]), undefined);
  });
});

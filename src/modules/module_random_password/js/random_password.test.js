import { scorePasswdFunction } from './random_password.table.mod';

const assert = require('assert');

describe('scorePasswd() should return proper value', function () {
    it('should return "85" for "8ho%od4eB-c4"', function () {
        assert.equal(85, scorePasswdFunction('8ho%od4eB-c4'));
    });
});

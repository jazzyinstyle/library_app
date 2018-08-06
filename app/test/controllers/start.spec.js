const { describe, it } = require('mocha');
const should = require('chai').should(); // refer to chaijs.com/api/bdd

describe('Basic Mocha Test', function () {
  it('should deal with objects', function () {
    const obj1 = { name: 'Jon', gender: 'male' };
    const obj2 = { name: 'Jon', gender: 'male' };

    obj1.should.deep.equal(obj2); // Comparing object using 'deep'
  });

  it('should allow testing nulls', function () {
    const iAmNull = null;
    should.not.exist(iAmNull);
  });
});

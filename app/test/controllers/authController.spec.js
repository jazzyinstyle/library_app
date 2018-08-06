require('../setup');
const { describe, it, beforeEach } = require('mocha');
const should = require('chai').should(); // refer to chaijs.com/api/bdd
const sinon = require('sinon');
// const assert = require('assert');
// const { expect } = require('chai');
const authController = require('../../controllers/authController');

describe('AuthController', function () {
  beforeEach('This function is setting up the Roles', function settingRoles() {
    authController.setRoles(['admin', 'user']);
  });

  describe('isAuthorized', function () {
    let user = {};
    beforeEach(function () {
      user = {
        roles: ['admin', 'user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
      sinon.spy(user, 'isAuthorized');
      authController.setUser(user);
    });

    it('Should return false if Not Authorized', function (done) {
      // this.timeout(3000); // Accesses mocha.timeout function and changes the timeout setting
      // assert.equal(4, 4);
      // setTimeout(() => {
      //   done();
      // }, 2500);
      const isAuth = authController.isAuthorized('guest');
      user.isAuthorized.calledOnce.should.be.true;
      isAuth.should.be.false;
      // authController.should.have.property('roles').equal('Test');

      done(); // 'done' is used to wait for async callback and signal when it's done
    });

    it('Should return true if Authorized', function (done) {
      const isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
      done(); // 'done' is used to wait for async callback and signal when it's done
    });

    it('Should only allow Post'); // Pending Test   
  });

  describe.only('getIndex', function () {
    let user = {};
    beforeEach(function () {
      user = {
        roles: ['admin', 'user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      };
    });

    it('should render index', function () {
      const isAuth = sinon.stub(user, 'isAuthorized').returns(true);
      const req = { user };
      const res = {
        render: function () { }
      };

      const mock = sinon.mock(res);
      mock.expects('render').once().withExactArgs('index');

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;

      mock.verify();
    });
  });
});

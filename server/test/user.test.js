/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
// const User = require('../models/User.js');
const userController = require('../controllers/userController');
require('dotenv').config({ path: '.env.development' });


describe('it should add two numbers together', () => {
  it('adds 3 + 7', () => {
    expect(3 + 7).to.equal(10);
  });
});

describe('Registration form validation', () => {
  let status;
  let json;
  let res;
  let next;

  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    next = sinon.spy(next);
    res = { json, status };
    status.returns(res);
  });

  describe('User email validation', () => {
    it('should not allow an empty email', async () => {
      const req = { body: { email: '', password: '123456789' } };
      const response = userController.validateUser(req, res, next);
      expect(response).to.not.be.empty;
      expect(response).to.contain('Please enter a valid email address');
    });

    it('should not allow an email address without @ e.g. email:"loremipsum"', () => {
      const req = { body: { email: 'loremipsum', password: '123456789' } };
      const response = userController.validateUser(req, res, next);
      expect(response).to.not.be.empty;
      expect(response).to.contain('Please enter a valid email address');
    });

    it('should not allow an email address of format email:"lorem@ipsum', () => {
      const req = { body: { email: 'lorem@ipsum', password: '123456789' } };
      const response = userController.validateUser(req, res, next);
      expect(response).to.not.be.empty;
      expect(response).to.contain('Please enter a valid email address');
    });

    it('should allow an email of format lorem@ipsum.com', () => {
      const req = { body: { email: 'lorem@ipsum.com', password: '123456789' } };
      const response = userController.validateUser(req, res, next);
      expect(response).to.be.undefined;
    });
  });


  describe('User password validation', () => {
    it('should not allow an empty password', async () => {
      const req = { body: { email: 'lorem@ipsum.com', password: '' } };
      const response = userController.validateUser(req, res, next);
      expect(response).to.not.be.empty;
      expect(response).to.contain('Password must have at least 8 characters');
    });

    it('should not allow a password with less than 8 characters', () => {
      const req = { body: { email: 'loremipsum', password: '1234567' } };
      const response = userController.validateUser(req, res, next);
      expect(response).to.not.be.empty;
      expect(response).to.contain('Password must have at least 8 characters');
    });

    it('should allow a password with 8 characters', () => {
      const req = { body: { email: 'lorem@ipsum.com', password: '12345678' } };
      const response = userController.validateUser(req, res, next);
      expect(response).to.be.undefined;
    });
  });
});

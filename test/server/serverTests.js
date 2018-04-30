// var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;

const serverUrl = 'http://localhost:3000';

exports.logIn = function() {
    describe('server', function() {
        var requestParams = {method: 'POST',
        uri: `${serverUrl}/auth/login`,
        json: {
            email: 'nicky@jam.com',
            password: 'nickyjam'}
        };

        it('responds with a false boolean when logging in with incorrect credentials', function(done) {
            request(requestParams , function(err, res, body) {
            expect(body).to.equal(false);
            done();
            });
        });
    });
}


     




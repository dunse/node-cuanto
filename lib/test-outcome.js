"use strict";

var request = require('request');

module.exports = function(baseUrl) {
  return {
    get: function(testOutcomeId, next) {
      var context = '/api/getTestOutcome/' + testOutcomeId;
      request.get({url: baseUrl + context, json: true}, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    },
    getTestOutput: function(testOutcomeId, next) {
      var context = '/api/getTestOutput/' + testOutcomeId;
      request.get(baseUrl + context, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    },
    add: function(outcome, next) {
      var context = '/api/addTestOutcome/';
      request.post({
        url: baseUrl + context,
        json: true,
        body: outcome
      }, function(error, response, body) {
        if (response.statusCode === 201) {
          return next(null, body);
        }
        return next(error || body);
      });
    }
  };
};

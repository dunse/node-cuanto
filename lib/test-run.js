"use strict";

var request = require('request');

module.exports = function(baseUrl) {
  return {
    get: function(testRunId, next) {
      var context = '/api/getTestRun/' + testRunId;
      request.get({url: baseUrl + context, json: true}, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    },
    add: function(testRun, next) {
      var context = '/api/addTestRun/';
      request.post({
        url: baseUrl + context,
        json: true,
        body: testRun
      }, function(error, response, body) {
        if (response.statusCode === 201) {
          return next(null, body);
        }
        return next(error || body);
      });
    },
    remove: function(testRunId, next) {
      var context = '/api/deleteTestRun/' + testRunId;
      request.post(baseUrl + context, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    }
  };
};

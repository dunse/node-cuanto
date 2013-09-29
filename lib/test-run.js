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
    },
    /**
     * This fetches TestOutcomes that are associated with a particular TestRun.
     * You can fetch a maximum of 100 TestOutcomes at a time.
     *
     * Valid opts are:
     *   sort: (Default: dateExecuted)
     *     fullName, testResult, state (analysis state), duration, bug (bug title), owner, note, testOutput,
     *     dateCreated, finishedAt, lastUpdated, startDate, dateExecuted.
     *   order: (Default: desc)
     *     asc, desc
     *   max: (Default: 100)
     *     1-X (maximum number of TestOutcomes to return)
     *   offset: (Default: 0)
     *     0-X (offset of TestOutcomes to return. 0-based.)
     * @param testRunId
     * @param opts
     * @param next
     */
    getTestOutcomes: function(testRunId, opts, next) {
      var context = '/api/getTestOutcomes';
      var qs = {
        sort: 'dateExecuted',
        order: 'desc',
        max: 100,
        offset: 0
      }
      if (typeof opts === 'function') {
        next = opts;
        opts = {};
      }
      Object.keys(opts).forEach(function(key) {
        qs[key] = opts[key];
      })
      request.get({url: baseUrl + context, json: true}, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    }
  };
};

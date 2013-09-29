"use strict";

var request = require('request');

module.exports = function(baseUrl) {
  return {
    exists: function(projectKey, next) {
      this.get(projectKey, function(err) {
        if (err) { return next(null, false); }
        return next(null, true);
      });
    },
    get: function(projectKey, next) {
      var context = '/api/getProject/';
      request.post({
        url: baseUrl + context,
        json: true,
        qs: {
          projectKey: projectKey
        }
      }, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    },
    add: function(project, next) {
      var context = '/api/addProject/';
      request.post({
        url: baseUrl + context,
        json: true,
        body: project
      }, function(error, response, body) {
        if (response.statusCode === 201) {
          return next(null, body);
        }
        return next(error || body);
      });
    },
    remove: function(projectKey, next) {
      var context = '/api/deleteProject/';
      request.post({
        url: baseUrl + context,
        qs: {
          projectKey: projectKey
        }
      }, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    },
    getAllTestRuns: function(projectKey, next) {
      var context = '/api/getAllTestRuns';
      request.get({
        url: baseUrl + context,
        qs: {
          projectKey: projectKey
        }
      }, function(error, response, body) {
        if (response.statusCode === 200) {
          return next(null, body);
        }
        return next(error || body);
      });
    }
  };
};
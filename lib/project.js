"use strict";

var request = require("request");

module.exports = function (baseUrl) {
  var defaultResponse = function(next, code) {
    var statusCode = code || 200;
    return function (error, response, body) {
      if (response && response.statusCode === statusCode) {
        return next(null, body);
      }
      return next(error || body);
    };
  }
  return {
    _post: function (options, next) {
      request.post(options, next);
    },
    _get: function (options, next) {
      request.get(options, next);
    },
    exists: function (projectKey, next) {
      this.get(projectKey, function (err) {
        if (err) {
          return next(null, false);
        }
        return next(null, true);
      });
    },
    get: function (projectKey, next) {
      var context = "/api/getProject/";
      this._post({
        url: baseUrl + context,
        json: true,
        qs: {
          projectKey: projectKey
        }
      }, defaultResponse(next));
    },
    add: function (project, next) {
      var context = "/api/addProject/";
      this._post({
        url: baseUrl + context,
        json: true,
        body: project
      }, defaultResponse(next, 201));
    },
    remove: function (projectKey, next) {
      var context = "/api/deleteProject/";
      this._post({
        url: baseUrl + context,
        qs: {
          projectKey: projectKey
        }
      }, defaultResponse(next));
    },
    getAllTestRuns: function (projectKey, next) {
      var context = "/api/getAllTestRuns";
      this._get({
        url: baseUrl + context,
        json: true,
        qs: {
          projectKey: projectKey
        }
      }, function (error, response, body) {
        if (response && response.statusCode === 200) {
          return next(null, body.testRuns);
        }
        return next(error || body);
      });
    },
    list: function (next) {
      var context = "/api/getAllProjects";
      this._get({
        url: baseUrl + context,
        json: true
      }, defaultResponse(next));
    }
  };
};

"use strict";

module.exports = function(name, projectKey) {
  var self = this;
  self.name = name;
  self.projectKey = projectKey;
  self.testType = 'Manual';

  self.setProjectGroup = function(projectGroup) {
    self.projectGroup = projectGroup;
  };
  self.setTestType = function(testType) {
    self.testType = testType;
  };
};
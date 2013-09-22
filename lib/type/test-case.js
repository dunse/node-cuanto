"use strict";

module.exports = function(testName, packageName) {
  var self = this;
  self.testName = testName;
  self.packageName = packageName;
  self.setDescription = function(description) {
    self.description = description;
  };
  self.setParameters = function(parameters) {
    self.parameters = parameters;
  };
  self.setId = function(id) {
    self.id = id;
  };
};
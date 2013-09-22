"use strict";

var dateHelper = require(__dirname + '/../date-helper');

module.exports = function(projectKey, dateExecuted) {
  var self = this;
  self.valid = true;
  self.projectKey = projectKey;
  self.dateExecuted = dateHelper.CuantoDate(dateExecuted);
  self.setTestProperties = function(testProperties) {
    self.testProperties = testProperties;
  };
  self.setLinks = function(links) {
    self.links = links;
  };
  self.setNote = function(note) {
    self.note = note;
  };
  self.setValid = function(valid) {
    self.valid = valid;
  };
  self.setId = function(id) {
    self.id = id;
  };
};
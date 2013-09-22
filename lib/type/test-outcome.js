"use strict";

var dateHelper = require(__dirname + '/../date-helper');

module.exports = function(projectKey, testRun, testCase) {
  var self = this;
  self.projectKey = projectKey;
  self.testRun = testRun;
  self.testCase = testCase;

  self.setResult = function(result) {
    self.result = result;
  };
  self.setFailureStatusChanged = function(isFailureStatusChanged) {
    self.isFailureStatusChanged = isFailureStatusChanged;
  };
  self.setStartedAt = function(startedAt) {
    self.startedAt = dateHelper.CuantoDate(startedAt);
  };
  self.setDuration = function(duration) {
    self.duration = duration;
  };
  self.setAnalysisState = function(analysisState) {
    self.analysisState= analysisState;
  };
  self.setTestOutput = function(testOutput) {
    self.testOutput = testOutput;
  };
  self.setFinishedAt = function(finishedAt) {
    self.finishedAt = dateHelper.CuantoDate(finishedAt);
  };
  self.setOwner = function(owner) {
    self.owner = owner;
  };
  self.setNote = function(note) {
    self.note = note;
  };
  self.setId = function(id) {
    self.id = id;
  };
};
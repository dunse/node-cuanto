"use strict";

var should = require('should');
var url = process.env.CUANTO_TEST_URL || 'http://localhost:8080/cuanto';

var cuanto = require(__dirname + '/../index')(url);
var assets = require('./_assets');
var project = new cuanto.type.Project(assets.project, assets.project);

describe('cuanto', function() {
  describe('project', function() {
    before(function(done) {
      cuanto.project.remove(project.projectKey, function(err, res) {
        done();
      });
    });

    it('project should not exist', function(done) {
      cuanto.project.exists(project.projectKey, function(err, res) {
        should.not.exist(err);
        res.should.equal(false);
        done();
      });
    });

    it('is possible to add project', function(done) {
      cuanto.project.add(project, function(err, res) {
        should.not.exist(err);
        should.exist(res.id);
        done();
      });
    });

    it('is not allowed to add project twice', function(done) {
      cuanto.project.add(project, function(err, res) {
        should.exist(err);
        done();
      });
    });

    it('project should exist', function(done) {
      cuanto.project.exists(project.projectKey, function(err, res) {
        should.not.exist(err);
        res.should.equal(true);
        done();
      });
    });

    it('is possible to get project', function(done) {
      cuanto.project.get(project.projectKey, function(err, res) {
        should.not.exist(err);
        assets.project.should.equal(res.name);
        done();
      });
    });

    it('is possible to remove project', function(done) {
      cuanto.project.remove(project.projectKey, function(err, res) {
        should.not.exist(err);
        done();
      });
    });

    it('is not possible to remove project twice', function(done) {
      cuanto.project.remove(project.projectKey, function(err, res) {
        should.exist(err);
        done();
      });
    });
  });


  describe('testRun', function() {
    var testRunId = -1;
    before(function(done) {
      cuanto.project.remove(project.projectKey, function(err, res) {
        cuanto.project.add(project, function(err, res) {
          should.not.exist(err);
          done();
        });
      });
    });

    after(function(done) {
      cuanto.project.remove(assets.project, function(err, res) {
        should.not.exist(err);
        done();
      });
    });

    it('testRun should not exist', function(done) {
      cuanto.testRun.get(testRunId, function(err, res) {
        should.exist(err);
        done();
      });
    });

    it('is possible to add testRun', function(done) {
      var testRun = new cuanto.type.TestRun(project.projectKey, new Date());
      cuanto.testRun.add(testRun, function(err, res) {
        should.not.exist(err);
        should.exist(res.id);
        testRunId = res.id;
        done();
      });
    });

    it('is possible to get all test runs from projectKey', function(done) {
      cuanto.project.getAllTestRuns(project.projectKey, function(err, res) {
        should.not.exist(err);
        assets.project.should.equal(res[0].project.name);
        done();
      });
    });

    it('is possible to remove testRun', function(done) {
      cuanto.testRun.remove(testRunId, function(err, res) {
        should.not.exist(err);
        done();
      });
    });

    it('is not possible to remove testRun twice', function(done) {
      cuanto.testRun.remove(testRunId, function(err, res) {
        should.exist(err);
        done();
      });
    });
  });

  describe('testOutcome', function() {
    var testRun;
    var testCase = new cuanto.type.TestCase('my.package', 'mytest');

    before(function(done) {
      cuanto.project.remove(project.projectKey, function(err, res) {
        cuanto.project.add(project, function(err, res) {
          testRun = new cuanto.type.TestRun(project.projectKey, new Date());
          cuanto.testRun.add(testRun, function(err, res) {
            testRun.setId(res.id);
            done();
          });
        });
      });
    });

    after(function(done) {
      cuanto.project.remove(project.projectKey, function(err, res) {
        should.not.exist(err);
        done();
      });
    });

    it('is possible to add testOutcome', function(done) {
      var outcome = new cuanto.type.TestOutcome(project.projectKey, testRun, testCase);
      outcome.setResult("Pass");
      outcome.setStartedAt(new Date());
      outcome.setTestOutput(assets.testOutput);
      cuanto.testOutcome.add(outcome, function(err, res) {
        should.not.exist(err);
        should.exist(res.id);
        done();
      });
    });

    it('is possible to add and get testOutcome', function(done) {
      var outcome = new cuanto.type.TestOutcome(project.projectKey, testRun, testCase);
      outcome.setResult("Fail");
      outcome.setStartedAt(new Date());
      outcome.setTestOutput(assets.testOutput);
      cuanto.testOutcome.add(outcome, function(err, res) {
        should.not.exist(err);
        should.exist(res.id);
        cuanto.testOutcome.get(res.id, function(err, res) {
          should.not.exist(err);
          testCase.packageName.should.equal(res.testCase.packageName);
          testCase.testName.should.equal(res.testCase.testName);
          done();
        });
      });
    });

    it('is possible to get TestOutput', function(done) {
      var outcome = new cuanto.type.TestOutcome(project.projectKey, testRun, testCase);
      outcome.setResult("Pass");
      outcome.setStartedAt(new Date());
      outcome.setTestOutput(assets.testOutput);
      cuanto.testOutcome.add(outcome, function(err, res) {
        should.not.exist(err);
        should.exist(res.id);
        cuanto.testOutcome.getTestOutput(res.id, function(err, res) {
          should.not.exist(err);
          testCase.packageName.should.equal(res[0].testCase.packageName);
          testCase.testName.should.equal(res[0].testCase.testName);
          done();
        });
      });
    });

    it('is possible to get all outcomes from testRun', function(done) {
      cuanto.testRun.getTestOutcomes(testRun.id, function(err, res) {
        should.not.exist(err);
        assets.project.should.equal(res[0].project.name);
        done();
      });
    });

  });
});

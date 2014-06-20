"use strict";
global.sinon = require("sinon");
global.chai = require("chai");
global.should = chai.Should();
chai.use(require("sinon-chai"));

describe("lib/project", function () {
  var next;
  var cuanto;

  beforeEach(function () {
    next = sinon.stub();
    cuanto = require(__dirname + "/../index")("http://myurl");
    cuanto.project._get = sinon.stub();
    cuanto.project._post = sinon.stub();
  });

  describe("exists", function () {
    it("should return true on success", function () {
      cuanto.project.get = sinon.stub();
      cuanto.project.exists("DoesExist", next);

      cuanto.project.get.yield(null);

      next.should.have.been.calledWith(null, true);
    });

    it("exists should return false in case of error", function () {
      cuanto.project.get = sinon.stub();
      cuanto.project.exists("DoesNotExist", next);

      cuanto.project.get.yield("Error");

      next.should.have.been.calledWith(null, false);
    });
  });

  describe("get", function () {
    it("should return body on success", function () {
      cuanto.project.get("projectKey", next);

      cuanto.project._post.yield(null, {statusCode: 200}, "TheBody");

      next.should.have.been.calledWith(null, "TheBody");
    });

    it("should return error if set and response is null", function () {
      cuanto.project.get("projectKey", next);

      cuanto.project._post.yield("MyError", null, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return error if set and statusCode is not 200", function () {
      cuanto.project.get("projectKey", next);

      cuanto.project._post.yield("MyError", {statusCode: 100}, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return body as error if error is null and statusCode is not 200", function () {
      cuanto.project.get("projectKey", next);

      cuanto.project._post.yield(null, {statusCode: 100}, "TheBody");

      next.should.have.been.calledWith("TheBody");
    });
  });

  describe("add", function () {
    it("should return body on success", function () {
      cuanto.project.add("project", next);

      cuanto.project._post.yield(null, {statusCode: 201}, "TheBody");

      next.should.have.been.calledWith(null, "TheBody");
    });

    it("should return error if set and response is null", function () {
      cuanto.project.add("project", next);

      cuanto.project._post.yield("MyError", null, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return error if set and statusCode is not 201", function () {
      cuanto.project.add("project", next);

      cuanto.project._post.yield("MyError", {statusCode: 100}, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return body as error if error is null and statusCode is not 201", function () {
      cuanto.project.add("project", next);

      cuanto.project._post.yield(null, {statusCode: 100}, "TheBody");

      next.should.have.been.calledWith("TheBody");
    });
  });

  describe("remove", function () {
    it("should return body on success", function () {
      cuanto.project.remove("projectKey", next);

      cuanto.project._post.yield(null, {statusCode: 200}, "TheBody");

      next.should.have.been.calledWith(null, "TheBody");
    });

    it("should return error if set and response is null", function () {
      cuanto.project.remove("projectKey", next);

      cuanto.project._post.yield("MyError", null, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return error if set and statusCode is not 200", function () {
      cuanto.project.remove("projectKey", next);

      cuanto.project._post.yield("MyError", {statusCode: 100}, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return body as error if error is null and statusCode is not 200", function () {
      cuanto.project.remove("projectKey", next);

      cuanto.project._post.yield(null, {statusCode: 100}, "TheBody");

      next.should.have.been.calledWith("TheBody");
    });
  });

  describe("getAllTestRuns", function () {
    it("should return body on success", function () {
      cuanto.project.getAllTestRuns("projectKey", next);

      cuanto.project._get.yield(null, {statusCode: 200}, {testRuns: "TheBody"});

      next.should.have.been.calledWith(null, "TheBody");
    });

    it("should return error if set and response is null", function () {
      cuanto.project.getAllTestRuns("projectKey", next);

      cuanto.project._get.yield("MyError", null, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return error if set and statusCode is not 200", function () {
      cuanto.project.getAllTestRuns("projectKey", next);

      cuanto.project._get.yield("MyError", {statusCode: 100}, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return body as error if error is null and statusCode is not 200", function () {
      cuanto.project.getAllTestRuns("projectKey", next);

      cuanto.project._get.yield(null, {statusCode: 100}, "TheBody");

      next.should.have.been.calledWith("TheBody");
    });
  });

  describe("list", function () {
    it("should return body on success", function () {
      cuanto.project.list(next);

      cuanto.project._get.yield(null, {statusCode: 200}, "TheBody");

      next.should.have.been.calledWith(null, "TheBody");
    });

    it("should return error if set and response is null", function () {
      cuanto.project.list(next);

      cuanto.project._get.yield("MyError", null, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return error if set and statusCode is not 200", function () {
      cuanto.project.list(next);

      cuanto.project._get.yield("MyError", {statusCode: 100}, null);

      next.should.have.been.calledWith("MyError");
    });

    it("should return body as error if error is null and statusCode is not 200", function () {
      cuanto.project.list(next);

      cuanto.project._get.yield(null, {statusCode: 100}, "TheBody");

      next.should.have.been.calledWith("TheBody");
    });
  });
});

"use strict";

module.exports = function(url) {
  return {
    project: require(__dirname + '/lib/project')(url),
    testRun: require(__dirname + '/lib/test-run')(url),
    testOutcome: require(__dirname + '/lib/test-outcome')(url),
    type: {
      Project: require(__dirname + '/lib/type/project'),
      TestCase: require(__dirname + '/lib/type/test-case'),
      TestOutcome: require(__dirname + '/lib/type/test-outcome'),
      TestRun: require(__dirname + '/lib/type/test-run')
    }
  };
};
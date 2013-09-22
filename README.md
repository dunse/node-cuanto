# node-cuanto

Client library for [Cuanto](http://www.trackyourtests.com/),
based on [Cuanto JSON API](http://docs.codehaus.org/display/CUANTO/Cuanto+JSON+API).

[![NPM](https://nodei.co/npm/cuanto.png)](https://nodei.co/npm/cuanto/)

## Usage
```javascript
var cuanto = require('cuanto')('http://your.server/cuanto');
var project = new cuanto.type.Project('MyProject', 'MYP');
cuanto.project.add(project, function(err, res) {
  if (err) { /* Error */ }
  var testRun = new cuanto.type.TestRun(project.projectKey, new Date());
  cuanto.testRun.add(testRun, function(err, res) {
    if (err) { /* Error */ }
    console.log(res.id); // TestRun's Id
  });
});
```

## API
### Types
#### Project
```javascript
var project = new cuanto.type.Project(<Name>, <ProjectKey>);
project.setProjectGroup(String);
project.setTestType(String);
```

#### TestRun
```javascript
var testRun = new cuanto.type.TestRun(projectKey, dateExecuted);
testRun.setTestProperties({'Name': 'Value', 'Name2': 'Value2'});
testRun.setLinks({'Link1', 'Link2'});
testRun.setNote(String);
testRun.setValid(Boolean);
testRun.setId(Number);
```

#### TestCase
```javascript
var testCase = new cuanto.type.TestCase(testName, packageName);
testCase.setDescription(String);
testCase.setParameters(String);
testCase.setId(Number);
```

#### TestOutcome
```javascript
var testOutcome = new cuanto.type.TestOutcome(projectKey, testRun, testCase);
testOutcome.setResult(String);
testOutcome.setFailureStatusChanged(Boolean);
testOutcome.setStartedAt(Date);
testOutcome.setDuration(Number);
testOutcome.setAnalysisState(String);
testOutcome.setTestOutput(String);
testOutcome.setFinishedAt(Date);
testOutcome.setOwner(String);
testOutcome.setNote(String);
testOutcome.setId(Number);
```

### Clients
#### Project
```javascript
cuanto.project.exists(projectKey, function(err, Boolean) {});
cuanto.project.get(projectKey, function(err, ProjectJSON) {});
cuanto.project.add(Project, function(err, ProjectJSON) {});
cuanto.project.remove(projectKey, function(err) {});
```

#### TestRun
```javascript
cuanto.testRun.get(testRunId, function(err, TestRunJSON) {});
cuanto.testRun.add(TestRun, function(err, TestRunJSON) {});
cuanto.testRun.remove(testRunId, function(err) {});
```

#### TestOutcome
```javascript
cuanto.testOutcome.get(testOutcomeId, function(err, TestOutcomeJSON) {});
cuanto.testOutcome.getTestOutput(testOutcomeId, function(err, TestOutputString) {});
cuanto.testOutcome.add(TestOutcome, function(err, TestOutcomeJSON) {});
```
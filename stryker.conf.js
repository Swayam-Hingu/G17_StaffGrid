module.exports = {
    testRunner: "mocha",
    coverageAnalysis : "perTest",
    mochaOptions: {
      spec: [ "./Documents/testing-documents/unit-test-backend/test/*.js" ],
      config: "path/to/mocha/config/.mocharc.json",
      package: "package.json",
      opts: "path/to/custom/mocha.opts",
      ui: "bdd",
      require: [ "babel-register" ],
      grep: ".*"
    }
}
// @ts-nocheck
module.exports = {
    testRunner: "mocha",
    coverageAnalysis : "perTest",
    mochaOptions: {
      spec: [ "test//*.js" ],
      config: "path/to/mocha/config/.mocharc.json",
      package: "package.json",
      opts: "path/to/custom/mocha.opts",
      ui: "bdd",
      require: [ "babel-register" ],
      grep: ".*"
    }
}
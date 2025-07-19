module.exports = {
  "extension": ["ts"],
  "spec": "tests/api/mocha/*.test.ts",
  "require": ["ts-node/register", "framework/mocha/mochaHooks.ts"],
  "timeout": 10000,
  // "parallel": true,
  // "jobs": 3
}

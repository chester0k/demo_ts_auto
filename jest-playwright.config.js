module.exports = {
  browsers: ['chromium'],
  exitOnPageError: false, // GitHub currently throws errors
  launchOptions: {
    headless: false,
    actionTimeout: 5
  },
  parallelization: 2
};

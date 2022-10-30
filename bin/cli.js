const core = require('@actions/core');
// TODO: It's for development, so it's excluded from the build target.
const parseArgs = require('minimist');

const commandArgs = parseArgs(process.argv.slice(2));
const baseBranchName = core.getInput('base-branch-name') || commandArgs['base-branch-name'] || "";

import('../lib/main.mjs').then(({main}) => {
  try {
    main(baseBranchName);
  } catch (error) {
    core.setFailed(error.message);
  }
});

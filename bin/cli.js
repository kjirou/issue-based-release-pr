const core = require('@actions/core');
// TODO: It's for development, so it's excluded from the build target.
const parseArgs = require('minimist');

const commandArgs = parseArgs(process.argv.slice(2));
const baseBranchName = core.getInput('base-branch-name') || commandArgs['base-branch-name'] || "";
const githubToken = core.getInput('github-token') || commandArgs['github-token'] || "";

import('../lib/main.mjs').then(async ({main}) => {
  try {
    await main({baseBranchName, githubToken});
  } catch (error) {
    core.setFailed(error.message);
  }
});

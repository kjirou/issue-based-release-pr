const core = require('@actions/core');

try {
  const baseBranchName = core.getInput('base-branch-name');
  console.log(`Hello ${baseBranchName}!`);
  throw new Error('ERROR!!!');
} catch (error) {
  core.setFailed(error.message);
}

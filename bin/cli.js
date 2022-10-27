const core = require('@actions/core');

try {
  const baseBranchName = core.getInput('base-branch-name');
  console.log(`Hello ${baseBranchName}!`);
} catch (error) {
  core.setFailed(error.message);
}

import github from "@actions/github";

/**
 * @param {object} params
 * @param {string} [params.baseBranchName]
 * @param {string} [params.githubToken]
 * @param {string} [params.rawRepo]
 * @return void
 */
export const main = async (params) => {
  const { baseBranchName, githubToken, rawRepo } = params;
  let owner = "";
  let repo = "";
  if (rawRepo !== "") {
    [owner, repo] = rawRepo.split("/");
  } else {
    // NOTE: GITHUB_REPOSITORY 環境変数がない状況で `github.context.repo` を呼び出すとエラーになる。
    //       https://github.com/actions/toolkit/blob/2b97eb3192ed27ad81a555e87f3f9de61c11a213/packages/github/src/context.ts#L64-L79
    try {
      owner = github.context.repo.owner;
      repo = github.context.repo.repo;
    } catch (error) {
      if (/a GITHUB_REPOSITORY environment/.test(error.message)) {
        [owner, repo] = rawRepo.split("/");
      } else {
        throw error;
      }
    }
  }
  const octokit = github.getOctokit(githubToken);
  const result = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "closed",
  });
  console.log("main.js here!");
  console.log("baseBranchName", baseBranchName);
  console.log(result);
};

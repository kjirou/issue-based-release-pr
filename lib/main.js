const github = require("@actions/github");

const parseStringLikeGithubRepository = (stringLikeGithubRepository) => {
  const pair = stringLikeGithubRepository.split("/");
  if (pair.length === 2) {
    return {
      owner: pair[0],
      repo: pair[1],
    };
  }
  return {
    owner: "",
    repo: "",
  };
};

/**
 * @param {string} stringLikeGithubRepository Probably a string in `{owner}/{repo}` format.
 *                                            Ref) GITHUB_REPOSITORY environment variable
 * @param {Object} actionsGitHub The default export of "@actions/github".
 * @returns
 */
const deriveOwnerAndRepo = (stringLikeGithubRepository, actionsGitHub) => {
  if (stringLikeGithubRepository !== "") {
    return parseStringLikeGithubRepository(stringLikeGithubRepository);
  } else {
    // NOTE: GITHUB_REPOSITORY 環境変数がない状況で `github.context.repo` を呼び出すとエラーになる。
    //       https://github.com/actions/toolkit/blob/2b97eb3192ed27ad81a555e87f3f9de61c11a213/packages/github/src/context.ts#L64-L79
    try {
      return {
        owner: actionsGitHub.context.repo.owner,
        repo: actionsGitHub.context.repo.repo,
      };
    } catch (error) {
      if (/a GITHUB_REPOSITORY environment/.test(error.message)) {
        return {
          owner: "",
          repo: "",
        };
      } else {
        throw error;
      }
    }
  }
};

/**
 * @param {object} params
 * @param {string} [params.baseBranchName]
 * @param {string} [params.githubToken]
 * @param {string} [params.rawRepo]
 * @return void
 */
const main = async (params) => {
  const { baseBranchName, githubToken, rawRepo } = params;
  const { owner, repo } = deriveOwnerAndRepo(rawRepo, github);
  const octokit = github.getOctokit(githubToken);
  // TODO: commit の compare をして、そこから紐づく PR が取れるのを確認する。
  //       一発で取れそうな方法はなさそう？
  //       - そもそも actions/github に List commits 自体がない・・・？
  //         - actions/github を介した生 REST 送信方法が必要かも
  //       base=main, head=sample_head_branch で確認する。
  const result = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "closed",
  });
  console.log("main.js here!");
  console.log("baseBranchName", baseBranchName);
  console.log(result);
};

module.exports = {
  deriveOwnerAndRepo,
  main,
};

const github = require("@actions/github");
const { deriveOwnerAndRepo } = require("./main");

describe("deriveOwnerAndRepo", () => {
  const originalGithubRepository = process.env.GITHUB_REPOSITORY;
  afterEach(() => {
    process.env.GITHUB_REPOSITORY = originalGithubRepository;
  });
  test("refers GITHUB_REPOSITORY environment variable", () => {
    process.env.GITHUB_REPOSITORY = "foo/bar";
    const actual = deriveOwnerAndRepo("", github);
    expect(actual).toStrictEqual({ owner: "foo", repo: "bar" });
  });
  test("gives preference to the first argument", () => {
    process.env.GITHUB_REPOSITORY = "foo_owner/bar_repo";
    const actual = deriveOwnerAndRepo("x/y", github);
    expect(actual).toStrictEqual({ owner: "x", repo: "y" });
  });
  test("returns an empty value if the both are empty", () => {
    const actual = deriveOwnerAndRepo("", github);
    expect(actual).toStrictEqual({ owner: "", repo: "" });
  });
  test("returns an empty value if an invalid format is passed", () => {
    const actual = deriveOwnerAndRepo("invalid_format", github);
    expect(actual).toStrictEqual({ owner: "", repo: "" });
  });
});

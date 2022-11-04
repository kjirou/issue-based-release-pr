process.env = {
  // NOTE:
  //   CI 環境の Jest 実行で GITHUB_REPOSITORY 環境変数に値が設定されているという状況だと、
  //     この環境変数を削除しても、@actions/github の `github.context.repo` からの参照時に undefined または空文字列にすることができなかった。
  //   最初から空文字列だと正常に実行できるので、一旦は以下の設定で解決とした。詳細は不明。
  //
  //   試したこと)
  //   - `delete process.env.GITHUB_REPOSITORY` で key の削除を行う。
  //   - `process.env.GITHUB_REPOSITORY = ""` で値の更新をする。
  //     - なお、空文字列以外なら反映される。
  //   - `process.env = {}` で初期化する。
  //   - `jest.resetModule()` を実行する。
  //   - ローカル環境で GITHUB_REPOSITORY 環境変数を設定すると、正常に動作してしまう。
  GITHUB_REPOSITORY: "",
};

import "regenerator-runtime/runtime";
import { info, fail, input, showError, debug } from "./Definitions/Core";
import { context, getOctokit } from "@actions/github";
import Config from "./Config";
import Package from "./Package";
import Commit from "./Commit";
import * as Notifier from "./Definitions/Core";

const CONFIG_PATH = input(`path_to_config`);
const GITHUB_TOKEN = input(`github_token`);
info(`Test line 0`);

try {
  info(`Test line 1`);
  debug(`Test line 1`);
  const repository = context.payload.repository;
  const owner = context.payload.repository.owner;
  const args = { owner: owner.name || owner.login, repo: repository.name };
  const octokit = getOctokit(GITHUB_TOKEN);
  const config = Config.construct(CONFIG_PATH);
  const packages = Package.getWithPaths(config.packagePaths);
  info(`Test line 2`);
  Commit.getCommits(context, args, octokit)
    .then(commits => {
      Notifier.info(Notifier.toJSON(commits));
    })
    .catch(error => {
      throw error;
    });

  // Get and analize packages.
  // Get file changes
  // Filter packages where files are changed
  // Run commands on packages
  info(`Test line 3`);
  info(packages);
} catch (error) {
  showError(error);
  fail(error.message);
}

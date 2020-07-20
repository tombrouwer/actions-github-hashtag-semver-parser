import "regenerator-runtime/runtime";
import { info, fail, input, showError, debug } from "./Definitions/Core";
import { context } from "@actions/github";
import { Octokit } from "@octokit/rest";
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
  info(`Test line 2`);
  const owner = context.payload.repository.owner;
  info(`Test line 3`);
  const args = { owner: owner.name || owner.login, repo: repository.name };
  info(`Test line 4`);
  const octokit = new Octokit(GITHUB_TOKEN);
  info(`Test line 5`);
  const config = Config.construct(CONFIG_PATH);
  info(`Test line 6`);
  const packages = Package.getWithPaths(config.packagePaths);
  Notifier.info(Notifier.toJSON(packages));
  info(`Test line 7`);
  Commit.get(context, args, octokit)
    .then(commits => {
      info(Notifier.toJSON(commits));
    })
    .catch(error => {
      showError(error);
      throw error;
    });

  // Get and analize packages.
  // Get file changes
  // Filter packages where files are changed
  // Run commands on packages
} catch (error) {
  showError(error);
  fail(error.message);
}

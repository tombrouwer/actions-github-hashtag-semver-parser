import "regenerator-runtime/runtime";
import { info, fail, input, showError, debug } from "./Definitions/Core";
import { context, getOctokit } from "@actions/github";
import { Octokit } from "@octokit/rest";
import Config from "./Config";
import Package from "./Package";
import CommitCollection from "./CommitCollection";
import * as Notifier from "./Definitions/Core";

const CONFIG_PATH = input(`path_to_config`);
const GITHUB_TOKEN = input(`github_token`);
info(`Test line 0`);

const start = async () => {
  try {
    info(`Test line 1`);
    debug(`Test line 1`);
    const repository = context.payload.repository;
    info(`Test line 2`);
    const owner = context.payload.repository.owner;
    info(`Test line 3`);
    const args = { owner: owner.name || owner.login, repo: repository.name };
    info(`Test line 4`, getOctokit);
    const octokit = getOctokit(GITHUB_TOKEN);
    info(`Test line 5`, octokit);
    const config = Config.construct(CONFIG_PATH);
    info(`Test line 6`);
    const packages = Package.getWithPaths(config.packagePaths);
    Notifier.info(Notifier.toJSON(context.payload.commits));
    info(`Test line 7`);
    const commitCollection = new CommitCollection(
      context.payload.commits,
      args,
      octokit,
    );
    info(`Test line 8`);
    const result = await commitCollection.load();
    info(`Test line 9`);
    Notifier.info(Notifier.toJSON(result));
    info(`Test line 10`);
    Notifier.info(Notifier.toJSON(packages));

    // Get and analize packages.
    // Get file changes
    // Filter packages where files are changed
    // Run commands on packages
  } catch (error) {
    showError(error);
    fail(error.message);
  }
};

start();

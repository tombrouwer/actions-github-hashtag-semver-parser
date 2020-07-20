import * as Notifier from "./Definitions/Core";
import Commit from "./Commit";

/**
 * Handle config
 *
 * @constructor
 * @param {Array} commits
 * @param {Object} args
 * @param {Octokit} octokit
 * @param {Object} notifier
 */
export default class CommitCollection {
  constructor(commits, args, octokit, notifier = Notifier) {
    this.plainCommits = commits;
    this.args = args;
    this.octokit = octokit;
    this.info = notifier.info;
    this.output = notifier.output;
    this.debug = notifier.debug;
    this.debug(`CONFIG PATH`, commits);
  }

  /**
   * Load the commits with data.
   *
   * @return {this}
   */
  async load() {
    let commits = this.plainCommits.filter(
      c => (!c.parents || 1 === c.parents.length) && c.distinct,
    );

    let commitData = [];

    try {
      commitData = await Promise.all(commits.map(this.fetchCommitData));
      this.info(`commitData`, commitData);
    } catch (error) {
      this.info(`ERROR`, error);
      throw error;
    }

    this.commits = commitData.map(commit => new Commit(commit));

    return this;
  }

  /**
   * Fetch commit data with api.api
   *
   * @param {object} commit
   */
  fetchCommitData(commit) {
    const args = { ...this.args };
    args.ref = commit.id || commit.sha;

    return this.octokit.repos.getCommit(args);
  }
}

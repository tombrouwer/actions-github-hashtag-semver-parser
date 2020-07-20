import * as Notifier from "./Definitions/Core";

/**
 * Handle config
 *
 * @constructor
 * @param {string} path The path to the config file.
 * @param {function} info Function to give process info.
 * @param {function} output Function to output data.
 * @param {function} debug Function to debug.
 */
export default class Commit {
  constructor(commit, notifier = Notifier) {
    this.commit = commit;
    this.info = notifier.info;
    this.output = notifier.output;
    this.debug = notifier.debug;
    this.config = {};

    this.debug(`CONFIG PATH`, commit);
  }

  /**
   * Static function to construct, load, parse, validate and merge.
   *
   * @param {string} path The path to the config file.
   * @param {Object} notifier Notifier object with log and output functions.
   *
   * @return {Config}
   */
  // static construct(path, notifier = Notifier) {
  //   return new Config(path, notifier)
  //     .load()
  //     .parse()
  //     .validate()
  //     .merge();
  // }

  static async getCommits(context, args, octokit, notifier = Notifier) {
    let commits;

    notifier.debug(`Getting commits...`);

    switch (context.eventName) {
      case `push`:
        commits = context.payload.commits;
        break;

      case `pull_request`:
        var url = context.payload.pull_request.commits_url;

        commits = await octokit.paginate(`GET ${url}`, args);
        break;

      default:
        notifier.info(
          `You are using this action on an event for which it has not been tested. Only the "push" and "pull_request" events are officially supported.`,
        );

        commits = [];
        break;
    }

    return commits;
  }
}
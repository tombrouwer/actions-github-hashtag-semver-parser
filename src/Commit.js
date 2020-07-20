import * as Notifier from "./Definitions/Core";

/**
 * Handle config
 *
 * @constructor
 * @param {string} path The path to the config file.
 * @param {Object} notifier
 */
export default class Commit {
  constructor(commit, notifier = Notifier) {
    this.commit = commit;
    this.info = notifier.info;
    this.output = notifier.output;
    this.debug = notifier.debug;
    this.debug(`CONFIG PATH`, commit);
  }
}

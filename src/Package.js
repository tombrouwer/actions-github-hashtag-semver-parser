import { existsSync, readFileSync } from "fs";
import * as Notifier from "./Definitions/Core";

/**
 * Handle package
 *
 * @constructor
 * @param {string} path The path to the package
 * @param {Config} config The config class
 * @param {function} info Function to give process info.
 * @param {function} output Function to output data.
 * @param {function} debug Function to debug.
 */
export default class Package {
  constructor(path, config, notifier = Notifier) {
    this.config = config;
    this.info = notifier.info;
    this.output = notifier.output;
    this.debug = notifier.debug;

    this.path = path;
    this.packageJsonPath = `${this.path}/package.json`;

    this.debug(`PACKAGE PATH`, this, path);
    this.debug(`PACKAGE JSON PATH`, this.packageJsonPath);
  }

  /**
   * Get the package name.
   */
  get name() {
    return this.packageInfo.name;
  }

  /**
   * Get the package version.
   */
  get version() {
    return this.packageInfo.version;
  }

  /**
   * Get commands for the package.
   */
  get commands() {
    return this.packageInfo.version;
  }

  /**
   * Read the package json file and store it in file.
   *
   * @return {this}
   */
  load() {
    if (existsSync(this.packageJsonPath)) {
      this.file = readFileSync(this.packageJsonPath, `utf8`);
    } else {
      this.info(
        `Package JSON not found: "${this.packageJsonPath}", ignore directory: "${this.path}".`,
      );
    }

    return this;
  }

  /**
   * Parse the json from the package json file.
   *
   * @return {this}
   */
  parse() {
    if (this.file) {
      this.packageInfo = JSON.parse(this.file);
    }

    return this;
  }

  /**
   * Static function to construct, load and parse.
   *
   * @param {string} path The path to the package
   * @param {Config} config The config class
   * @param {Object} notifier Notifier object with log and output functions.
   *
   * @return {Package}
   */
  static construct(path, config, notifier = Notifier) {
    return new Package(path, config, notifier).load().parse();
  }

  /**
   * Load packages within the given paths.
   *
   * @param {Array} paths
   * @param {Config} config
   * @param {Notifier} notifier
   *
   * @return {[Package]}
   */
  static getWithPaths(paths, config, notifier = Notifier) {
    return paths.map(path =>
      new Package(path, config, notifier).load().parse(),
    );
  }
}

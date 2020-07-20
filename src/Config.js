import { existsSync, readFileSync, readdirSync } from "fs";
import { defaultSchema, validateSchema } from "./Definitions/Schema";
import * as Notifier from "./Definitions/Core";
import map from "lodash/map";
import flatten from "lodash/flatten";
import { EOL } from "os";

/**
 * Handle config
 *
 * @constructor
 * @param {string} path The path to the config file.
 * @param {function} info Function to give process info.
 * @param {function} output Function to output data.
 * @param {function} debug Function to debug.
 */
export default class Config {
  constructor(path, notifier = Notifier) {
    this.path = path;
    this.info = notifier.info;
    this.output = notifier.output;
    this.debug = notifier.debug;
    this.config = {};

    this.debug(`CONFIG PATH`, path);
  }

  /**
   * Get the current config schema.
   */
  get schema() {
    return this.config;
  }

  /**
   * Get the paths to the packages.
   */
  get packagePaths() {
    let packagePaths = this.config.packages.map(directoryPath => {
      return readdirSync(`./${directoryPath}`, {
        withFileTypes: true,
      })
        .filter(dir => dir.isDirectory() && dir.name !== `node_modules`)
        .map(dir => `./${directoryPath}/${dir.name}`);
    });

    return flatten(packagePaths);
  }

  /**
   * Read the json config file and store it in file.
   *
   * @return {this}
   */
  load() {
    if (existsSync(this.path)) {
      this.file = readFileSync(this.path, `utf8`);
    } else {
      this.info(
        `No JSON config file found/loaded. Default config schema is used.`,
      );
    }

    return this;
  }

  /**
   * Parse the josn from the config file.
   *
   * @return {this}
   */
  parse() {
    if (this.file) {
      this.config = JSON.parse(this.file);
    }

    return this;
  }

  /**
   * Validate the config.
   *
   * @return {this}
   * @throws {Error}
   */
  validate() {
    const validatedSchema = validateSchema.validate(this.config, {
      abortEarly: false,
    });

    if (validatedSchema.error) {
      throw new Error(
        `CONFIG SCHEMA ERRORS: ` +
          EOL +
          map(validatedSchema.error.details, `message`).join(EOL),
      );
    }

    return this;
  }

  /**
   * Merge the config with the default config.
   *
   * @return {this}
   */
  merge() {
    this.config = Object.assign(defaultSchema, this.config);

    this.output(`config`, this.config);

    return this;
  }

  /**
   * Static function to construct, load, parse, validate and merge.
   *
   * @param {string} path The path to the config file.
   * @param {Object} notifier Notifier object with log and output functions.
   *
   * @return {Config}
   */
  static construct(path, notifier = Notifier) {
    return new Config(path, notifier)
      .load()
      .parse()
      .validate()
      .merge();
  }
}

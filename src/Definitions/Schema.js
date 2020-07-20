import Joi from "joi";

/**
 * The default config schema.
 *
 * @const
 * @type {Object.<string>}
 */
export const defaultSchema = {
  /**
   * Paths to directories which ONLY constains package directories.
   *
   * @type {array}
   */
  packages: [`/`],

  /**
   * Default commands to run on each package.
   *
   * @type {Object.<string>}
   */
  commands: {
    setUp: [],
    install: [`npm install`],
    test: [`npm run test`],
    build: [`npm run build`],
    afterBuild: [],
    publish: [`npm publish`],
    canaryPublish: [`npm publish --tag canary`],
    tryPublish: [`npm publish --dry-run`],
  },

  /**
   * Overwrite commands per package.
   *
   * @type {Object.<string>}
   */
  packageCommands: {},
};

/**
 * The command validation schema.
 *
 * @const
 * @type {Object.<string>}
 */
export const validateCommandsSchema = Joi.object({
  setUp: Joi.array().items(Joi.string()),
  install: Joi.array().items(Joi.string()),
  test: Joi.array().items(Joi.string()),
  build: Joi.array().items(Joi.string()),
  afterBuild: Joi.array().items(Joi.string()),
  publish: Joi.array().items(Joi.string()),
  canaryPublish: Joi.array().items(Joi.string()),
  tryPublish: Joi.array().items(Joi.string()),
});

/**
 * The validation schema
 * Usage: validateSchema.validate({});
 *
 * @const
 * @type {Object.<string>}
 */
export const validateSchema = Joi.object({
  packages: Joi.array().items(Joi.string()),
  commands: validateCommandsSchema,
  packageCommands: Joi.object().pattern(/^/, validateCommandsSchema),
});

export default { defaultSchema, validateCommandsSchema, validateSchema };

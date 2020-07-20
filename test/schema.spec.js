import { expect } from "chai";
import { defaultSchema, validateSchema } from "../src/Definitions/Schema";

describe(`Config schema validation`, () => {
  it(`Validate default schema`, () => {
    const validatedSchema = validateSchema.validate(defaultSchema);

    expect(validatedSchema).to.deep.equal({ value: defaultSchema });
    expect(validatedSchema).to.not.have.property(`error`);
  });

  it(`Validate valid schema`, () => {
    const validSchema = {
      packages: [`/`],
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
      packageCommands: {
        mooi: {
          setUp: [],
          install: [`npm install`],
          test: [`npm run test`],
          build: [`npm run build`],
          afterBuild: [],
          publish: [`npm publish`],
          tryPublish: [`npm publish --dry-run`],
        },
      },
    };

    const validatedSchema = validateSchema.validate(validSchema);

    expect(validatedSchema).to.deep.equal({ value: validSchema });
    expect(validatedSchema).to.not.have.property(`error`);
  });

  it(`Invalidate invalid schema`, () => {
    const invalidSchema = {
      packages: [`/`],
      commands: {
        setUp: [],
        install: [`npm install`],
        test: [`npm run test`],
        build: [`npm run build`],
        afterBuild: [],
        publish: [`npm publish`],
        canaryPublish: [`npm publish --tag canary`],
        tryPublish: [`npm publish --dry-run`],
        hello: [`world`],
      },
      packageCommands: {
        world: `hello`,
      },
    };

    const validatedSchema = validateSchema.validate(invalidSchema, {
      abortEarly: false,
    });
    expect(validatedSchema).to.have.property(`error`);
  });
});

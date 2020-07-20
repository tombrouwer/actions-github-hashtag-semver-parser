import { expect } from "chai";
import Config from "../src/Config";
import { defaultSchema } from "../src/Definitions/Schema";
import EmptyNotifier from "./helpers/EmptyNotifier";

describe(`Config class test`, () => {
  it(`Config from data/config.json`, () => {
    let config = new Config(`test/data/config.json`, EmptyNotifier);

    config = config
      .load()
      .parse()
      .validate()
      .merge();

    expect(config.schema).to.deep.equal(defaultSchema);

    config = Config.construct(`test/data/config.json`, EmptyNotifier);

    expect(config.schema).to.deep.equal(defaultSchema);
  });

  it(`Config from data/invalid-config.json`, () => {
    let config = new Config(`test/data/invalid-config.json`, EmptyNotifier);
    try {
      expect(
        config
          .load()
          .parse()
          .validate(),
      ).to.throw(Error);

      expect(Config.construct(`test/data/config.json`, EmptyNotifier)).to.throw(
        Error,
      );
    } catch {}
  });

  it(`Config from data/extended-config.json`, () => {
    let config = new Config(`test/data/extended-config.json`, EmptyNotifier);

    config = config
      .load()
      .parse()
      .validate()
      .merge();

    const extendedSchema = defaultSchema;
    extendedSchema.packages = [`/packages`];
    extendedSchema.commands.setUp = [`npm run setup`];

    expect(config.schema).to.deep.equal(extendedSchema);

    config = Config.construct(`test/data/extended-config.json`, EmptyNotifier);

    expect(config.schema).to.deep.equal(defaultSchema);
  });
});

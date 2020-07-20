import { expect } from "chai";
import Config from "../src/Config";
import Package from "../src/Package";
import EmptyNotifier from "./helpers/EmptyNotifier";

const emptyFunction = () => {};

describe(`Package class test`, () => {
  it(`Read package`, () => {
    const config = Config.construct(
      `test/data/extended-config.json`,
      EmptyNotifier,
    );

    const packageHandler = Package.construct(
      `test/data/TestPackage`,
      config,
      EmptyNotifier,
    );

    expect(packageHandler.name).to.equal(`test-package-name`);
    expect(packageHandler.version).to.equal(`1.0.0`);
    expect(packageHandler.path).to.equal(`test/data/TestPackage`);
  });

  it(`Read package with condig`, () => {
    const config = Config.construct(
      `test/data/extended-config.json`,
      EmptyNotifier,
    );

    const packageHandler = Package.construct(
      config.packagePaths[0],
      config,
      EmptyNotifier,
    );

    expect(packageHandler.name).to.equal(`test-package-name`);
    expect(packageHandler.version).to.equal(`1.0.0`);
    expect(packageHandler.path).to.equal(`./test/data/TestPackage`);
  });
});

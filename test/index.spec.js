import { expect } from "chai";
import index from "../src/index";

describe(`Config schema validation`, () => {
  it(`Validate default schema`, () => {
    console.log(index);
    expect(`hallo`).to.equal(`hallo`);
  });
});

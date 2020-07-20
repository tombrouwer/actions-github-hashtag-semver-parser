import "regenerator-runtime/runtime";
import { info, fail, input, toJSON } from "./Core";
import { context } from "@actions/github";

const DEFAULT_SEMVER = input(`default_semver`);
info(`Test line 0`);

const start = async () => {
  try {
    info(toJSON(context.payload.commits));
    info(DEFAULT_SEMVER);
  } catch (error) {
    fail(error.message);
  }
};

start();

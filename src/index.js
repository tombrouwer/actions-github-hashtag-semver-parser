import "regenerator-runtime/runtime";
import { info, fail, input, toJSON, output } from "./Core";
import { context } from "@actions/github";
import map from "lodash/map";

const DEFAULT_SEMVER = input(`default_semver`);
info(`Test line 0`);

const start = async () => {
  try {
    info(toJSON(context.payload.commits));
    const messages = map(context.payload.commits, `message`);
    const messagesStr = messages.implode(` `);
    const semver =
      messagesStr.search(`#minor`) > -1
        ? `minor`
        : messagesStr.search(`#major`) > -1
        ? `major`
        : messagesStr.search(`#patch`) > -1
        ? `patch`
        : DEFAULT_SEMVER;

    if (!semver) {
      throw new Error(`No semver found!`);
    }

    output(`semver`, semver);

    info(`semver`, semver);
  } catch (error) {
    fail(error.message);
  }
};

start();

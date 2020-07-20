import { info, fail, showError, input, output } from "./Core";
import { context } from "@actions/github";
import map from "lodash/map";

const DEFAULT_SEMVER = input(`default_semver`);

try {
  const messages = map(context.payload.commits, `message`);
  const messagesStr = messages.join(` `);
  const semver =
    messagesStr.search(`#major`) > -1
      ? `major`
      : messagesStr.search(`#minor`) > -1
      ? `minor`
      : messagesStr.search(`#patch`) > -1
      ? `patch`
      : DEFAULT_SEMVER;

  if (semver) {
    output(`semver`, semver);
    info(`semver`, semver);
  } else {
    info(`No semver found!`);
    fail(`No semver found!`);
  }
} catch (error) {
  showError(error);
  fail(error.message);
}

import { info, fail, toJSON, showError, input, output } from "./Core";
import { context } from "@actions/github";
import map from "lodash/map";

const DEFAULT_SEMVER = input(`default_semver`);

try {
  const messages = map(context.payload.commits, `message`);
  info(`messages`);
  info(toJSON(messages));
  const messagesStr = messages.join(` `);
  info(`messagesStr`);
  info(toJSON(messagesStr));
  const semver =
    messagesStr.search(`#minor`) > -1
      ? `minor`
      : messagesStr.search(`#major`) > -1
      ? `major`
      : messagesStr.search(`#patch`) > -1
      ? `patch`
      : DEFAULT_SEMVER;

  info(`semver`);
  info(toJSON(semver));

  if (!semver) {
    output(`semver`, semver);
    info(`semver`, semver);
  } else {
    fail(`No semver found!`);
  }
} catch (error) {
  showError(error);
  fail(error.message);
}

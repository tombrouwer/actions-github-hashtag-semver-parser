import * as core from "@actions/core";

export const toJSON = (value, pretty = true) => {
  return pretty ? JSON.stringify(value, null, 4) : JSON.stringify(value);
};

export const formatLogMessage = (msg, obj = null) => {
  return obj ? `${msg}: ${toJSON(obj)}` : msg;
};

export const info = (msg, obj = null) => {
  core.info(formatLogMessage(msg, obj));
};

export const debug = (msg, obj = null) => {
  core.debug(formatLogMessage(msg, obj));
};

export const output = (key, output) => {
  core.setOutput(key, output);
};

export const showError = error => {
  core.error(formatLogMessage(`error`, error));
};

export const fail = error => {
  core.setFailed(error.message);
};

export const input = key => {
  core.getInput(key);
};

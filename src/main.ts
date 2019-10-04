import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("github-token", { required: true });
    const remote_action = core.getInput("remote-action", { required: true });

    const { pull_request: pr } = github.context.payload;
    if (!pr) {
      throw new Error("Event payload missing `pull_request`");
    }

    const client = new github.GitHub(token);
    core.info(
      `Creating a new PR on the repo ${remote_action} pull request #${pr.number}`
    );
    client.pulls.create();
    core.setFailed("Failed on purpose.");
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

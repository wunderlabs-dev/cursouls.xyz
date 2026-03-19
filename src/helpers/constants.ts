const SPAWN_DELAY_MIN = 1000;
const SPAWN_DELAY_RANGE = 2500;
const WORKING_DURATION_MIN = 4000;
const WORKING_DURATION_RANGE = 6000;

const AGENT_SKINS = ["agent-01", "agent-02", "agent-03", "agent-04"] as const;
const AGENT_RANDOM_ANIMATIONS = [
  "task-complete",
  "task-failed",
  "clarification-needed",
] as const;

const AGENT_TASKS = [
  "Refactoring auth module",
  "Fixing memory leak",
  "Deploying to staging",
  "Writing unit tests",
  "Reviewing pull request",
  "Optimizing database queries",
  "Updating dependencies",
  "Migrating to new API",
  "Debugging websocket issue",
  "Building CI pipeline",
  "Resolving merge conflicts",
  "Adding error handling",
] as const;

export {
  SPAWN_DELAY_MIN,
  SPAWN_DELAY_RANGE,
  WORKING_DURATION_MIN,
  WORKING_DURATION_RANGE,
  AGENT_SKINS,
  AGENT_RANDOM_ANIMATIONS,
  AGENT_TASKS,
};

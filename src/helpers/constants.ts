export const SPAWN_DELAY_MIN = 1000;
export const SPAWN_DELAY_RANGE = 2500;
export const WORKING_DURATION_MIN = 4000;
export const WORKING_DURATION_RANGE = 6000;

export const AGENT_SKINS = [
  "agent-01",
  "agent-02",
  "agent-03",
  "agent-04",
] as const;
export const AGENT_RANDOM_ANIMATIONS = [
  "task-complete",
  "task-failed",
  "clarification-needed",
] as const;

export const AGENT_TASKS = [
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

export const POST_VALIDATOR_TOKENS = {
  CREATE: Symbol('PostValidator.Create'),
  UPDATE: Symbol('PostValidator.Update'),
  PATCH: Symbol('PostValidator.Patch'),
} as const;

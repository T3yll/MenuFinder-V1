export const RESOURCES = {
  INFO: 'info',
  USER: 'user',
  TEAM: 'team',
  FEATURE: 'feature',
} as const;

export type ResourceType = (typeof RESOURCES)[keyof typeof RESOURCES];

export interface UserAgentPersistence {
  name: string;
  version: string;
  os: string;
  type: string;
}

export interface TermPersistence {
  ip: string;
  acceptedAt: string;
  userAgent: UserAgentPersistence;
}

import { BaseRecord } from './common.types.js';

export interface ExternalLinkResponseSchema {
  id: number;
  shortname: string;
  url: string;
  avatarUrl?: string;
}

export interface Channel extends BaseRecord {
  followers: number;
  description: string;
  externalLinks: ExternalLinkResponseSchema[];
}

export interface RegisterChannelResponse {
  channel: string;
  verified: boolean;
}

export interface SettingInfoRequestBody {
  channel: string;
  externalLinks: Pick<ExternalLinkResponseSchema, 'shortname' | 'url'>[];
  description: string;
}
